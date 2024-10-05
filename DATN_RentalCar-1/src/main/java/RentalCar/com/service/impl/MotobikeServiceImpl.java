package RentalCar.com.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import RentalCar.com.dao.MotobikeRepo;
import RentalCar.com.entity.Motorbike;
import RentalCar.com.service.MotobikeService;

@Service
public class MotobikeServiceImpl implements MotobikeService{
	@Autowired MotobikeRepo motobikeRepo;

	public <S extends Motorbike> S save(S entity) {
		return motobikeRepo.save(entity);
	}

	public List<Motorbike> findAll() {
		return motobikeRepo.findAll();
	}

	public Optional<Motorbike> findById(Long id) {
		return motobikeRepo.findById(id);
	}

	public boolean existsById(Long id) {
		return motobikeRepo.existsById(id);
	}

	public long count() {
		return motobikeRepo.count();
	}

	public void deleteById(Long id) {
		motobikeRepo.deleteById(id);
	}
	
	
}
