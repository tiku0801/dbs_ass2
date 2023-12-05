package com.example.ass2_dbs.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer numOfDay;

    private String actName;

    @Temporal(TemporalType.DATE)
    private LocalDate startDate;

    // private Integer maxStudents;

    @OneToMany(mappedBy = "activity")
    @JsonIgnore
    private List<StudentInAct> studentInActs;

    public Activity() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNumOfDay() {
        return numOfDay;
    }

    public void setNumOfDay(Integer numOfDay) {
        this.numOfDay = numOfDay;
    }

    public String getActName() {
        return actName;
    }

    public void setActName(String actName) {
        this.actName = actName;
    }

    public List<StudentInAct> getStudentInActs() {
        return studentInActs;
    }

    public void setStudentInActs(List<StudentInAct> studentInActs) {
        this.studentInActs = studentInActs;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    // public Integer getMaxStudents() {
    //     return maxStudents;
    // }

    // public void setMaxStudents(Integer maxStudents) {
    //     this.maxStudents = maxStudents;
    // }

    
    
}
