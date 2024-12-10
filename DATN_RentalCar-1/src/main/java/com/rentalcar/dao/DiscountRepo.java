package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Discount;

@Repository
public interface DiscountRepo extends JpaRepository<Discount, Long>{
		
}
