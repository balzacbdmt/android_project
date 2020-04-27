package com.dev.tasklist.ui.main;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.dev.tasklist.MainActivity;
import com.dev.tasklist.R;
import com.dev.tasklist.Todo;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class TaskAddFragment extends Fragment {

    public static TaskAddFragment newInstance() {
        TaskAddFragment fragment = new TaskAddFragment();
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
        View addLayout = inflater.inflate(R.layout.fragment_add, container, false);

        final EditText etName = (EditText) addLayout.findViewById(R.id.form_name);
        final EditText etDescription = (EditText) addLayout.findViewById(R.id.form_description);
        final DatePicker etEndDate = (DatePicker) addLayout.findViewById(R.id.form_date);

        Button button = (Button) addLayout.findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {

                String name = etName.getText().toString();
                String description = etDescription.getText().toString();
                Date startDate = new Date();
                Date endDate = getDateFromDatePicker(etEndDate);

                Log.d("dateDL", endDate.toString());

                Todo todoToAdd = new Todo(name, description, startDate, endDate);
                TaskListFragment.addTodo(todoToAdd);

                etName.setText("Nome de la tache");
                etDescription.setText("Description");
            }
        });

        return addLayout;
    }

    public static java.util.Date getDateFromDatePicker(DatePicker datePicker){
        int day = datePicker.getDayOfMonth();
        int month = datePicker.getMonth();
        int year =  datePicker.getYear();

        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month, day);

        return calendar.getTime();
    }
}