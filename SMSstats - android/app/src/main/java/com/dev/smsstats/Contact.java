package com.dev.smsstats;

public class Contact {
    String numberPhone;
    String name;
    int numberCalls = 0;
    int numberSms = 0;

    public Contact(String numberPhone, String name) {
        this.numberPhone = numberPhone;
        this.name = name;
    }

    public String getNumberPhone() {
        return numberPhone;
    }

    public void setNumberPhone(String numberPhone) {
        this.numberPhone = numberPhone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumberCalls() {
        return numberCalls;
    }

    public void setNumberCalls(int numberCalls) {
        this.numberCalls = numberCalls;
    }

    public int getNumberSms() {
        return numberSms;
    }

    public void setNumberSms(int numerbSms) {
        this.numberSms = numerbSms;
    }
}
