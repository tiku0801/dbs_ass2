package com.example.ass2_dbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ass2_dbs.entity.StudentInAct;
@Repository
public interface StudentInActRepo  extends JpaRepository<StudentInAct,Integer>{
    @Query("select s from StudentInAct s where s.activity.id = ?1")
    public StudentInAct findActById(Integer id);

    @Query("select CheckSocialDay(?1)")
    public Boolean checkDay(Integer id);
}
