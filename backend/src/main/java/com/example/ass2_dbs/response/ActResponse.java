package com.example.ass2_dbs.response;

public class ActResponse {
    private boolean isSocialDay;   
    private boolean isMaxStudent;
    public ActResponse() {
        this.isMaxStudent = true;
        this.isSocialDay = true;
    }
    public boolean isSocialDay() {
        return isSocialDay;
    }
    public void setSocialDay(boolean isSocialDay) {
        this.isSocialDay = isSocialDay;
    }
    public boolean isMaxStudent() {
        return isMaxStudent;
    }
    public void setMaxStudent(boolean isMaxStudent) {
        this.isMaxStudent = isMaxStudent;
    }

    
    
}
