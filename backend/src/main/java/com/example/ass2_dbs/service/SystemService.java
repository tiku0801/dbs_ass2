package com.example.ass2_dbs.service;

import java.util.List;

import com.example.ass2_dbs.entity.Activity;
import com.example.ass2_dbs.entity.Student;
import com.example.ass2_dbs.entity.StudentInAct;
import com.example.ass2_dbs.entity.StudentInRoom;
import com.example.ass2_dbs.response.ActResponse;
import com.example.ass2_dbs.response.RoomResponse;

public interface SystemService {
    public List<StudentInRoom> listOfStd();

    public RoomResponse addStudent(Student student, String roomName);

    public void deleteStudent(Integer stdID, String roomName);

    public RoomResponse updateStudent(Student student, String roomName);

    public List<StudentInAct> listOfAct();

    public Activity addAct(Activity activity);

    public void deleteAct(Integer actId);

  //  public void updateAct(Activity newAct);

    public ActResponse assignAct(Integer stdId, Integer actId);

//    public void deleteStdFromAct(Integer stdId, Integer actId);
}
