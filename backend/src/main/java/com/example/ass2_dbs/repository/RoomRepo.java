package com.example.ass2_dbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ass2_dbs.entity.Room;
@Repository
public interface RoomRepo  extends JpaRepository<Room,Integer>{
    @Query("select r from Room r where r.roomName = ?1")
    public Room findRoomByName(String name);   

    @Query("update Room r set r.currStudent = r.currStudent + 1 where r.roomName = ?1")
    public void updateCurrAdd(String roomName);
}
