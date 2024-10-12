package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Motorbike;

@Repository
public interface MotorbikeRepo extends JpaRepository<Motorbike, Long>{

}
