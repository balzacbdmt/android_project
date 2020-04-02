package com.dev.tasklist;

import java.util.Date;

public class Todo {

    private String name = null;
    private String description = null;
    private Date startingDate = null;
    private Date endDate = null;

    public Todo(String name, String description, Date startingDate, Date endDate) {
        super();
        this.name = name;
        this.description = description;
        this.startingDate = startingDate;
        this.endDate = endDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(Date startingDate) {
        this.startingDate = startingDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
