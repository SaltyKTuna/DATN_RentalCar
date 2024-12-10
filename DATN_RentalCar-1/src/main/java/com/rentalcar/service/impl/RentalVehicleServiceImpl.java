package com.rentalcar.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.rentalcar.dao.RentalVehicleRepo;
import com.rentalcar.entity.RentalVehicle;
import com.rentalcar.service.RentalVehicleService;

@Service
public class RentalVehicleServiceImpl implements RentalVehicleService{
	@Autowired RentalVehicleRepo rentalvehicleRepo;

	public <S extends RentalVehicle> S save(S entity) {
		return rentalvehicleRepo.save(entity);
	}

	public List<RentalVehicle> findAll() {
		return rentalvehicleRepo.findAll();
	}

	public Optional<RentalVehicle> findById(Long id) {
		return rentalvehicleRepo.findById(id);
	}

	public boolean existsById(Long id) {
		return rentalvehicleRepo.existsById(id);
	}

	public <S extends RentalVehicle> boolean exists(Example<S> example) {
		return rentalvehicleRepo.exists(example);
	}

	public long count() {
		return rentalvehicleRepo.count();
	}

	public void deleteById(Long id) {
		rentalvehicleRepo.deleteById(id);
	}

	public RentalVehicle getById(Long id) {
		return rentalvehicleRepo.getById(id);
	}


	
}
