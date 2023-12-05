package com.example.ass2_dbs.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String roomName;

    private Integer maxStudent;

    private Integer currStudent;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    private List<StudentInRoom> studentInRoom;

    public Room() {
    }

    public Room(String roomName) {
        this.maxStudent = 6;
        this.roomName = roomName;
        this.currStudent = 1;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public Integer getMaxStudent() {
        return maxStudent;
    }

    public void setMaxStudent(Integer maxStudent) {
        this.maxStudent = maxStudent;
    }

    public List<StudentInRoom> getStudentInRoom() {
        return studentInRoom;
    }

    public void setStudentInRoom(List<StudentInRoom> studentInRoom) {
        this.studentInRoom = studentInRoom;
    }

    public Integer getCurrStudent() {
        return currStudent;
    }

    public void setCurrStudent(Integer currStudent) {
        this.currStudent = currStudent;
    }

    
}
