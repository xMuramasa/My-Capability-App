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
import com.mycapability.API_getWeight;


public class SaltoVerticalResult extends AppCompatActivity {

	// datos de usuario
	private int user_id;
	private float altura;
	public int weight;
	private int group_id; 
	private int student_id; 
	private int tipo; 

	//para API requests
	API_addResult addResult = new API_addResult();
	API_getNewResults getNewResults = new API_getNewResults();
	API_getWeight getWeight = new API_getWeight();
	
		
	private float calcPotencia(int weight, float altura){
		//escoger una
		//43.8*altura + 32.7*masa - 16.8*user_height + 431
		Log.d("pot:", String.valueOf(Math.sqrt(4.9f) * weight) + " "+ String.valueOf(Math.sqrt(altura) * 9.807f));
		return ((float) Math.sqrt(4.9f) * weight * (float) Math.sqrt(altura) * 9.807f);
	}

	private float calcFuerza(float potencia, float velocidad){
		return potencia / velocidad;
	}

	private float calcVelocidad(float altura){
		//float v = g * Math.sqrt(h*2/g) (hay que obtener t a partir de h)
		return  9.807f * (float) Math.sqrt(altura*2.0f/9.807f);
	}

	void setWeight(int w){
		this.weight = w;
	}
	
	@SuppressLint("DefaultLocale")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// obtener datos de usuario
		Bundle resultBundle = getIntent().getExtras();
		if (resultBundle != null){
			this.user_id = resultBundle.getInt("user_id");
			this.altura = resultBundle.getFloat("result");
			this.group_id = resultBundle.getInt("group_id");
			this.student_id = resultBundle.getInt("student_id");
			this.tipo = resultBundle.getInt("tipo");
		}

		setContentView(R.layout.salto_vertical_result);
		
		final TextView textViewPotencia = (TextView) findViewById(R.id.potencia);;
		final TextView textViewFuerza = (TextView) findViewById(R.id.fuerza);
		final TextView textViewVelocidad = (TextView) findViewById(R.id.velocidad);
		
		if(this.tipo == 1){

			this.getWeight.getWeight(this.user_id, new API_getWeight.VolleyCallback() {
				@Override
				public void onSuccess(int response){
					Log.d("w @ call", String.valueOf(response)); // works
					SaltoVerticalResult.this.weight = response;
					setWeight(response);
					Log.d("w @ call", String.valueOf(response)); // works
					
					float Potencia = calcPotencia(response, SaltoVerticalResult.this.altura);
					float Velocidad = calcVelocidad(SaltoVerticalResult.this.altura);
					float Fuerza = calcFuerza(Potencia, Velocidad);
		
					textViewPotencia.setText(String.format("%.2f", Potencia));
					textViewFuerza.setText(String.format("%.2f", Fuerza));
					textViewVelocidad.setText(String.format("%.2f", Velocidad));
				}
			}, SaltoVerticalResult.this);
			//this.weight = this.getWeight.weight;
			
		} else {
			textViewPotencia.setText("-");
			textViewFuerza.setText("-");
			textViewVelocidad.setText("-");
		}
		
		System.out.println("RESULTADOOOS:\n" + this.user_id + " | " + this.altura);
		
		// texto que aparecerá en la vista
		final TextView textViewAltura = (TextView) findViewById(R.id.altura);
		textViewAltura.setText(String.format("%.2f", altura));


	}

	public void onPositivePress(View v){

		if (v.getId() == R.id.positive_button) {
			//agregar a BD
			if (this.altura > 0){
				System.out.println("posteandoooo");

				//addResult(user_id, salto, this.tipo, this.group_id, this.student_id);
				this.addResult.addResult(this.user_id, this.altura, 0, this.tipo, this.group_id, this.student_id, this);

				this.getNewResults.getNewResults(this.user_id, 0, altura, this);

				System.out.println("RESULTADO GUARDADOOOO");
			}
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
		if (getNewResults.updateScore.requestQueue != null) {
			getNewResults.updateScore.requestQueue.cancelAll("SaltoVerticalResult");
		}
		if (getWeight.requestQueue != null) {
			getWeight.requestQueue.cancelAll("SaltoVerticalResult");
		}
	}
}