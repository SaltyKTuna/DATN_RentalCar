package com.rentalcar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Motorbike;

@Repository
public interface MotorbikeRepo extends JpaRepository<Motorbike, Long>{
	
	@Query("SELECT DISTINCT m.model FROM Motorbike m")
    List<String> findAllModels();
	
	@Query("SELECT DISTINCT m.make FROM Motorbike m")
    List<String> findAllMakes();

    @Query("SELECT m FROM Motorbike m WHERE m.vehicleLocation = :location")
    List<Motorbike> findAllVehicleLocation(@Param("location") String location);
    
}
