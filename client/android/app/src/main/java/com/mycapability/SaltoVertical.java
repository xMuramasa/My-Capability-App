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

//LIVE PREVIEW ACTIVITY


package com.mycapability;

import android.content.Context;
import android.content.Intent;
import android.app.AlertDialog;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
// import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.Toast;
import android.widget.ToggleButton;
import androidx.core.app.ActivityCompat;
import androidx.core.app.ActivityCompat.OnRequestPermissionsResultCallback;
import androidx.core.content.ContextCompat;

import com.google.android.gms.common.annotation.KeepName;

import com.mycapability.CameraSource;
import com.mycapability.CameraSourcePreview;
import com.mycapability.GraphicOverlay;
import com.mycapability.R;
import com.mycapability.posedetector.PoseDetectorProcessor;
import com.mycapability.preference.PreferenceUtils;
import com.mycapability.preference.SettingsActivity;
import com.google.mlkit.vision.pose.PoseDetectorOptionsBase;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
import org.json.JSONException;
import org.json.JSONObject;

import org.joda.time.Instant;
import org.joda.time.Duration;
// import org.joda.time.DateTime;

import com.android.volley.toolbox.Volley;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.RequestQueue;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.NetworkResponse;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.AuthFailureError;


/** Live preview demo for ML Kit APIs. */
@KeepName
public final class SaltoVertical extends AppCompatActivity
    implements OnRequestPermissionsResultCallback,
        /*OnItemSelectedListener,   PROBANDO BORRARLO*/
        CompoundButton.OnCheckedChangeListener {

  private static final String POSE_DETECTION = "Pose Detection";

  private static final String TAG = "SaltoVertical";
  private static final int PERMISSION_REQUESTS = 1;

  public int user_id;

  //private static int maxDelta = 3;    //basarlo en fps? (VisionProcessorBase)
  private static int minTolerancia = 3; //cantidad de veces que la pendiente debe estar sobre dhdtAccept para estar en estabilidad
  private static float dhdtAccept = (float) -0.1;   //Pendiente considerada estable (dh/dt [coord/ms])
                                                    //> dhdtAccept > probabilidad de medir saltos menores

  //si se ha presionado el botón de inicio
  private boolean startFlag = false;

  private CameraSource cameraSource = null;
  private CameraSourcePreview preview;
  private GraphicOverlay graphicOverlay;

  //instancia del procesador de pose
  public PoseDetectorProcessor PDP;

  //para API requests
  RequestQueue requestQueue;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Log.d(TAG, "onCreate");

    Bundle b = getIntent().getExtras();
    if (b != null)
        this.user_id = b.getInt("user_id");

    setContentView(R.layout.activity_vision_live_preview);

    preview = findViewById(R.id.preview_view);
    if (preview == null) {
      Log.d(TAG, "Preview is null");
    }
    graphicOverlay = findViewById(R.id.graphic_overlay);
    if (graphicOverlay == null) {
      Log.d(TAG, "graphicOverlay is null");
    }

    ToggleButton facingSwitch = findViewById(R.id.facing_switch);
    facingSwitch.setOnCheckedChangeListener(this);

		// botón para iniciar medición
    ImageView startButton = findViewById(R.id.jump_start_button);
    startButton.setOnClickListener(

        v -> {
          
          this.PDP.isVertical = true;

          this.startFlag = true;
          this.PDP.jumpFlag = true;
          
          //reiniciar lista de coordenadas
          this.PDP.heights.clear();
          System.out.println("heights despues de clear: " + this.PDP.heights);
          
    });

    // fix: esconder hasta que se presione el botón de inicio

    // boton para detener medición
    ImageView stopButton = findViewById(R.id.jump_stop_button);
    stopButton.setOnClickListener(

        v -> {

          //Intent intent = new Intent(getApplicationContext(), SettingsActivity.class);
          //intent.putExtra(
              //SettingsActivity.EXTRA_LAUNCH_SOURCE, SettingsActivity.LaunchSource.LIVE_PREVIEW);
          //startActivity(intent);
          
          if (this.startFlag) {

            this.PDP.jumpFlag = false;
            float altura = calcularSalto4dxdt();

            // DateTime dt = new DateTime();
            // String fecha = dt.toString("dd-MM-yy hh:mm");   //borrar (lo implementa el server)

            //agregar a BD  
            addResult(user_id, altura);

            //mensaje emergente con resultado
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("Resultado de salto vertical").setMessage(altura + " [m]");
            AlertDialog dialog = builder.create();
            dialog.show();

            System.out.println(" -----> LA ALTURA DEL SALTO ES: " + altura);

            this.startFlag = false;
          }
      });


    if (allPermissionsGranted()) {
      createCameraSource(POSE_DETECTION);
    } else {
      getRuntimePermissions();
    }
  }


  /*
  @Override
  public synchronized void onItemSelected(AdapterView<?> parent, View view, int pos, long id) {
    // An item was selected. You can retrieve the selected item using
    // parent.getItemAtPosition(pos)
    selectedModel = parent.getItemAtPosition(pos).toString();
    Log.d(TAG, "Selected model: " + selectedModel);
    preview.stop();
    if (allPermissionsGranted()) {
      createCameraSource(selectedModel);
      startCameraSource();
    } else {
      getRuntimePermissions();
    }
  }

  @Override
  public void onNothingSelected(AdapterView<?> parent) {
    // Do nothing.
  }
*/

  @Override
  public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
    Log.d(TAG, "Set facing");
    if (cameraSource != null) {
      if (isChecked) {
        cameraSource.setFacing(CameraSource.CAMERA_FACING_FRONT);
      } else {
        cameraSource.setFacing(CameraSource.CAMERA_FACING_BACK);
      }
    }
    preview.stop();
    startCameraSource();
  }


  private void createCameraSource(String model) {
    // If there's no existing cameraSource, create one.
    if (cameraSource == null) {
      cameraSource = new CameraSource(this, graphicOverlay);
    }

    //aquí se llama a la clase que detecta los puntos
    try {
      PoseDetectorOptionsBase poseDetectorOptions =
          PreferenceUtils.getPoseDetectorOptionsForLivePreview(this);
      // Log.i(TAG, "Using Pose Detector with options " + poseDetectorOptions);
      boolean shouldShowInFrameLikelihood =
          PreferenceUtils.shouldShowPoseDetectionInFrameLikelihoodLivePreview(this);
      boolean visualizeZ = PreferenceUtils.shouldPoseDetectionVisualizeZ(this);
      boolean rescaleZ = PreferenceUtils.shouldPoseDetectionRescaleZForVisualization(this);
      boolean runClassification = PreferenceUtils.shouldPoseDetectionRunClassification(this);

      this.PDP = new PoseDetectorProcessor(
              this,
              poseDetectorOptions,
              shouldShowInFrameLikelihood,
              visualizeZ,
              rescaleZ,
              runClassification,
              true);
      cameraSource.setMachineLearningFrameProcessor(this.PDP);
      
    } catch (RuntimeException e) {
      Log.e(TAG, "Can not create image processor: " + model, e);
      Toast.makeText(
              getApplicationContext(),
              "Can not create image processor: " + e.getMessage(),
              Toast.LENGTH_LONG)
          .show();
    }
  }


  /**
   * Starts or restarts the camera source, if it exists. If the camera source doesn't exist yet
   * (e.g., because onResume was called before the camera source was created), this will be called
   * again when the camera source is created.
   */
  private void startCameraSource() {
    if (cameraSource != null) {
      try {
        if (preview == null) {
          Log.d(TAG, "resume: Preview is null");
        }
        if (graphicOverlay == null) {
          Log.d(TAG, "resume: graphOverlay is null");
        }
        preview.start(cameraSource, graphicOverlay);

      } catch (IOException e) {
        Log.e(TAG, "Unable to start camera source.", e);
        cameraSource.release();
        cameraSource = null;
      }
    }
  }

  
  @Override
  public void onResume() {
    super.onResume();
    Log.d(TAG, "onResume");
    createCameraSource(POSE_DETECTION);
    startCameraSource();
  }


  //r etorna coordenada de altura máxima
  public HeightData getMinCoord(){

    ListIterator<HeightData> iterator = this.PDP.heights.listIterator();
    HeightData minCoord = new HeightData(new Instant(), 999999);

    while(iterator.hasNext()){

      HeightData currHeightData = iterator.next();

      if (currHeightData.getCoord() < minCoord.getCoord()){
        minCoord = currHeightData;
      }
    };

    System.out.println("MIN COORD: " + minCoord.getCoord());
    return minCoord;
  }


