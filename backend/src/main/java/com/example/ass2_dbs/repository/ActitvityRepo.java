package com.example.ass2_dbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ass2_dbs.entity.Activity;

@Repository
public interface ActitvityRepo extends JpaRepository<Activity,Integer>{
    @Query("select a from Activity a where a.id = id")
    public Activity findActById(Integer id);
}
