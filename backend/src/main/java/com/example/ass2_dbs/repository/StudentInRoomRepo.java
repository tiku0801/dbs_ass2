package com.example.ass2_dbs.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ass2_dbs.entity.StudentInRoom;

import jakarta.transaction.Transactional;

@Repository
public interface StudentInRoomRepo extends JpaRepository<StudentInRoom, Integer> {
    @Query("select s from StudentInRoom s where s.student.mssv = ?1 and s.endDate is null")
    public StudentInRoom findStdByMs(String mssv);

    @Query("select s from StudentInRoom s where s.endDate is null")
    public List<StudentInRoom> findAllInfo();

    @Query("select s from StudentInRoom s where s.student.id = ?1 and s.endDate is null")
    public StudentInRoom findStdById(Integer id);

    @Modifying
    @Transactional
    @Query("update StudentInRoom s set s.endDate = ?1 where s.student.id = ?2 and s.room.id = ?3")
    public void deleteStudent(LocalDate endDate, Integer stdId, Integer roomId);

    @Query("select s from StudentInRoom s where s.student.id = ?1 and s.room.id = ?2 and s.endDate is null")
    public StudentInRoom checkStd(Integer id, Integer roomId);
}
