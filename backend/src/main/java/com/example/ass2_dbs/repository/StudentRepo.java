package com.example.ass2_dbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ass2_dbs.entity.Student;

import jakarta.transaction.Transactional;

@Repository
public interface StudentRepo extends JpaRepository<Student,Integer>{
    @Query("select s from Student s where s.id = ?1")
    public Student findStdById(Integer id);   

    @Query("select s from Student s where s.mssv = ?1")
    public Student findStdByMs(String mssv);

    @Query("update Student s set s.firstName = ?1 where s.id = ?2")
    public void updateFName(String firstName, Integer id);

    @Query("update Student s set s.lastName = ?1 where s.id = ?2")
    public void updateLName(String lastName, Integer id);

    @Query("update Student s set s.socialDay = ?1 where s.id = ?2")
    public void updateSocialDay(Integer socialDay, Integer id);

    // @Query("update Student s set s.sex = ? 1 where s.id = ?2")
    // public void updateSex(Character sex, Integer id);

    @Modifying
    @Transactional
    @Query("update Student s set s.firstName = ?1, s.lastName = ?2, s.sex = ?3, s.socialDay = ?4 where s.id = ?5")
    public void  udpateInfo(String firstName, String lastName,Character sex, Integer socialDay,Integer id);
}
