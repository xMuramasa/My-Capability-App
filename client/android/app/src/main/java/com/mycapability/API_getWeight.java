package com.mycapability;

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

public class API_getWeight {
    
    public RequestQueue requestQueue;
	public int weight; 

	public interface VolleyCallback {
		void onSuccess(int response);
	}

    public void getWeight(int user_id, final VolleyCallback callback, Context ctx){
		this.requestQueue = Volley.newRequestQueue(ctx);
		String URL = "https://server-mycap.herokuapp.com/user/" + user_id;

		JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, URL, null, new Response.Listener<JSONObject>() {

			@Override
			public void onResponse(JSONObject response) {
				try {
					
					// API_getWeight.this.weight = response.getInt("weight");
					// Log.d("api_weight: ", String.valueOf(API_getWeight.this.weight));
					callback.onSuccess(response.getInt("weight"));

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

		requestQueue.add(jsonObjectRequest);

	}

}
