package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Rental;

@Repository
public interface RentalRepo extends JpaRepository<Rental, Long>{

}
