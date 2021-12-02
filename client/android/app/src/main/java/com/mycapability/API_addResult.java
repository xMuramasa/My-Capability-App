package com.mycapability;

import java.io.UnsupportedEncodingException;

import android.content.Context;
import android.util.Log;
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

import org.json.JSONException;
import org.json.JSONObject;

public class API_addResult {

    RequestQueue requestQueue;

	public void addResult(int user_id, float result, int type, int tipo, int group_id, int student_id, Context ctx){

		try {
			this.requestQueue = Volley.newRequestQueue(ctx);
			JSONObject jsonBody = new JSONObject();

			String URL = "";
			if (tipo == 1){
				Log.d("TIPO: ", String.valueOf(tipo));
				URL = "https://server-mycap.herokuapp.com/results";
				jsonBody.put("user_id", user_id);
				jsonBody.put("result", result);
				jsonBody.put("type", type); //salto horizontal
			} else{
				Log.d("TIPO: ", String.valueOf(tipo));
				URL = "https://server-mycap.herokuapp.com/studentResults";
				jsonBody.put("id_prof", user_id);
				jsonBody.put("group_id", group_id);
				jsonBody.put("student_id", student_id);
				jsonBody.put("type", type);
				jsonBody.put("tipo", tipo);
				jsonBody.put("res", result);
			}

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
}
