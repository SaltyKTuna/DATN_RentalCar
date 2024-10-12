package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Damage;

@Repository
public interface DamageRepo extends JpaRepository<Damage, Long>{

}
