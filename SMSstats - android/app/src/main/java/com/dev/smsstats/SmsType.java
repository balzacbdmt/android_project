package com.dev.smsstats;

public class SmsType {
    int id = 0;
    String title;
    String body;
    String whenReceive;
    Boolean active;

    public SmsType(String title, String body, String whenReceive, Boolean active) {
        this.title = title;
        this.body = body;
        this.whenReceive = whenReceive;
        this.active = active;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getWhenReceive() {
        return whenReceive;
    }

    public void setWhenReceive(String whenReceive) {
        this.whenReceive = whenReceive;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
