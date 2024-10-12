package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long>{

}
