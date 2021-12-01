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

public class API_getNewResults {
    
    public RequestQueue requestQueue;
//    List<String> jsonResponses = new ArrayList<>();
		public double score = 0;

    //GetNewResults
    public void getNewResults(int user_id, int type, Context ctx){
			this.requestQueue = Volley.newRequestQueue(ctx);
			String URL = "https://server-mycap.herokuapp.com/bestResult/" + user_id;
//			JSONObject jsonBody = new JSONObject();

//			jsonBody.put("id", user_id);

//			final String requestBody = jsonBody.toString();

//			System.out.println("json request: " + requestBody);

			JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, URL, null, new Response.Listener<JSONArray>() {

				@Override
				public void onResponse(JSONArray response) {
					try {

						for(int i = 0; i < response.length(); i++){

							JSONObject jsonObject = response.getJSONObject(i);

							int jsonType = jsonObject.getInt("type");
							double result = jsonObject.getDouble("result");

							System.out.println("newResult: type, result: " + jsonType + " " + result);

							if (jsonType != 0){
								API_getNewResults.this.score += result * 330;
							}
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
