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

package com.mycapability;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.DialogInterface;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.view.View;
import android.graphics.Matrix;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.Toast;
import android.widget.ToggleButton;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.ActivityCompat.OnRequestPermissionsResultCallback;
import androidx.core.content.ContextCompat;

import com.google.android.gms.common.annotation.KeepName;
import com.google.mlkit.vision.pose.PoseDetectorOptionsBase;

import com.mycapability.CameraSource;
import com.mycapability.CameraSourcePreview;
import com.mycapability.GraphicOverlay;
import com.mycapability.R;
import com.mycapability.posedetector.PoseDetectorProcessor;
import com.mycapability.preference.PreferenceUtils;
import com.mycapability.preference.SettingsActivity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

import org.joda.time.Instant;
import org.joda.time.Duration;

// para API requests
import com.mycapability.API_addResult;
import com.mycapability.API_getNewResults;


@KeepName
public final class SaltoHorizontal extends AppCompatActivity
	implements OnRequestPermissionsResultCallback,
		CompoundButton.OnCheckedChangeListener {

	private static final String POSE_DETECTION = "Pose Detection";

	private static final String TAG = "SaltoHorizontal";
	private static final int PERMISSION_REQUESTS = 1;

	//datos de usuario
	private int user_id;
	private int group_id; //metros
	private int student_id; //metros
	private double real_user_height; //metros
	private int tipo; //metros

	//si se ha presionado el botón de inicio
	private boolean startFlag = false;
	private boolean offFlag = false;	// si no hay temporizador

	private CameraSource cameraSource = null;
	private CameraSourcePreview preview;
	private GraphicOverlay graphicOverlay;

	//instancia del procesador de pose
	public PoseDetectorProcessor PDP;

	//para API requests
	API_addResult addResult = new API_addResult();
	API_getNewResults getNewResults = new API_getNewResults();

	// Timer
	public ArrayList<ImageView> CDNumbers = new ArrayList<ImageView>();

	private CountDownTimer timerPreJump;
	private CountDownTimer timerJump;
	private long tPreJump_init = 6000; // tiempo temporizador
	private long tJump_init = 5000;    // tiempo de salto

	private long tPreJump = tPreJump_init;
	private long tJump = tJump_init;


	@SuppressLint("DefaultLocale")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.d(TAG, "onCreate");

		//obtener parámetros de usuario
		Bundle b = getIntent().getExtras();
		if (b != null){
			this.user_id = b.getInt("user_id");
			this.real_user_height = b.getInt("height")*1.0;
			this.group_id = b.getInt("group_id");
			this.student_id = b.getInt("student_id");
			this.tipo = b.getInt("tipo");
		}
		else {
			System.out.println("datos de usuario no recibidos de React Native");
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

		// en caso de no haber ingresado la altura el usuario
		if (this.real_user_height == 0) alturaEsCero();

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
		
		startButton.setRotation(90);
		stopButton.setRotation(90);
		facingSwitch.setRotation(90);
		timer_three.setRotation(90);
		timer_five.setRotation(90);
		timer_ten.setRotation(90);
		timer_off.setRotation(90);

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
			CDNumbers.get(n).setRotation(90);
		}

		stopButton.setVisibility(View.GONE); // invisible al comienzo

		
		// botones de temporizador
		timer_five.setOnClickListener(

			v -> {

			timer_five.setVisibility(View.GONE);
			timer_ten.setVisibility(View.VISIBLE);
			this.tPreJump = 11000;		
			this.tJump = this.tJump_init;
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
			this.tJump = this.tJump_init;
		});

		// al presionar los botones
		startButton.setOnClickListener(

			v -> {

				// switch entre botones
				startButton.setVisibility(View.GONE);

				this.timerPreJump = new CountDownTimer(tPreJump, 1000){

					private int i = (int) tPreJump/1000 - 2;

					@Override
					public void onTick(long millUntilFinished){
						tPreJump = millUntilFinished;

						if (tPreJump > 0){
							//ocultar el anterior, si es que existe
							if (i < CDNumbers.size() - 1){
								CDNumbers.get(i+1).setVisibility(View.GONE);
							}

							// imprimir números en pantalla
							CDNumbers.get(i).setVisibility(View.VISIBLE);

							if (i > 0){
								i--;
							}
						}
					}

					@Override
					public void onFinish(){

						CDNumbers.get(0).setVisibility(View.GONE);

						SaltoHorizontal.this.PDP.isVertical = false;

						SaltoHorizontal.this.startFlag = true;
						SaltoHorizontal.this.PDP.jumpFlag = true;

						//reiniciar lista de coordenadas
						SaltoHorizontal.this.PDP.widths.clear();

						// switch botones
						startButton.setVisibility(View.GONE);
						stopButton.setVisibility(View.VISIBLE);

						//timer -> tJump
						timerJump = new CountDownTimer(tJump, 1000){
							@Override
							public void onTick(long millUntilFinished){
								tJump = millUntilFinished;
							}

							@SuppressLint("DefaultLocale")
							@Override
							public void onFinish(){

								if (!offFlag){

									SaltoHorizontal.this.PDP.jumpFlag = false;

									float salto = (float) calculateHorizontalJump() / 100.0f;

									//agregar a BD
									if (salto > 0){
										
										AlertDialog.Builder builder = new AlertDialog.Builder(SaltoHorizontal.this);
										builder.setTitle("Resultado de salto horizontal")
										.setMessage(String.format("%.2f", salto) + " m\n" +
													"¿Deseas guardar el resultado?");
			
										builder.setPositiveButton("Sí", new DialogInterface.OnClickListener() { 
											@Override
											public void onClick(DialogInterface dialog, int which) {

												// SaltoHorizontal.this.addResult.addResult(SaltoHorizontal.this.user_id, salto, 2, SaltoHorizontal.this);
												SaltoHorizontal.this.addResult.addResult(SaltoHorizontal.this.user_id, salto, 2, 
													SaltoHorizontal.this.tipo, SaltoHorizontal.this.group_id, SaltoHorizontal.this.student_id, SaltoHorizontal.this);

												SaltoHorizontal.this.getNewResults.getNewResults(SaltoHorizontal.this.user_id, 2, salto, SaltoHorizontal.this);

												finish();
											}
										});
										builder.setNegativeButton("No", new DialogInterface.OnClickListener() { 
											@Override
											public void onClick(DialogInterface dialog, int which) {
												// nada
											}
										});
										builder.show();
									}

									stopButton.setVisibility(View.GONE);
									startButton.setVisibility(View.VISIBLE);
								}
							}
						}.start();
					}
				}.start();
			}
		);

		stopButton.setOnClickListener(

			v -> {

				//si es que se presionó el botón de inicio
				if (this.startFlag && this.offFlag) {

					this.PDP.jumpFlag = false;
					float salto = (float) calculateHorizontalJump() / 100.0f;
					
					//agregar a BD
					if (salto > 0){
		
						AlertDialog.Builder builder = new AlertDialog.Builder(SaltoHorizontal.this);
						builder.setTitle("Resultado de salto horizontal")
						.setMessage(String.format("%.2f", salto) + " m\n" +
									"¿Deseas guardar el resultado?");

						builder.setPositiveButton("Sí", new DialogInterface.OnClickListener() { 
							@Override
							public void onClick(DialogInterface dialog, int which) {

								// addResult(user_id, salto, this.tipo, this.group_id, this.student_id);
								SaltoHorizontal.this.addResult.addResult(SaltoHorizontal.this.user_id, salto, 2, 
									SaltoHorizontal.this.tipo, SaltoHorizontal.this.group_id, SaltoHorizontal.this.student_id, SaltoHorizontal.this);

								SaltoHorizontal.this.getNewResults.getNewResults(SaltoHorizontal.this.user_id, 2, salto, SaltoHorizontal.this);

								finish();
							}
						});
						builder.setNegativeButton("No", new DialogInterface.OnClickListener() { 
							@Override
							public void onClick(DialogInterface dialog, int which) {
								// nada
							}
						});
						builder.show();
					}

					this.startFlag = false;

					stopButton.setVisibility(View.GONE);
					startButton.setVisibility(View.VISIBLE);
				}
			}
		);

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
			Log.i(TAG, "Using Pose Detector with options " + poseDetectorOptions);
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

//pop up cuando la altura del usuario es 0: debe salir de la vista
	private void alturaEsCero(){
		AlertDialog.Builder builder = new AlertDialog.Builder(this);
		builder.setTitle("Faltan datos");
		builder.setMessage("Para utilizar esta función, indica tu altura en el Perfil")
		.setPositiveButton("Ok", new DialogInterface.OnClickListener(){
			@Override
			public void onClick(DialogInterface dialog, int which){
				finish();
			}
		}).show();
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
	

	/* Retorna la altura del usuario usando el maximo */
	public double getUsrHeight(){
		double maxHeight = -90000;
		for(int i = 0; i < this.PDP.userHeights.size()/4; i++){
			// se guardó la altura en la coordenada X en el archivo PDP
			if(this.PDP.userHeights.get(i).getX() > maxHeight){
				maxHeight = this.PDP.userHeights.get(i).getX();
			}
		}
		return maxHeight;
	}


	// retorna coordenada de altura máxima de talón
	public WidthData getMinY(){

		ListIterator<WidthData> iterator = this.PDP.widths.listIterator();
		WidthData minY = new WidthData(new Instant(), 0, -9999);

		while(iterator.hasNext()){

			WidthData currWidthData = iterator.next();

			if (currWidthData.getY() > minY.getY()){
				minY = currWidthData;
			}
		};

		System.out.println("MIN Y: " + minY.getY());
		return minY;
	}

	// calcular distancia horizontal de salto
	public double calculateHorizontalJump(){
		// return var
		double horizontal = 0;
		// tolerancia
		double tol = 5.0;
		// tolerancia piso
		double tolFloor = 5.0;

		// initial and final coordinates of horizontal jump
		double xInitial = 0;
		double yInitial = 0;

		double xFinal = 0;
		double yFinal = 0;

		// minimum X,Y -> at half jump
		WidthData halfJump = getMinY();
		double minY = halfJump.getY();

		// height by coordinates
		double usrHeight = getUsrHeight();

		// mitad de altura
		double half = Math.abs((minY + this.PDP.widths.get(1).getY())/2);

		// current pos of array
		int i = 0, ii = 0, iii = 0;
		
		// mov curr to minY
		for (i = 0; i < this.PDP.widths.size(); i++){
			if(this.PDP.widths.get(i).getY() == minY){
				if (i == 0 || i == this.PDP.widths.size() - 1){
					Log.d("Altura mal medida, i:", String.valueOf(i));
					return 0;
				}
				break;
			}
		}


		System.out.printf(
			"--------------------------------------> minY: %s: %,.2f\n", String.valueOf(halfJump.getTimestamp()), minY);
		
		// initial coords
		for (ii=i; ii > 1 ; ii--){
			double yAct = this.PDP.widths.get(ii).getY();
			double xAct = this.PDP.widths.get(ii).getX();

			// at 10% vertical dist is no diff than actual Y_0, unless its big jump
			if (yAct < half){
				double yPrev = this.PDP.widths.get(ii-1).getY();
				double yNext = this.PDP.widths.get(ii+1).getY();
				// diffs of spatial movement
				double dy_1 = Math.abs(yAct - yPrev);
				double dy_2 = Math.abs(yNext - yAct);
				System.out.printf(
					"-------------------------------------> dy_1: %,.2f, dy_2: %,.2f\n", dy_1, dy_2);

				if (dy_1 < tol && dy_2 < tol){
					xInitial = xAct;
					yInitial = yAct;
					System.out.printf(
						"-------------------------------------> Coordenadas iniciales: %,.2f, %,.2f\n", 
						xInitial, yInitial);

					break;
				}
			}
		}

		//final coords
		for (iii=i; iii < this.PDP.widths.size() - 1; iii++){
			double yAct = this.PDP.widths.get(iii).getY();
			double xAct = this.PDP.widths.get(iii).getX();

			// at 10% vertical dist is no diff than actual Y_0, unless its big jump
			if (yAct < half){
				double yPrev = this.PDP.widths.get(iii-1).getY();
				double yNext = this.PDP.widths.get(iii+1).getY();
				// diffs of spatial movement
				double dy_1 = Math.abs(yAct - yPrev);
				double dy_2 = Math.abs(yNext - yAct);
				double dy_Floor = Math.abs(yAct - yInitial);

				if (dy_1 < tol && dy_2 < tol && dy_Floor < tolFloor){
					xFinal = xAct;
					yFinal = yAct;

					System.out.printf(
						"--------------------------------------> Coordenadas finales: %,.2f, %,.2f\n", 
						xFinal, yFinal);
					break;
				}
			}
		}

		horizontal = Math.abs(xFinal - xInitial);
		
		System.out.printf(
			"--------------------------------------> DATOS: %,.2f %,.2f %,.2f\n", 
			this.real_user_height, usrHeight, horizontal);
			
		horizontal = (horizontal * this.real_user_height) / usrHeight;

		System.out.printf(
			"--------------------------------------> Distancia de salto horizontal!!: %,.2f [cm] \n", 
			horizontal);

		return horizontal;
    }


	/** Stops the camera. */
	@Override
	protected void onPause(){
		super.onPause();
		if (addResult.requestQueue != null) {
			addResult.requestQueue.cancelAll("SaltoVerticalResult");
		}
		if (getNewResults.requestQueue != null) {
			getNewResults.requestQueue.cancelAll("SaltoVerticalResult");
		}
		if (getNewResults.updateScore.requestQueue != null) {
			getNewResults.updateScore.requestQueue.cancelAll("SaltoVerticalResult");
		}
		preview.stop();
	}

	@Override
	public void onDestroy() {

		super.onDestroy();
		if (cameraSource != null) {
			cameraSource.release();
		}
		if (addResult.requestQueue != null) {
			addResult.requestQueue.cancelAll("SaltoVerticalResult");
		}
		if (getNewResults.requestQueue != null) {
			getNewResults.requestQueue.cancelAll("SaltoVerticalResult");
		}
		if (getNewResults.updateScore.requestQueue != null) {
			getNewResults.updateScore.requestQueue.cancelAll("SaltoVerticalResult");
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
