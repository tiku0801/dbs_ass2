package com.example.ass2_dbs.response;

import com.example.ass2_dbs.entity.StudentInRoom;

public class RoomResponse {
    private StudentInRoom student;
    
    private boolean isMsvv;

    private boolean isMaxStudent;

    public RoomResponse() {
        this.isMsvv = true;
        this.isMaxStudent = true;
        this.student = null;
    }

    public boolean isMsvv() {
        return isMsvv;
    }

    public void setMsvv(boolean isMsvv) {
        this.isMsvv = isMsvv;
    }

    public boolean isMaxStudent() {
        return isMaxStudent;
    }

    public void setMaxStudent(boolean isMaxStudent) {
        this.isMaxStudent = isMaxStudent;
    }

    public StudentInRoom getStudent() {
        return student;
    }

    public void setStudent(StudentInRoom student) {
        this.student = student;
    }

    
}
