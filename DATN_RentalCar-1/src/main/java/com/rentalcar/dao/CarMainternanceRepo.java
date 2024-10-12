package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.CarMaintenance;

@Repository
public interface CarMainternanceRepo extends JpaRepository<CarMaintenance, Long>{
	
}
