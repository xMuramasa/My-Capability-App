
//hay que meter este código en algún lado jej

import com.android.volley;


    // Instantiate the RequestQueue.
    RequestQueue queue = Volley.newRequestQueue(this);
    String url ="http://localhost:5000/results";

    // Request a string response from the provided URL.
    StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
                    new Response.Listener<String>() {

        @Override
        public void onResponse(String response) {
            // Display the first 500 characters of the response string.
            textView.setText("Respuesta de server: "+ response.substring(0,500));
        }
    }, new Response.ErrorListener() {
        @Override
        public void onErrorResponse(VolleyError error) {
            textView.setText("POST Request didn't work!");
        }
    });

    // Add the request to the RequestQueue.
    queue.add(stringRequest);


    //----- - - - - - - - -- - - - - - - - - 

import com.android.volley;

    int user_id = 4;
    int result = 100;
    String date = "17/7/2021";

    try {
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        String URL = "http://localhost:5000/results";
        JSONObject jsonBody = new JSONObject();
        jsonBody.put("user_id", user_id);
        jsonBody.put("result", result);
        jsonBody.put("type", 0); //salto
        jsonBody.put("date", date);
        final String requestBody = jsonBody.toString();

        StringRequest stringRequest = new StringRequest(Request.Method.POST, URL, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.i("VOLLEY", response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
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
                return Response.success(responseString, HttpHeaderParser.parseCacheHeaders(response));
            }
        };

        requestQueue.add(stringRequest);
    } catch (JSONException e) {
        e.printStackTrace();
    }