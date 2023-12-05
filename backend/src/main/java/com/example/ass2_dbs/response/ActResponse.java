package com.example.ass2_dbs.response;

public class ActResponse {
    private boolean isSocialDay;   
    private boolean isDuplicated;
    public ActResponse() {
        this.isDuplicated = true;
        this.isSocialDay = true;
    }
    public boolean isSocialDay() {
        return isSocialDay;
    }
    public void setSocialDay(boolean isSocialDay) {
        this.isSocialDay = isSocialDay;
    }
    public boolean isDuplicated() {
        return isDuplicated;
    }
    public void setDuplicated(boolean isMaxStudent) {
        this.isDuplicated = isMaxStudent;
    }

    
    
}
