/*
 * Copyright 2020 Google LLC. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.mycapability.posedetector;

import android.content.Context;
import androidx.annotation.NonNull;
import android.util.Log;
import com.google.android.gms.tasks.Task;
import com.google.android.odml.image.MlImage;
import com.google.mlkit.vision.common.InputImage;
import com.mycapability.GraphicOverlay;
import com.mycapability.VisionProcessorBase;
import com.mycapability.posedetector.classification.PoseClassifierProcessor;
import com.google.mlkit.vision.pose.Pose;
import com.google.mlkit.vision.pose.PoseDetection;
import com.google.mlkit.vision.pose.PoseDetector;
import com.google.mlkit.vision.pose.PoseLandmark;
import com.google.mlkit.vision.pose.PoseDetectorOptionsBase;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import org.joda.time.Instant;


/** A processor to run pose detector. */
public class PoseDetectorProcessor
    extends VisionProcessorBase<PoseDetectorProcessor.PoseWithClassification> {
  private static final String TAG = "PoseDetectorProcessor";

  private final PoseDetector detector;

  private final boolean showInFrameLikelihood;
  private final boolean visualizeZ;
  private final boolean rescaleZForVisualization;
  private final boolean runClassification;
  private final boolean isStreamMode;
  private final Context context;
  private final Executor classificationExecutor;

  // si se presionó el botón de inicio
  public boolean jumpFlag = false;

  // tipo Salto
  // false: Horizontal
  public boolean isVertical = true;

  public ArrayList<com.mycapability.HeightData> heights;    //Lista con alturas y tiempos
  public ArrayList<com.mycapability.WidthData> widths;    //Lista con alturas y tiempos
  public ArrayList<com.mycapability.WidthData> userHeights;    //Lista con altura del usuario en cada momento
  
  public PoseClassifierProcessor poseClassifierProcessor;
  /** Internal class to hold Pose and classification results. */
  protected static class PoseWithClassification {
    private final Pose pose;
    private final List<String> classificationResult;

    public PoseWithClassification(Pose pose, List<String> classificationResult) {
      this.pose = pose;
      this.classificationResult = classificationResult;
    }

    public Pose getPose() {
      return pose;
    }

    public List<String> getClassificationResult() {
      return classificationResult;
    }
  }

  //constructor
  public PoseDetectorProcessor(
      Context context,
      PoseDetectorOptionsBase options,
      boolean showInFrameLikelihood,
      boolean visualizeZ,
      boolean rescaleZForVisualization,
      boolean runClassification,
      boolean isStreamMode) {
    super(context);
    this.showInFrameLikelihood = showInFrameLikelihood;
    this.visualizeZ = visualizeZ;
    this.rescaleZForVisualization = rescaleZForVisualization;
    detector = PoseDetection.getClient(options);
    this.runClassification = runClassification;   //false al parecer
    this.isStreamMode = isStreamMode;
    this.context = context;
    classificationExecutor = Executors.newSingleThreadExecutor();

    this.heights = new ArrayList<com.mycapability.HeightData>();
    this.widths = new ArrayList<com.mycapability.WidthData>();
    this.userHeights = new ArrayList<com.mycapability.WidthData>();
  }

  @Override
  public void stop() {
    super.stop();
    detector.close();
  }

  @Override
  protected Task<PoseWithClassification> detectInImage(InputImage image) {
    return detector
        .process(image)
        .continueWith(
            classificationExecutor,
            task -> {
              Pose pose = task.getResult();
              
              List<String> classificationResult = new ArrayList<>();
              /*if (runClassification) {
                if (poseClassifierProcessor == null) {
                  poseClassifierProcessor = new PoseClassifierProcessor(context, isStreamMode);
                }
                classificationResult = poseClassifierProcessor.getPoseResult(pose);
              }
              */
              return new PoseWithClassification(pose, classificationResult);
            });
  }


  //Detecta poses en la cámara
  @Override
  protected Task<PoseWithClassification> detectInImage(MlImage image) {

    return detector
      .process(image)
      .continueWith(
              classificationExecutor,
              task -> {

                  Instant now = new Instant();

                  Pose pose = task.getResult();

                  // Salto Vertical
                  if (this.isVertical){

                    if (!pose.getAllPoseLandmarks().isEmpty() && this.jumpFlag) {

                      //pie izquierdo (en verdad tobillo)
                      PoseLandmark PI = pose.getPoseLandmark(PoseLandmark.LEFT_ANKLE);
                      double PIh = PI.getPosition().y;

                      com.mycapability.HeightData currentHeight = new com.mycapability.HeightData(now, PIh);

                      heights.add(currentHeight);

                      System.out.println(now + ": altura: " + PIh);
                    }
                  }

                  // Salto Horizontal
                  else {

                    // promedios
                    double y_heel_avg;
                    double y_eye_avg;
                    
                    // altura de usuario en coordenadas
                    double dista;

                    if (!pose.getAllPoseLandmarks().isEmpty() && this.jumpFlag) {
                      
                      // talones
                      PoseLandmark TI = pose.getPoseLandmark(PoseLandmark.LEFT_HEEL);
                      PoseLandmark TD = pose.getPoseLandmark(PoseLandmark.RIGHT_HEEL);

                      y_heel_avg = (TI.getPosition().x + TD.getPosition().x)/2;
                      
                      // ojos
                      PoseLandmark OI = pose.getPoseLandmark(PoseLandmark.LEFT_EYE_INNER);
                      PoseLandmark OD = pose.getPoseLandmark(PoseLandmark.RIGHT_EYE_INNER);

                      y_eye_avg = (OI.getPosition().x + OD.getPosition().x)/2;

                      // altura de persona
                      dista = y_eye_avg - y_heel_avg;

                      // guardar alturas del usuario en cada frame
                      com.mycapability.WidthData currUserHeights = new com.mycapability.WidthData(now, dista, 0);
                      userHeights.add(currUserHeights);

                      //guardar distancias entre ojos y talones (dista)
                      //escoger la mayor -> altura del usuario
                      //a partir de eso obtener distancia de salto

                      com.mycapability.WidthData currWidth = new com.mycapability.WidthData(now, TI.getPosition().y, TI.getPosition().x);
                      
                      widths.add(currWidth);
                      System.out.println(now + ": coords: " + String.valueOf(currWidth.X) + ", " + String.valueOf(currWidth.Y));

                    }
                  }

                List<String> classificationResult = new ArrayList<>();
                /*if (runClassification) {
                  if (poseClassifierProcessor == null) {
                    poseClassifierProcessor = new PoseClassifierProcessor(context, isStreamMode);
                  }
                  classificationResult = poseClassifierProcessor.getPoseResult(pose);
                }
                */
                return new PoseWithClassification(pose, classificationResult);
              });
  }

  @Override
  protected void onSuccess(
      @NonNull PoseWithClassification poseWithClassification,
      @NonNull GraphicOverlay graphicOverlay) {
    graphicOverlay.add(
        new PoseGraphic(
            graphicOverlay,
            poseWithClassification.pose,
            showInFrameLikelihood,
            visualizeZ,
            rescaleZForVisualization,
            poseWithClassification.classificationResult));
  }

  @Override
  protected void onFailure(@NonNull Exception e) {
    Log.e(TAG, "Pose detection failed!", e);
  }

  @Override
  protected boolean isMlImageEnabled(Context context) {
    // Use MlImage in Pose Detection by default, change it to OFF to switch to InputImage.
    return true;
  }
}
