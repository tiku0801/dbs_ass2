package com.example.ass2_dbs.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String  firstName;

    private String lastName;

    private String mssv;

    private Character sex;

    private Integer socialDay;

    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private List<StudentInRoom> studentInRoom;

    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private List<StudentInAct> studentInActs;

    public Student() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMssv() {
        return mssv;
    }

    public void setMssv(String mssv) {
        this.mssv = mssv;
    }

    public Character getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public Integer getSocialDay() {
        return socialDay;
    }

    public void setSocialDay(Integer socialDay) {
        this.socialDay = socialDay;
    }

    public List<StudentInRoom> getStudentInRoom() {
        return studentInRoom;
    }

    public void setStudentInRoom(List<StudentInRoom> studentInRoom) {
        this.studentInRoom = studentInRoom;
    }

    public List<StudentInAct> getStudentInActs() {
        return studentInActs;
    }

    public void setStudentInActs(List<StudentInAct> studentInActs) {
        this.studentInActs = studentInActs;
    }

    
}
