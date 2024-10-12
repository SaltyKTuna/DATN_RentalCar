package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.RentalVehicle;

@Repository
public interface RentalVehicleRepo extends JpaRepository<RentalVehicle, Long>{

}
