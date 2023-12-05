package com.example.ass2_dbs.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ass2_dbs.entity.StudentInRoom;

@Repository
public interface StudentInRoomRepo extends JpaRepository<StudentInRoom, Integer> {
    @Query("select s from StudentInRoom s where s.endDate is null")
    public List<StudentInRoom> findAllInfo();

    @Query("update StudentInRoom s set s.room.currStudent = ?1, s.endDate = ?2 where s.student.id = ?3 and s.room.roomName = ?4")
    public void deleteStudent(Integer newCurr, LocalDate endDate, Integer stdId, String roomName);
}
