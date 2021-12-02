package com.mycapability;

import java.util.ArrayList;
import java.util.List;

import android.content.Context;
import android.util.Log;

import com.android.volley.toolbox.Volley;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.RequestQueue;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.NetworkResponse;
import com.android.volley.AuthFailureError;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import com.mycapability.API_updateScore;

public class API_getNewResults {
    
		API_updateScore updateScore = new API_updateScore();
    public RequestQueue requestQueue;
		public double score = 0;

    public void getNewResults(int user_id, int type, float result, Context ctx){
			this.requestQueue = Volley.newRequestQueue(ctx);
			String URL = "https://server-mycap.herokuapp.com/bestResult/" + user_id;

			JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, URL, null, new Response.Listener<JSONArray>() {

				@Override
				public void onResponse(JSONArray response) {
					try {

						for(int i = 0; i < response.length(); i++){

							JSONObject jsonObject = response.getJSONObject(i);

							int jsonType = jsonObject.getInt("type");
							double jsonResult = jsonObject.getDouble("result");

							Log.d("newResult: type, result: ", String.valueOf(jsonType) + " "+ String.valueOf(jsonResult));

							if (jsonType != type){
								API_getNewResults.this.score += jsonResult * 330;
							}
						}

						if (response.length() > 0){
							API_getNewResults.this.score += (double) result * 330;
							System.out.println("score fin: " + API_getNewResults.this.score);
							API_getNewResults.this.updateScore.updateScore(user_id, (int) score, ctx);
						} else {
							Log.d("respuesta", "nula");
						}

					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
			}, new Response.ErrorListener() {
				@Override
				public void onErrorResponse(VolleyError error) {
					error.printStackTrace();
				}
			});

			requestQueue.add(jsonArrayRequest);

		}

}
