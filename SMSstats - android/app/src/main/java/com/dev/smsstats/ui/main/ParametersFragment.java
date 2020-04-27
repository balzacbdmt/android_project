package com.dev.smsstats.ui.main;

import android.app.PendingIntent;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.dev.smsstats.MainActivity;
import com.dev.smsstats.R;
import com.dev.smsstats.SmsService;

public class ParametersFragment extends Fragment implements View.OnClickListener {
    Button startService;
    Button startBomber;
    EditText phoneNumberSmsBomber;
    EditText bodySmsBomber;
    EditText quantitySmsBomber;

    Boolean running = false;
    Intent smsType;

    public static ParametersFragment newInstance() {
        ParametersFragment fragment = new ParametersFragment();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(
            @NonNull LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        View layout = inflater.inflate(R.layout.fragment_parameters, container, false);

        startService = layout.findViewById(R.id.button_active_smstype);
        startBomber = layout.findViewById(R.id.button_start_sb);
        phoneNumberSmsBomber = layout.findViewById(R.id.editText_pnv_sb);
        bodySmsBomber = layout.findViewById(R.id.editText_body_sb);
        quantitySmsBomber = layout.findViewById(R.id.editText_qt_sb);
        startService.setOnClickListener(this);
        startBomber.setOnClickListener(this);

        smsType = new Intent(getContext(), SmsService.class);

        return layout;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button_active_smstype:
                if (running) {
                    getContext().stopService(smsType);
                    startService.setText(getResources().getString(R.string.turn_on_auto_answer));
                    running = false;
                    break;
                } else {
                    getContext().startService(smsType);
                    startService.setText(getResources().getString(R.string.turn_off_auto_answer));
                    running = true;
                    break;
                }
            case R.id.button_start_sb:
                if (quantitySmsBomber.getText().toString().length() > 0) {
                    int nbSms = Integer.parseInt(quantitySmsBomber.getText().toString());
                    String bodySms = bodySmsBomber.getText().toString();
                    String victimPn = phoneNumberSmsBomber.getText().toString();

                    for (int j = 0; j < nbSms; j++) {
                        Intent intent=new Intent(getContext(), MainActivity.class);
                        PendingIntent pi=PendingIntent.getActivity(getContext(), 0, intent,0);

                        SmsManager sms= SmsManager.getDefault();
                        sms.sendTextMessage(victimPn, null, bodySms, pi,null);
                    }
                }
                break;
        }
    }
}
