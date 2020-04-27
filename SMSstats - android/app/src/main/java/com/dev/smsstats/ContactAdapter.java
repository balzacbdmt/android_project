package com.dev.smsstats;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;

public class ContactAdapter extends RecyclerView.Adapter<ContactAdapter.MyViewHolder> {

    ArrayList<Contact> listContact;
    LayoutInflater vg;

    public ContactAdapter(ArrayList<Contact> listContact){
        this.listContact = listContact;
    }

    @Override
    public ContactAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_contact_list, null);
        vg = LayoutInflater.from(parent.getContext());

        return new ContactAdapter.MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(ContactAdapter.MyViewHolder holder, final int position) {

        holder.name.setText(listContact.get(position).getName());
        holder.phoneNumber.setText(listContact.get(position).getNumberPhone());
        if (listContact.get(position).getNumberCalls() > 0) {
            holder.numberCalls.setText(listContact.get(position).getNumberCalls()+" calls");
        } else {
            holder.numberCalls.setText("No calls");
        }
        if (listContact.get(position).getNumberSms() > 0) {
            holder.numberSms.setText(listContact.get(position).getNumberSms()+" SMS");
        } else {
            holder.numberSms.setText("No SMS");
        }

        holder.v.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View v) {
                //TODO alert dialog ou activity to display detail of contact ? or not ?
            }
        });

    }

    @Override
    public int getItemCount() {
        return listContact.size();
    }

    public class MyViewHolder extends RecyclerView.ViewHolder{
        TextView name;
        TextView phoneNumber;
        TextView numberCalls;
        TextView numberSms;
        View v;

        public MyViewHolder(View itemView){
            super(itemView);
            name = (TextView) itemView.findViewById(R.id.row_contact_name);
            phoneNumber = (TextView) itemView.findViewById(R.id.row_contact_numberPhone);
            numberCalls = (TextView) itemView.findViewById(R.id.row_contact_CallsCount);
            numberSms = (TextView) itemView.findViewById(R.id.row_contact_smsCount);
            v = itemView;
        }

    }
}