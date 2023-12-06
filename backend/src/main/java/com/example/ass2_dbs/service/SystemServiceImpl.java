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
        if (studentRepo.findStdByMs(student.getMssv()) !=null){
            if (studentInRoomRepo.findStdByMs(student.getMssv()) != null){
            newResponse.setMsvv(false);
            return newResponse;
        }
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
        if (studentRepo.findStdById(student.getId()) == null) studentRepo.save(student);
        newStd.setRoom(newRoom);
        newStd.setStudent(student);
        newStd.setStartDate(LocalDate.now());
        newResponse.setStudent(studentInRoomRepo.save(newStd));
        return newResponse;
    }

    @Override
    public void deleteStudent(Integer stdID, String roomName) {
        Room findRoom = roomRepo.findRoomByName(roomName);
        roomRepo.deleteStudent(findRoom.getCurrStudent() -1, findRoom.getId());
        studentInRoomRepo.deleteStudent(LocalDate.now(), stdID, findRoom.getId());
    }

    private void updateStudentInfo(Student student){
        studentRepo.udpateInfo(student.getFirstName(),student.getLastName(),student.getSex() ,student.getSocialDay(),student.getId());
    }

    @Override
    public RoomResponse updateStudent(Student student, String newRoomName) {
        RoomResponse newResponse = new RoomResponse();
        // if (studentRepo.findStdByMs(student.getMssv()) != null)  {
        //     newResponse.setMsvv(false);
        //     return newResponse;
        // } 
        Room findRoom = roomRepo.findRoomByName(newRoomName);
        StudentInRoom stdCheck = studentInRoomRepo.findStdById(student.getId());
        if (findRoom != null){
            if (findRoom.getId().equals(stdCheck.getRoom().getId())) {
                updateStudentInfo(student);
                newResponse.setStudent(studentInRoomRepo.findStdById(student.getId()));
                return newResponse;
            }
            else {
                if (findRoom.getCurrStudent() == 6){
                    newResponse.setMaxStudent(false);
                    return newResponse;
                }
                else {
                    updateStudentInfo(student);
                    StudentInRoom newStd = new StudentInRoom();
                    newStd.setStartDate(LocalDate.now());
                    newStd.setRoom(findRoom);
                    newStd.setStudent(student);
                    //delete student from old room
                    deleteStudent(student.getId(),stdCheck.getRoom().getRoomName());
                    // studentInRoomRepo.deleteStudent(LocalDate.now(), student.getId(), stdCheck.getRoom().getId());
                    studentInRoomRepo.save(newStd);
                    roomRepo.updateCurrAdd(newRoomName);
                    newResponse.setStudent(studentInRoomRepo.findStdById(student.getId()));
                    return newResponse;
                }
                
            }
        }
        updateStudentInfo(student);
        //studentInRoomRepo.deleteStudent(LocalDate.now(), student.getId(), stdCheck.getRoom().getId());
        deleteStudent(student.getId(),stdCheck.getRoom().getRoomName());
        return addStudent(student, newRoomName);
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
        StudentInAct findAct = studentInActRepo.findActById(actId);
        if (findAct != null) studentInActRepo.delete(findAct);
        else actitvityRepo.delete(actitvityRepo.findActById(actId));
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
            if (studentInActRepo.findActById(actId).getStudent().getId().equals(stdId)){
                newRes.setDuplicated(false);
                return newRes;
            }
            Activity findActivity = actitvityRepo.findActById(actId);
            Student findStudent = studentRepo.findStdById(stdId);
            studentRepo.updateSocialDay(findActivity.getNumOfDay() + findStudent.getSocialDay(), stdId);
            newStd.setStudent(studentRepo.findStdById(stdId));
            newStd.setActivity(actitvityRepo.findActById(actId));
            newStd.setDate(LocalDate.now());
            studentInActRepo.save(newStd);
            return newRes;
        } 
        newRes.setSocialDay(false);
        return newRes;
        
    }

    // @Override
    // public void deleteStdFromAct(Integer stdId, Integer actId) {
        
    // }
    
}
