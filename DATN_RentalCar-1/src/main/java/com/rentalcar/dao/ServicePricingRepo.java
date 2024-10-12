package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.ServicePricing;

@Repository
public interface ServicePricingRepo extends JpaRepository<ServicePricing, Long>{

}
