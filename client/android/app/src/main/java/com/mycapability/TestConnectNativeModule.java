package com.mycapability;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class TestConnectNativeModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    TestConnectNativeModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "TestConnectNative";
    }

    @ReactMethod
    public void sendMessageToNative(String rnMessage) {
        Log.d("This log is from java", rnMessage);
    }

    @ReactMethod
    public void sendCallbackToNative(Callback rnCallback) {
        rnCallback.invoke("A greeting from java");
    }

    @ReactMethod
    public void finishActivity() {
        if (getCurrentActivity() != null) {
            getCurrentActivity().finish();
        }
    }

    /*@ReactMethod
    fun goToSecondActivity() {
        if (currentActivity != null) {
            val intent = Intent(currentActivity, SecondActivity::class.java)
            currentActivity!!.startActivity(intent)
        }
    }*/
} 