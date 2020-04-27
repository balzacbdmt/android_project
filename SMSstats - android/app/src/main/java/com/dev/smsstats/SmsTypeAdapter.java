package com.dev.smsstats;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Switch;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.dev.smsstats.ui.main.SmsCheckFragment;

import java.util.ArrayList;

public class SmsTypeAdapter extends RecyclerView.Adapter<SmsTypeAdapter.MyViewHolder> {

    public static DataBase db = null;
    ArrayList<SmsType> listSmsType;
    LayoutInflater vg;

    public SmsTypeAdapter(ArrayList<SmsType> listSmsType){
        this.listSmsType = listSmsType;
    }

    @Override
    public SmsTypeAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_smstype_list, null);
        vg = LayoutInflater.from(parent.getContext());

        return new SmsTypeAdapter.MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(SmsTypeAdapter.MyViewHolder holder, final int position) {

        holder.title.setText(listSmsType.get(position).getTitle());
        holder.body.setText(listSmsType.get(position).getBody());

        holder.delete_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                db = new DataBase(v.getContext());
                db.deleteSmsType(listSmsType.get(position).getId());
            }
        });

        holder.v.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder(v.getContext(), R.style.DialogCustomTheme);
                View dialogViewEditCat = vg.inflate(R.layout.dialog_smstype, null);

                final TextView titleDialog = dialogViewEditCat.findViewById(R.id.dialog_smstype_title);
                final TextView titleNewSmstype = dialogViewEditCat.findViewById(R.id.dialog_smstype_title_sms_et);
                final EditText bodyNewSmstype = dialogViewEditCat.findViewById(R.id.dialog_smstype_body_sms_et);
                final EditText wrNewSmstype = dialogViewEditCat.findViewById(R.id.dialog_smstype_wr_sms_et);
                final Switch activeNewSmstype = dialogViewEditCat.findViewById(R.id.dialog_smstype_active_sms_switch);

                titleDialog.setText(R.string.edit_smstype);
                titleNewSmstype.setText(listSmsType.get(position).getTitle());
                bodyNewSmstype.setText(listSmsType.get(position).getBody());
                wrNewSmstype.setText(listSmsType.get(position).getWhenReceive());
                activeNewSmstype.setChecked(listSmsType.get(position).getActive());

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
                            st.setId(listSmsType.get(position).getId());

                            db = new DataBase(v.getContext());
                            db.updateSmsType(st);
                        }
                    }
                });
                builder.setNegativeButton(R.string.cancel, null);
                builder.show();

                System.out.println("========== " + listSmsType.get(position).getId());

            }
        });

    }

    @Override
    public int getItemCount() {
        return listSmsType.size();
    }

    public class MyViewHolder extends RecyclerView.ViewHolder {
        TextView title;
        TextView body;
        View v;
        ImageView delete_btn;

        public MyViewHolder(View itemView){
            super(itemView);
            title = (TextView) itemView.findViewById(R.id.row_smstype_title);
            body = (TextView) itemView.findViewById(R.id.row_smstype_body);
            delete_btn = (ImageView) itemView.findViewById(R.id.row_smstype_delete_btn);
            v =  itemView;
        }

    }
}