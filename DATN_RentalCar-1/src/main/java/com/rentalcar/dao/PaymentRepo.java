package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.rentalcar.entity.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long>{
    Optional<Payment> findByTransId(String transId);
}
