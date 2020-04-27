package com.dev.smsstats;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import androidx.annotation.Nullable;

public class DataBase extends SQLiteOpenHelper {

    private static final String TABLE_SMSTYPE = "SmsType";
    private static final String SMSTYPE_COLUMN_1 = "Title";
    private static final String SMSTYPE_COLUMN_2 = "Body";
    private static final String SMSTYPE_COLUMN_3 = "whenReceive";
    private static final String SMSTYPE_COLUMN_4 = "Enabled";

    public DataBase(@Nullable Context context) {
        super(context, TABLE_SMSTYPE, null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String createTable = "CREATE TABLE "+ TABLE_SMSTYPE + " (ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
                SMSTYPE_COLUMN_1 + " TEXT," +
                SMSTYPE_COLUMN_2 + " TEXT," +
                SMSTYPE_COLUMN_3 + " TEXT," +
                SMSTYPE_COLUMN_4 + " BOOLEAN)";
        db.execSQL(createTable);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_SMSTYPE);
        onCreate(db);
    }

    public boolean addSmsType(SmsType st) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put(SMSTYPE_COLUMN_1, st.getTitle());
        cv.put(SMSTYPE_COLUMN_2, st.getBody());
        cv.put(SMSTYPE_COLUMN_3, st.getWhenReceive());
        cv.put(SMSTYPE_COLUMN_4, st.getActive());

        long result = db.insert(TABLE_SMSTYPE, null, cv);

        if (result == -1) {
            return false;
        } else {
            return true;
        }
    }

    public Cursor getSmsType() {
        try {
            SQLiteDatabase db = this.getWritableDatabase();
            String query  = "SELECT * FROM " + TABLE_SMSTYPE;
            Cursor data = db.rawQuery(query, null);
            return data;
        } catch (SQLException e) {
            return null;
        }
    }

    public void deleteSmsType(int id) {
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM " + TABLE_SMSTYPE + " WHERE ID = '"+ id + "'");
    }

    public void updateSmsType(SmsType st) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put(SMSTYPE_COLUMN_1, st.getTitle());
        cv.put(SMSTYPE_COLUMN_2, st.getBody());
        cv.put(SMSTYPE_COLUMN_3, st.getWhenReceive());
        cv.put(SMSTYPE_COLUMN_4, st.getActive());

        System.out.println(st.getTitle()+st.getBody()+st.getWhenReceive()+st.getActive()+"========"+st.getId());

        db.update(TABLE_SMSTYPE, cv, "ID="+st.getId(), null);
    }

}
