package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Driver;

@Repository
public interface DriverRepo extends JpaRepository<Driver, Long>{

}
