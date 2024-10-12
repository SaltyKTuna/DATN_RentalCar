package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Account;

@Repository
public interface AccountRepo extends JpaRepository<Account, Long>{
	Account findByEmail(String email);
}
