package com.dev.tasklist.ui.main;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.dev.tasklist.R;
import com.dev.tasklist.Todo;
import com.dev.tasklist.TodoAdapter;

import java.util.ArrayList;

public class CalendarFragment extends Fragment {
    private RecyclerView recyclerView;
    private static RecyclerView.Adapter rvAdapter;
    private RecyclerView.LayoutManager rvLayoutManager;
    private static ArrayList<Todo> listTodo = new ArrayList<>();

    public static CalendarFragment newInstance() {
        CalendarFragment fragment = new CalendarFragment();
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
        View listLayout = inflater.inflate(R.layout.fragment_calendar, container, false);
        return listLayout;
    }
}