//asumiendo que alguien graba
public float calcularSalto4dxdt(){

  Instant tiempoInicial = null;

  //máxima altura
  HeightData minCoord = getMinCoord();

  Instant tiempoFinal = minCoord.timestamp;
  ListIterator<HeightData> iterator = this.PDP.heights.listIterator();

  //llevar iterador a elemento de máxima altura
  while (iterator.next() != minCoord){
  };

  //no nos importan los cercanos (asumiendo una cantidad mínima digna de fps),
  // así que se salta el previo al máximo
  iterator.previous();
  //posición actual
  HeightData currHeightData = iterator.previous();
  //posición previa
  HeightData prevHeightData = iterator.previous();

  //dt > 0, así que se invierte la resta para obtener dh
  Duration Ddt = new Duration(prevHeightData.timestamp, currHeightData.timestamp);
  long dt = Ddt.getMillis();
  float dh = (float) (currHeightData.coord - prevHeightData.coord);

  int tolerancia = 0;
  int i = 0;
  //obtener tiempo inicial (inicio de salto) a partir de variación de altura
  //y la búsqueda 
  while (iterator.hasPrevious()){

    System.out.println("pendiente: " + dh + " " + dt + " = " + dh/dt);

    //si se alcanza una pendiente estable (son negativas)
    if (dh / dt > dhdtAccept){

      tolerancia++;

      //si se alcanza una zona estable (debería ser el piso)
      if (tolerancia == minTolerancia) {

        System.out.println("minTolerancia alcanzada!");

        while (i < tolerancia){
          currHeightData = iterator.next();
          i++;
        }

        tiempoInicial = currHeightData.timestamp;  //check

        break;
      }

    } else {
        tolerancia = 0;
    }

    iterator.next();
    currHeightData = iterator.previous();
    prevHeightData = iterator.previous();

    Ddt = new Duration(prevHeightData.timestamp, currHeightData.timestamp);
    dt = Ddt.getMillis();
    dh = (float) (currHeightData.coord - prevHeightData.coord);
  }

  if (dh / dt > dhdtAccept && tiempoInicial != null) {

    tolerancia++;

    //si se alcanza una zona estable (debería ser el piso)
    if (tolerancia == minTolerancia /*|| !iterator.hasPrevious()*/) {

      while (i < tolerancia){
        currHeightData = iterator.next();
        i++;
      }

      tiempoInicial = currHeightData.timestamp;  //check
    }
  }

  if (tiempoInicial != null) {

    Duration duration = new Duration(tiempoInicial, tiempoFinal);
    long tiempoSalto = duration.getMillis();

    //calculo ecuación física
    System.out.println("TIEMPO de Salto: " + tiempoSalto + " (" + tiempoInicial + ", " + tiempoFinal + ")");

    return (float) ((9.807 *  Math.pow(tiempoSalto/1000.0, 2) )/2.0);

  } else {
    System.out.println("NO HAY DATOS DE COORDENADAS SUFICIENTES (no se halla tiempo inicial)");
    return 0;
  }
}


  //query al server
  private void addResult(int user_id, float result/*, String date*/){

    try {
        this.requestQueue = Volley.newRequestQueue(this);
        String URL = "https://server-mycap.herokuapp.com/results";
        JSONObject jsonBody = new JSONObject();

        jsonBody.put("user_id", user_id);
        jsonBody.put("result", result);
        jsonBody.put("type", 0); //salto
        // jsonBody.put("date", date);
        final String requestBody = jsonBody.toString();

        System.out.println("json request: " + requestBody);

        StringRequest stringRequest = new StringRequest(Request.Method.POST, URL, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                System.out.println("Respuesta de server: " + response);
                Log.i("VOLLEY", response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
              System.out.println("Respuesta de server (error): " + error);

              Log.e("VOLLEY", error.toString());
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public byte[] getBody() throws AuthFailureError {
                try {
                    return requestBody == null ? null : requestBody.getBytes("utf-8");
                } catch (UnsupportedEncodingException uee) {
                    VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
                    return null;
                }
            }

            @Override
            protected Response<String> parseNetworkResponse(NetworkResponse response) {
                String responseString = "";
                if (response != null) {
                    responseString = String.valueOf(response.statusCode);
                    // can get more details such as response.headers
                }

                System.out.println("Respuesta recibida de server");

                return Response.success(responseString, HttpHeaderParser.parseCacheHeaders(response));
            }
        };

        this.requestQueue.add(stringRequest);
    } catch (JSONException e) {
        e.printStackTrace();
    }
  }


  /** Stops the camera. */
  @Override
  protected void onPause() {
    super.onPause();
    if (this.requestQueue != null) {
      this.requestQueue.cancelAll(TAG);
    }
    preview.stop();
  }

  @Override
  public void onDestroy() {
    
    super.onDestroy();
    if (cameraSource != null) {
      cameraSource.release();
    }
    if (requestQueue != null) {
      requestQueue.cancelAll(TAG);
    }
  }

  private String[] getRequiredPermissions() {
    try {
      PackageInfo info =
          this.getPackageManager()
              .getPackageInfo(this.getPackageName(), PackageManager.GET_PERMISSIONS);
      String[] ps = info.requestedPermissions;
      if (ps != null && ps.length > 0) {
        return ps;
      } else {
        return new String[0];
      }
    } catch (Exception e) {
      return new String[0];
    }
  }

  private boolean allPermissionsGranted() {
    for (String permission : getRequiredPermissions()) {
      if (!isPermissionGranted(this, permission)) {
        return false;
      }
    }
    return true;
  }

  private void getRuntimePermissions() {
    List<String> allNeededPermissions = new ArrayList<>();
    for (String permission : getRequiredPermissions()) {
      if (!isPermissionGranted(this, permission)) {
        allNeededPermissions.add(permission);
      }
    }

    if (!allNeededPermissions.isEmpty()) {
      ActivityCompat.requestPermissions(
          this, allNeededPermissions.toArray(new String[0]), PERMISSION_REQUESTS);
    }
  }

  @Override
  public void onRequestPermissionsResult(
      int requestCode, String[] permissions, int[] grantResults) {
    Log.i(TAG, "Permission granted!");
    if (allPermissionsGranted()) {
      createCameraSource(POSE_DETECTION);
    }
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }

  private static boolean isPermissionGranted(Context context, String permission) {
    if (ContextCompat.checkSelfPermission(context, permission)
        == PackageManager.PERMISSION_GRANTED) {
      Log.i(TAG, "Permission granted: " + permission);
      return true;
    }
    Log.i(TAG, "Permission NOT granted: " + permission);
    return false;
  }
}
