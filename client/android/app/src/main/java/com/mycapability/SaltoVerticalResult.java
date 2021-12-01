package com.mycapability;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
import org.json.JSONException;
import org.json.JSONObject;

import com.android.volley.toolbox.Volley;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.RequestQueue;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.NetworkResponse;
import com.android.volley.AuthFailureError;

import com.mycapability.API_addResult;
import com.mycapability.API_getNewResults;
import com.mycapability.API_updateScore;


public class SaltoVerticalResult extends AppCompatActivity {

	// datos de usuario
	private int user_id;
	private float altura;

	//para API requests
	API_addResult addResult = new API_addResult();
	API_getNewResults getNewResults = new API_getNewResults();
	API_updateScore updateScore = new API_updateScore();

	private float calcPotencia(){
		//escoger una
		//sqrt(4.9) * masa * sqrt(altura) * 9.81
		//43.8*altura + 32.7*masa - 16.8*user_height + 431
		return altura;
	}

	private float calcFuerza(float potencia, float velocidad){
		return potencia / velocidad;
	}

	private float calcVelocidad(){
		//v = g * delta_t (hay que obtener t a partir de h)
		//h = 
		return altura;
	}
	
	@SuppressLint("DefaultLocale")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// obtener datos de usuario
		Bundle resultBundle = getIntent().getExtras();
			if (resultBundle != null)
				this.user_id = resultBundle.getInt("user_id");
				this.altura = resultBundle.getFloat("result");

		setContentView(R.layout.salto_vertical_result);

		System.out.println("RESULTADOOOS:\n" + user_id + " | " + altura);
		
		float Potencia = calcPotencia();
		float Velocidad = calcVelocidad();
		float Fuerza = calcFuerza(Potencia, Velocidad);
		
		// texto que aparecerá en la vista
		final TextView textViewAltura = (TextView) findViewById(R.id.altura);
		textViewAltura.setText(String.format("%.2f", altura));

		final TextView textViewPotencia = (TextView) findViewById(R.id.potencia);
		textViewPotencia.setText(String.format("%.2f", Potencia));
		
		final TextView textViewFuerza = (TextView) findViewById(R.id.fuerza);
		textViewFuerza.setText(String.format("%.2f", Fuerza));
		
		final TextView textViewVelocidad = (TextView) findViewById(R.id.velocidad);
		textViewVelocidad.setText(String.format("%.2f", Velocidad));

	}

	public void onPositivePress(View v){

		if (v.getId() == R.id.positive_button) {
			//agregar a BD
			// if (altura > 0){
			System.out.println("posteandoooo");
			this.addResult.addResult(this.user_id, this.altura, 0, this);

			//	updateScore();
			// }
			System.out.println("RESULTADO GUARDADOOOO");
			finish();

			// volver a menú de salto vertical
		}
	}

	public void onNegativePress(View v){
		if (v.getId() == R.id.negative_button) {
			// volver a vista de cámara
			System.out.println("RESULTADO perdido..");
			finish();
		}
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		if (addResult.requestQueue != null) {
			addResult.requestQueue.cancelAll("SaltoVerticalResult");
		}
		if (getNewResults.requestQueue != null) {
			getNewResults.requestQueue.cancelAll("SaltoVerticalResult");
		}
		if (updateScore.requestQueue != null) {
			updateScore.requestQueue.cancelAll("SaltoVerticalResult");
		}
	}

	private void updateScore(float result){

		int score = (int)(result * 330);
		
		// data.forEach(element => {
		// 	if (element.type != 0){
		// 		actScore += element * 330;
		// 	};
		// });

		// this.getNewResults.getNewResults(this.user_id, this);
		// cada elemento con type != 0 se suma (* 330) a score

		// this.updateScore.updateScore(this.user_id, score, this);

	}

}