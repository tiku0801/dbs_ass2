package com.example.ass2_dbs.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ass2_dbs.entity.Activity;
import com.example.ass2_dbs.entity.Room;
import com.example.ass2_dbs.entity.Student;
import com.example.ass2_dbs.entity.StudentInAct;
import com.example.ass2_dbs.entity.StudentInRoom;
import com.example.ass2_dbs.repository.ActitvityRepo;
import com.example.ass2_dbs.repository.RoomRepo;
import com.example.ass2_dbs.repository.StudentInActRepo;
import com.example.ass2_dbs.repository.StudentInRoomRepo;
import com.example.ass2_dbs.repository.StudentRepo;
import com.example.ass2_dbs.response.ActResponse;
import com.example.ass2_dbs.response.RoomResponse;

@Service
public class SystemServiceImpl implements SystemService {
    @Autowired
    RoomRepo roomRepo;

    @Autowired
    StudentRepo studentRepo;
    
    @Autowired
    ActitvityRepo actitvityRepo;

    @Autowired
    StudentInRoomRepo studentInRoomRepo;

    @Autowired
    StudentInActRepo studentInActRepo;

    @Override
    public List<StudentInRoom> listOfStd() {
        return studentInRoomRepo.findAllInfo();
    }

    @Override
    public RoomResponse addStudent(Student student, String roomName) {
        RoomResponse newResponse = new RoomResponse();
        StudentInRoom newStd = new StudentInRoom();
        if (studentRepo.findStdByMs(student.getMssv()) != null){
            newResponse.setMsvv(false);
            return newResponse;
        }
        Room findRoom = roomRepo.findRoomByName(roomName);
        if (findRoom != null){
            if (findRoom.getCurrStudent() < 6){
                studentRepo.save(student);
                newStd.setStudent(student);
                newStd.setRoom(findRoom);
                newStd.setStartDate(LocalDate.now());
                newResponse.setStudent(studentInRoomRepo.save(newStd)); 
                roomRepo.updateCurrAdd(roomName);
                return newResponse;
            }
            newResponse.setMaxStudent(false);
            return newResponse;
        }
        Room newRoom = new Room(roomName);
        roomRepo.save(newRoom);
        studentRepo.save(student);
        newStd.setRoom(newRoom);
        newStd.setStudent(student);
        newStd.setStartDate(LocalDate.now());
        newResponse.setStudent(studentInRoomRepo.save(newStd));
        return newResponse;
    }

    @Override
    public void deleteStudent(Integer stdID, String roomName) {
        roomRepo.deleteStudent(roomRepo.findRoomByName(roomName).getCurrStudent() -1, roomName);
        studentInRoomRepo.deleteStudent(LocalDate.now(),stdID, roomName);
    }

    @Override
    public RoomResponse updateStudent(Student student, String newRoomName) {
        RoomResponse newResponse = new RoomResponse();
        // if (studentRepo.findStdByMs(student.getMssv()) != null)  {
        //     newResponse.setMsvv(false);
        //     return newResponse;
        // } 
        studentRepo.udpateInfo( student.getFirstName(),
                                student.getLastName(),
                                student.getSex(), 
                                student.getSocialDay(),
                                student.getId());
        if (newRoomName == null) {
            return newResponse;
        }
        else {
            if (roomRepo.findRoomByName(newRoomName).getCurrStudent() == 6){
                newResponse.setMaxStudent(false);
                return newResponse;
            }
            StudentInRoom newStd = new StudentInRoom();
            newStd.setStartDate(LocalDate.now());
            newStd.setRoom(roomRepo.findRoomByName(newRoomName));
            newStd.setStudent(student);
            studentInRoomRepo.save(newStd);
        }
        return newResponse;
    }

    @Override
    public List<StudentInAct> listOfAct() {
        return studentInActRepo.findAll();
    }

    @Override
    public Activity addAct(Activity activity) {
        return actitvityRepo.save(activity);
    }

    @Override
    public void deleteAct(Integer actId) {
        actitvityRepo.delete(actitvityRepo.findActById(actId));
    }

    // @Override
    // public void updateAct(Activity newAct) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'updateAct'");
    // }

    @Override
    public ActResponse assignAct(Integer stdId, Integer actId) {
        // TODO Auto-generated method stub
        ActResponse newRes = new ActResponse();
        StudentInAct newStd = new StudentInAct(); 
        if (studentInActRepo.checkDay(stdId)){
            studentRepo.updatSocialDay(actitvityRepo.findActById(actId).getNumOfDay() + studentRepo.findStdById(stdId).getSocialDay(), stdId);
            newStd.setStudent(studentRepo.findStdById(stdId));
            newStd.setActivity(actitvityRepo.findActById(actId));
            studentInActRepo.save(newStd);
        } 
        newRes.setSocialDay(false);
        return newRes;
        
    }

    // @Override
    // public void deleteStdFromAct(Integer stdId, Integer actId) {
        
    // }
    
}
