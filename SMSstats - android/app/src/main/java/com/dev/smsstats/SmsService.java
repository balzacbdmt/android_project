package com.dev.smsstats;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.telephony.SmsMessage;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

public class SmsService extends Service {

    private SMSReceiver mSMSreceiver;
    private static final String SMS_RECEIVED = "android.provider.Telephony.SMS_RECEIVED";

    private boolean active;
    private int countSMSReceived;

    @Override
    public void onCreate()
    {
        super.onCreate();
        //SMS event receiver
        mSMSreceiver = new SMSReceiver();
        IntentFilter filter = new IntentFilter(SMS_RECEIVED);
        registerReceiver(mSMSreceiver, filter);
        Log.v("Service","Running !");
    }

    public void onDestroy() {
        Log.v("Service","Stopped !");
        unregisterReceiver(mSMSreceiver);
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private class SMSReceiver extends BroadcastReceiver {
        public SMSReceiver(){
            Log.v("SMSReceiver","Running !");
            final Handler handler = new Handler();
            final int delay = 1000; //milliseconds

            handler.postDelayed(new Runnable(){
                public void run(){
                Log.v("SMSREceiver", "WORKING ANYMORE !");
                //Simple test to check if service and receiver is working
                handler.postDelayed(this, delay);
                }
            }, delay);
        }
        @Override
        public void onReceive(Context context, Intent intent) {
            Log.v("SMSReceiver","An sms have been received");
            //TODO when ça marchera
            //Get list smsType
            //foreach smsType
            //If smsType.getWR == leSMSRecu.getBody
            //  send svms to leSmsRecu.getExpediteur body = smsType.getBody
            //That's all !
            if(active) SmsService.this.countSMSReceived++;
        }
    }
}
