package com.rentalcar.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rentalcar.dto.RentalDTO;
import com.rentalcar.dto.RentalDTO2;
import com.rentalcar.entity.Rental;

@Repository
public interface RentalRepo extends JpaRepository<Rental, Long>{
	// Truy vấn để lấy danh sách xe ô tô đã thuê và trả về RentalDTO
	@Query("SELECT new com.rentalcar.dto.RentalDTO2(" +
		       "a.accountId, r.rentalDate, r.returnDate, r.renStatus, " +
		       "c.carId, c.model) " +
		       "FROM Account a " +
		       "JOIN Rental r ON a.accountId = r.account.accountId " +
		       "JOIN RentalVehicle rv ON r.rentalId = rv.rental.rentalId " +
		       "JOIN Car c ON rv.rentalVehicleId = c.carId " +
		       "WHERE rv.vehicleType = 'car'")
		List<RentalDTO2> findAllCarRentals();




	// Truy vấn để lấy danh sách xe máy đã thuê và trả về RentalDTO
	@Query("SELECT new com.rentalcar.dto.RentalDTO2(" +
		       "a.accountId, r.rentalDate, r.returnDate, r.renStatus, " +
		       "m.motorbikeId, m.model) " +
		       "FROM Account a " +
		       "JOIN Rental r ON a.accountId = r.account.accountId " +
		       "JOIN RentalVehicle rv ON r.rentalId = rv.rental.rentalId " +
		       "JOIN Motorbike m ON rv.rentalVehicleId = m.motorbikeId " +
		       "WHERE rv.vehicleType = 'motorbike'")
		List<RentalDTO2> findAllMotorbikeRentals();




	Page<Rental> findAll(Specification<Rental> spec, Pageable pageable);


}
