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

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.os.CountDownTimer;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.Toast;
import android.widget.ToggleButton;
import androidx.appcompat.app.AppCompatActivity;
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
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

import org.joda.time.Instant;
import org.joda.time.Duration;


@KeepName
public final class SaltoVertical extends AppCompatActivity
    implements OnRequestPermissionsResultCallback,
        CompoundButton.OnCheckedChangeListener {

	private static final String POSE_DETECTION = "Pose Detection";

	private static final String TAG = "SaltoVertical";
	private static final int PERMISSION_REQUESTS = 1;

	public int user_id;
	private int group_id;
	private int student_id;
	private int tipo;

	private static final float dhdtAccept = (float) 0.06;   //Pendiente considerada estable (dh/dt [coord/ms])
													//> dhdtAccept > probabilidad de medir saltos menores

	//si se ha presionado el botón de inicio
	private boolean startFlag = false;
	private boolean offFlag = false;	// si no hay temporizador

	private CameraSource cameraSource = null;
	private CameraSourcePreview preview;
	private GraphicOverlay graphicOverlay;

	//instancia del procesador de pose
	public PoseDetectorProcessor PDP;

	//para API requests

	// Timer
	private CountDownTimer timerPreJump;
	private CountDownTimer timerJump;

	private long tPreJump_init = 6000; // tiempo temporizador
	private long tJump_init = 4000;    // tiempo de salto

	private long tPreJump = this.tPreJump_init;
	private long tJump = this.tJump_init;

	//imágenes de temporizador
	public ArrayList<ImageView> CDNumbers = new ArrayList<ImageView>();
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.d(TAG, "onCreate");


	// POR MIENTRAS / PARA TESTEAR
	// 	AlertDialog.Builder builder = new AlertDialog.Builder(this);
	// 	builder.setTitle("introducir dhdtAccept");
	// 	final EditText input = new EditText(this);
	// 	input.setInputType(InputType.TYPE_CLASS_TEXT);
    // builder.setView(input);

	// 	builder.setPositiveButton("OK", new DialogInterface.OnClickListener() { 
	// 		@Override
	// 		public void onClick(DialogInterface dialog, int which) {
	// 			dhdtAccept = Float.parseFloat(String.valueOf(input.getText()));
	// 		}
	// 	});

		// builder.show();


		Bundle b = getIntent().getExtras();
		if (b != null){
			this.user_id = b.getInt("user_id");
			this.group_id = b.getInt("group_id");
			this.student_id = b.getInt("student_id");
			this.tipo = b.getInt("tipo");
			Log.d("THIS TIPO: ", String.valueOf(this.tipo));
		}

		setContentView(R.layout.activity_vision_live_preview);

		preview = findViewById(R.id.preview_view);
		if (preview == null) {
			Log.d(TAG, "Preview is null");
		}
		graphicOverlay = findViewById(R.id.graphic_overlay);
		if (graphicOverlay == null) {
			Log.d(TAG, "graphicOverlay is null");
		}

		// switch camera
		ToggleButton facingSwitch = findViewById(R.id.facing_switch);
		facingSwitch.setOnCheckedChangeListener(this);

		// botones para iniciar y detener medición
		ImageView startButton = findViewById(R.id.jump_start_button);
		ImageView stopButton = findViewById(R.id.jump_stop_button);
		ImageView timer_three = findViewById(R.id.timer_three);
		ImageView timer_five = findViewById(R.id.timer_five);
		ImageView timer_ten = findViewById(R.id.timer_ten);
		ImageView timer_off = findViewById(R.id.timer_off);
		

		stopButton.setVisibility(View.GONE); // invisible al comienzo
		timer_three.setVisibility(View.GONE);
		timer_ten.setVisibility(View.GONE);
		timer_off.setVisibility(View.GONE);

		// imágenes con números de cuenta regresiva
		CDNumbers.add(findViewById(R.id.cd_one));
		CDNumbers.add(findViewById(R.id.cd_two));
		CDNumbers.add(findViewById(R.id.cd_three));
		CDNumbers.add(findViewById(R.id.cd_four));
		CDNumbers.add(findViewById(R.id.cd_five));
		CDNumbers.add(findViewById(R.id.cd_six));
		CDNumbers.add(findViewById(R.id.cd_seven));
		CDNumbers.add(findViewById(R.id.cd_eight));
		CDNumbers.add(findViewById(R.id.cd_nine));
		CDNumbers.add(findViewById(R.id.cd_ten));

		for(int n = 0; n < 10; n++){
			CDNumbers.get(n).setVisibility(View.GONE);
		}

		// botones de temporizador
		timer_five.setOnClickListener(

			v -> {

			timer_five.setVisibility(View.GONE);
			timer_ten.setVisibility(View.VISIBLE);
			this.tPreJump = 11000;		
		});
		
		timer_ten.setOnClickListener(

			v -> {

			timer_ten.setVisibility(View.GONE);
			timer_off.setVisibility(View.VISIBLE);
			this.tPreJump = 0;
			this.tJump = 60000;
			this.offFlag = true;
		});

		timer_off.setOnClickListener(

			v -> {

			timer_off.setVisibility(View.GONE);
			timer_three.setVisibility(View.VISIBLE);
			this.tPreJump = 4000;
			this.tJump = this.tJump_init;
			this.offFlag = false;
		});


		timer_three.setOnClickListener(

			v -> {

			timer_three.setVisibility(View.GONE);
			timer_five.setVisibility(View.VISIBLE);
			this.tPreJump = 6000;
		
		});

		startButton.setOnClickListener(

			v -> {
				
				this.timerPreJump = new CountDownTimer(tPreJump, 1000){

					private int i = (int) tPreJump/1000 - 2;

					@Override
					public void onTick(long millUntilFinished){

						tPreJump = millUntilFinished;
						
						if (tPreJump > 0) {
							// ocultar el anterior, si es que existe
							if (i < CDNumbers.size() - 1){
								CDNumbers.get(i+1).setVisibility(View.GONE);
							}

							// imprimir números en pantalla
							CDNumbers.get(i).setVisibility(View.VISIBLE);
							Log.d("tPreJump timer [i]", String.valueOf(i));
							
							if (i > 0){
								i--;
							}
						}
					}

					@Override
					public void onFinish(){

						CDNumbers.get(0).setVisibility(View.GONE);

						SaltoVertical.this.PDP.isVertical = true;

						SaltoVertical.this.startFlag = true;
						SaltoVertical.this.PDP.jumpFlag = true;

						//reiniciar lista de coordenadas
						SaltoVertical.this.PDP.heights.clear();

						// switch botones
						startButton.setVisibility(View.GONE);
						stopButton.setVisibility(View.VISIBLE);

						//timer -> tJump
						timerJump = new CountDownTimer(tJump, 1000){

							@Override
							public void onTick(long millUntilFinished){
								tJump = millUntilFinished;
							}

							@Override
							public void onFinish(){

								if (!offFlag){

									SaltoVertical.this.PDP.jumpFlag = false;

									float altura = calcularSalto6();

									// nueva vista para resultados
									Intent intent = new Intent(SaltoVertical.this, SaltoVerticalResult.class);

									Bundle resultBundle = new Bundle();
									resultBundle.putInt("user_id", user_id);
									resultBundle.putFloat("result", altura);
									resultBundle.putInt("tipo", SaltoVertical.this.tipo);
									resultBundle.putInt("group_id", SaltoVertical.this.group_id);
									resultBundle.putInt("student_id", SaltoVertical.this.student_id);	
									intent.putExtras(resultBundle);

									startActivity(intent);
									
									finish();

									stopButton.setVisibility(View.GONE);
									startButton.setVisibility(View.VISIBLE);
								}
							}
						}.start();
					}
				}.start();
		});

		// boton para detener medición
		stopButton.setOnClickListener(

			v -> {

				if (this.startFlag && this.offFlag) {

					this.PDP.jumpFlag = false;
					float altura = calcularSalto6();

					// nueva vista para resultados
					Intent intent = new Intent(SaltoVertical.this, SaltoVerticalResult.class);

					// addResult(user_id, altura, this.tipo, this.group_id, this.student_id);
					Bundle resultBundle = new Bundle();
					resultBundle.putInt("user_id", user_id);
					resultBundle.putFloat("result", altura);
					resultBundle.putInt("tipo", this.tipo);
					resultBundle.putInt("group_id", this.group_id);
					resultBundle.putInt("student_id", this.student_id);				
					
					intent.putExtras(resultBundle);

					startActivity(intent);
					
					finish();

					this.startFlag = false;

					stopButton.setVisibility(View.GONE);
					startButton.setVisibility(View.VISIBLE);
				}
			});


		if (allPermissionsGranted()) {
			createCameraSource(POSE_DETECTION);
		} else {
			getRuntimePermissions();
		}

		
	}

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


	//retorna coordenada de altura máxima
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
	

	public float calcularSalto6() {

		Instant tiempoInicial = null;

		//máxima altura
		HeightData minCoord = getMinCoord();
		Instant tiempoFinal = minCoord.getTimestamp();

		int i = 0;
		while (this.PDP.heights.get(i).getCoord() > minCoord.getCoord())
			i++;

		i--;

		// casos límites
		if (i == 0 || i == this.PDP.heights.size() - 1){
			Log.d("Altura mal medida, i: ", String.valueOf(i));
			return 0;
		}
			
		HeightData preY = this.PDP.heights.get(i-1);
		HeightData actY = this.PDP.heights.get(i);
		HeightData postY = this.PDP.heights.get(i+1);  // altura máxima == minCoord

		Duration Ddt1 = new Duration(preY.getTimestamp(), actY.getTimestamp());
		Duration Ddt2 = new Duration(actY.getTimestamp(), postY.getTimestamp());
		long dt1 = Ddt1.getMillis();
		long dt2 = Ddt2.getMillis();
		float dh1 = (float) (Math.abs(actY.getCoord() - preY.getCoord()));
		float dh2 = (float) (Math.abs(postY.getCoord() - actY.getCoord()));

		// si obtuvieron ambos dhdt bajo el límite (dhdtAccept)
		boolean flagPiso = false;

		//obtener tiempo inicial (inicio de salto) a partir de variación de altura
		while (i > 1){

			System.out.println("pendiente 1: " + dh1/dt1 + "| 2: " + dh2/dt2);

			//si se alcanza una pendiente estable (son negativas)
			if (dh1/dt1 < dhdtAccept && dh2/dt2 < dhdtAccept){
				System.out.println("piso alcanzado!");
				flagPiso = true;
				break;
			}

			i--;
			preY = this.PDP.heights.get(i-1);
			actY = this.PDP.heights.get(i);
			postY = this.PDP.heights.get(i+1);

			Ddt1 = new Duration(preY.getTimestamp(), actY.getTimestamp());
			Ddt2 = new Duration(actY.getTimestamp(), postY.getTimestamp());
			dt1 = Ddt1.getMillis();
			dt2 = Ddt2.getMillis();
			dh1 = (float) (Math.abs(actY.getCoord() - preY.getCoord()));
			dh2 = (float) (Math.abs(postY.getCoord() - actY.getCoord()));

		}

		// si no se logra nunca la tolerancia, considerar el salto como 
		// la diferencia entre el primer punto y el más alto

		tiempoInicial = flagPiso ? postY.getTimestamp() : this.PDP.heights.get(0).getTimestamp();

		if (tiempoInicial != null) {

			Duration duration = new Duration(tiempoInicial, tiempoFinal);
			long tiempoSalto = duration.getMillis();

			//calculo ecuación física
			System.out.println("TIEMPO de Salto: " + tiempoSalto + " (" + tiempoInicial + ", " + tiempoFinal + ")");


			return (float) ((9.807 *  Math.pow(tiempoSalto/1000.0, 2) )/2.0);

		} else {
			Log.d("NO HAY DATOS DE COORDENADAS SUFICIENTES", "(no se halla tiempo inicial)");
			return 0;
		}
	}


	/** Stops the camera. */
	@Override
	protected void onPause() {
		super.onPause();
		preview.stop();
	}

	@Override
	public void onDestroy() {
		
		super.onDestroy();
		if (cameraSource != null) {
			cameraSource.release();
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
