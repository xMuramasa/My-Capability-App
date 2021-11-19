package com.mycapability;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.Intent;
import android.os.Bundle;

import java.util.Map;
import java.util.HashMap;

import android.util.Log;

public class ConnectionModule extends ReactContextBaseJavaModule {

    ConnectionModule(ReactApplicationContext context) {
        super(context);
    }
    
    @Override
    public String getName() {
        return "ConnectionModule";
    }

    @ReactMethod
    public void printMessage(String message) {
        System.out.println(message);

        Log.d("ConnectionModule", "Create event called with name: " + message);
    }

    @ReactMethod
    public void startSaltoVertical(int user_id, int height) {

        ReactApplicationContext context = getReactApplicationContext();

        Intent intent = new Intent(context, SaltoVertical.class);


        // bundle para pasar id y altura a la actividad
        Bundle b = new Bundle();
        b.putInt("user_id", user_id);
        b.putInt("height", height);        
        intent.putExtras(b);

        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);

    } 

    @ReactMethod
    public void startSaltoHorizontal(int user_id, int height) {
        Log.d("ConnectionModule", "------------------------------------------------------------------------"+ String.valueOf(height));

        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, SaltoHorizontal.class);

        // bundle para pasar id y altura a la actividad
        Bundle b = new Bundle();
        b.putInt("user_id", user_id);
        b.putInt("height", height);
        
        intent.putExtras(b);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }  

}