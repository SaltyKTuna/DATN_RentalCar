package com.rentalcar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Payment;
import com.rentalcar.entity.RentalVehicle;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long>{
	List<Payment> findByRental_RentalId(Long rentalId);
}
