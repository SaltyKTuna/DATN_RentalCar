package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.AdditionalFee;

@Repository
public interface AdditionalFeeRepo extends JpaRepository<AdditionalFee, Long>{
	
}
