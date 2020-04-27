package com.dev.smsstats.ui.main;

import android.Manifest;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.CallLog;
import android.provider.ContactsContract;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.dev.smsstats.Contact;
import com.dev.smsstats.ContactAdapter;
import com.dev.smsstats.MainActivity;
import com.dev.smsstats.R;

import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

public class ContactStatsFragment extends Fragment {
    private RecyclerView recyclerView;
    private static RecyclerView.Adapter rvAdapter;
    private RecyclerView.LayoutManager rvLayoutManager;
    private static ArrayList<Contact> listContact;

    public static ContactStatsFragment newInstance() {
        ContactStatsFragment fragment = new ContactStatsFragment();
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
        View layout = inflater.inflate(R.layout.fragment_contact, container, false);

        listContact = new ArrayList<>();

        recyclerView = layout.findViewById(R.id.listcontact_rc);
        rvLayoutManager = new LinearLayoutManager(getActivity());
        recyclerView.setLayoutManager(rvLayoutManager);

        fillContactList();

        return layout;
    }

    private void fillContactList() {
        int result = ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_CONTACTS);
        if (result == PackageManager.PERMISSION_GRANTED) {
            Cursor contacts = getActivity().getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);

            while (contacts.moveToNext()) {
                String name = contacts.getString(contacts.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
                String numberPhone = contacts.getString(contacts.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                numberPhone = numberPhone.replaceAll("[()\\s-]+", "");

                Contact contact = new Contact(numberPhone, name);
                contact.setNumberSms(countSms(contact.getNumberPhone()));
                contact.setNumberCalls(countNumberCalls(contact.getNumberPhone()));

                listContact.add(contact);
                rvAdapter = new ContactAdapter(listContact);
                recyclerView.setAdapter(rvAdapter);
            }

            contacts.close();
        } else {
            Toast.makeText(getActivity(), getResources().getString(R.string.permission_denied),
                    Toast.LENGTH_LONG).show();
        }
    }

    private int countSms(String numberPhone) {
        int nbSms = 0;
        int result = ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_SMS);
        if (result == PackageManager.PERMISSION_GRANTED) {
            Cursor cursor = getActivity().getContentResolver().query(Uri.parse("content://sms/inbox"), null, null, null, null);

            if (cursor.moveToFirst()) {
                do {
                    String numberPhoneSms = cursor.getString(cursor.getColumnIndexOrThrow("address"));
                    if(numberPhone.equals(numberPhoneSms)) {
                        nbSms++;
                    }
                } while (cursor.moveToNext());
            }
        } else {
            Toast.makeText(getActivity(), getResources().getString(R.string.permission_denied),
                    Toast.LENGTH_LONG).show();
        }
        return nbSms;
    }

    private int countNumberCalls(String numberPhone) {
        int nbCalls = 0;
        int result = ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_CALL_LOG);
        if (result == PackageManager.PERMISSION_GRANTED) {
            StringBuffer sb = new StringBuffer();
            Cursor managedCursor = getActivity().managedQuery(CallLog.Calls.CONTENT_URI, null,
                    null, null, null);
            int number = managedCursor.getColumnIndex(CallLog.Calls.NUMBER);
            while (managedCursor.moveToNext()) {
                String numberPhoneCall = managedCursor.getString(number);
                if(numberPhone.equals(numberPhoneCall)) {
                    nbCalls++;
                }
            }
            managedCursor.close();
        } else {
            Toast.makeText(getActivity(), getResources().getString(R.string.permission_denied),
                    Toast.LENGTH_LONG).show();
        }
        return nbCalls;
    }
}
