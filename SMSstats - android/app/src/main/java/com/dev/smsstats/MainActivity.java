package com.dev.smsstats;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;

import com.dev.smsstats.ui.main.SmsCheckFragment;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.tabs.TabLayout;

import androidx.core.app.ActivityCompat;
import androidx.fragment.app.FragmentManager;
import androidx.viewpager.widget.ViewPager;
import androidx.appcompat.app.AppCompatActivity;

import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import com.dev.smsstats.ui.main.SectionsPagerAdapter;

public class MainActivity extends AppCompatActivity {
    ViewPager viewPager;
    TabLayout tabs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        SectionsPagerAdapter sectionsPagerAdapter = new SectionsPagerAdapter(this, getSupportFragmentManager());
        viewPager = findViewById(R.id.view_pager);
        viewPager.setAdapter(sectionsPagerAdapter);
        tabs = findViewById(R.id.tabs);
        tabs.setupWithViewPager(viewPager);

        ActivityCompat.requestPermissions(MainActivity.this,
                new String[]{
                        Manifest.permission.READ_CONTACTS,
                        Manifest.permission.RECEIVE_SMS,
                        Manifest.permission.SEND_SMS,
                        Manifest.permission.READ_CALL_LOG,
                        Manifest.permission.READ_SMS},
                1);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        if (hasFocus) {
            SectionsPagerAdapter sectionsPagerAdapter = new SectionsPagerAdapter(this, getSupportFragmentManager());
            viewPager = findViewById(R.id.view_pager);
            viewPager.setAdapter(sectionsPagerAdapter);
            tabs = findViewById(R.id.tabs);
            tabs.setupWithViewPager(viewPager);
        }

        //It's really moche but it's work

        super.onWindowFocusChanged(hasFocus);
    }
}