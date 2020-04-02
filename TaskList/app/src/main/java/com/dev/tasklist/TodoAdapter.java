package com.dev.tasklist;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class TodoAdapter extends RecyclerView.Adapter<TodoAdapter.MyViewHolder> {

    ArrayList<Todo> listItems;

    public TodoAdapter (ArrayList<Todo> listItems){
        this.listItems = listItems;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_todo_list, null);

        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, final int position) {
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        holder.name.setText(listItems.get(position).getName());
        holder.description.setText(listItems.get(position).getDescription());
        holder.startingDate.setText("Fait le "+dateFormat.format(listItems.get(position).getStartingDate()));
        holder.endingDate.setText("Pour le "+dateFormat.format(listItems.get(position).getEndDate()));

        /*holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println(listItems.get(position));
            }
        });*/

    }

    @Override
    public int getItemCount() {
        return listItems.size();
    }

    public class MyViewHolder extends RecyclerView.ViewHolder{

        TextView name;
        TextView description;
        TextView startingDate;
        TextView endingDate;

        public MyViewHolder(View itemView){
            super(itemView);
            name = (TextView) itemView.findViewById(R.id.name);
            description = (TextView) itemView.findViewById(R.id.description);
            startingDate = (TextView) itemView.findViewById(R.id.startingDate);
            endingDate = (TextView) itemView.findViewById(R.id.endingDate);
        }

    }
}
