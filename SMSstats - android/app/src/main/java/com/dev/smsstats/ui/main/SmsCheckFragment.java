package com.dev.smsstats.ui.main;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.database.Cursor;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Switch;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.dev.smsstats.DataBase;
import com.dev.smsstats.R;
import com.dev.smsstats.SmsType;
import com.dev.smsstats.SmsTypeAdapter;

import java.util.ArrayList;

import static android.content.ContentValues.TAG;

public class SmsCheckFragment extends Fragment implements View.OnClickListener {
    public static DataBase db = null;
    private RecyclerView recyclerView;
    private static RecyclerView.Adapter rvAdapter;
    private RecyclerView.LayoutManager rvLayoutManager;
    private static ArrayList<SmsType> listSmsType;

    private ImageView btnAddSmstype;

    public static SmsCheckFragment newInstance() {
        SmsCheckFragment fragment = new SmsCheckFragment();
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
        View layout = inflater.inflate(R.layout.fragment_sms_check, container, false);

        btnAddSmstype = layout.findViewById(R.id.btn_add_smstype);
        btnAddSmstype.setOnClickListener(this);

        db = new DataBase(getContext());

        recyclerView = layout.findViewById(R.id.listsmstype_rc);
        rvLayoutManager = new LinearLayoutManager(getActivity());
        recyclerView.setLayoutManager(rvLayoutManager);

        fillListSmsType();

        return layout;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_add_smstype:
                AlertDialog.Builder builder = new AlertDialog.Builder(getContext(), R.style.DialogCustomTheme);
                LayoutInflater inflater = requireActivity().getLayoutInflater();
                View dialogViewEditCat = inflater.inflate(R.layout.dialog_smstype, null);

                final TextView titleNewSmstype = dialogViewEditCat.findViewById(R.id.dialog_smstype_title_sms_et);
                final EditText bodyNewSmstype = dialogViewEditCat.findViewById(R.id.dialog_smstype_body_sms_et);
                final EditText wrNewSmstype = dialogViewEditCat.findViewById(R.id.dialog_smstype_wr_sms_et);
                final Switch activeNewSmstype = dialogViewEditCat.findViewById(R.id.dialog_smstype_active_sms_switch);

                builder.setView(dialogViewEditCat);
                builder.setPositiveButton(R.string.save, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int id) {
                        if (titleNewSmstype.getText().toString().trim().length() != 0 && bodyNewSmstype.getText().toString().trim().length() != 0 && wrNewSmstype.getText().toString().trim().length() != 0) {
                            String title = titleNewSmstype.getText().toString();
                            String body = bodyNewSmstype.getText().toString();
                            String wr = wrNewSmstype.getText().toString();
                            Boolean active = activeNewSmstype.isChecked();

                            SmsType st = new SmsType(title, body, wr, active);
                            addSmsType(st);

                            fillListSmsType();
                        }
                    }
                });
                builder.setNegativeButton(R.string.cancel, null);
                builder.show();
                break;
        }
    }

    private void addSmsType(SmsType st) {
        boolean insertData = db.addSmsType(st);
        if (insertData == true ) {
            Log.d(TAG, "Sms has been added !");
        } else {
            Log.d(TAG, "Sms has not added !");
        }
    }

    public void fillListSmsType() {
        listSmsType = new ArrayList<>();
        Cursor data = db.getSmsType();
        if (data != null) {
            while(data.moveToNext()) {
                String title = data.getString(1);
                String body = data.getString(2);
                String wr = data.getString(3);
                Boolean active = (data.getInt(4) == 1);

                SmsType st = new SmsType(title, body, wr, active);
                st.setId(Integer.parseInt(data.getString(0)));
                listSmsType.add(st);
                rvAdapter = new SmsTypeAdapter(listSmsType);
                recyclerView.setAdapter(rvAdapter);
            }
        }
        //TODO if empty warn user
    }
}
