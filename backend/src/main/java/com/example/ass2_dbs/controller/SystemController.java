package com.example.ass2_dbs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ass2_dbs.entity.Activity;
import com.example.ass2_dbs.entity.Student;
import com.example.ass2_dbs.entity.StudentInAct;
import com.example.ass2_dbs.entity.StudentInRoom;
import com.example.ass2_dbs.response.ActResponse;
import com.example.ass2_dbs.response.RoomResponse;
import com.example.ass2_dbs.service.SystemService;

@RestController
@CrossOrigin
public class SystemController {
    @Autowired
    SystemService systemService;

    @GetMapping("/list")
    public List<StudentInRoom> studentInfo(){
        return systemService.listOfStd();
    }

    @PostMapping("/list")
    public RoomResponse addStudent(@RequestBody Student student, @RequestParam String roomName){
        return systemService.addStudent(student, roomName);
    }

    @DeleteMapping("/list")
    public void deleteStudent(@RequestParam Integer stdId, @RequestParam String roomName){
        systemService.deleteStudent(stdId, roomName);
    }

    @PutMapping("/list")
    public RoomResponse updateStudent(@RequestBody Student student, @RequestParam String roomName){
        return systemService.updateStudent(student, roomName);
    }

    @GetMapping("/act")
    public List<StudentInAct> listOfActs(){
        return systemService.listOfAct();
    }

    @PostMapping("/act")
    public Activity addAct(@RequestBody Activity activity){
        return systemService.addAct(activity);
    }

    @DeleteMapping("/act")
    public void deleteAct(@RequestParam Integer actId){
        systemService.deleteAct(actId);
    }

    @PatchMapping("/act")
    public ActResponse assignAct(@RequestParam Integer stdId, @RequestParam Integer actId){
        return systemService.assignAct(stdId, actId);
    }

}
