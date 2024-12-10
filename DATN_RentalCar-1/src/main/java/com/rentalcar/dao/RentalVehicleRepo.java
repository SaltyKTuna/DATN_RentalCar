package com.rentalcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.RentalVehicle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;


@Repository
public interface RentalVehicleRepo extends JpaRepository<RentalVehicle, Long>{
	 @Query("SELECT rv FROM RentalVehicle rv WHERE rv.rental.account.accountId = :accountId")
	    List<RentalVehicle> findByAccountId(@Param("accountId") Long accountId);
}
