package RentalCar.com.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import RentalCar.com.dao.DamageRepo;
import RentalCar.com.entity.Damage;
import RentalCar.com.service.DamageService;

@Service
public class DamageServiceImpl implements DamageService{
	@Autowired DamageRepo damageRepo;

	public <S extends Damage> S save(S entity) {
		return damageRepo.save(entity);
	}

	public List<Damage> findAll() {
		return damageRepo.findAll();
	}

	public Optional<Damage> findById(Long id) {
		return damageRepo.findById(id);
	}

	public boolean existsById(Long id) {
		return damageRepo.existsById(id);
	}

	public <S extends Damage> boolean exists(Example<S> example) {
		return damageRepo.exists(example);
	}

	public long count() {
		return damageRepo.count();
	}

	public void deleteById(Long id) {
		damageRepo.deleteById(id);
	}

	public Damage getById(Long id) {
		return damageRepo.getById(id);
	}
	
	
}
