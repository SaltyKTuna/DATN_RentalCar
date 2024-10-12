package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.DrivingLicense;

@Repository
public interface DrivingLiscenseRepo extends JpaRepository<DrivingLicense, Long>{
	
}
