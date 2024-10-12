package com.rentalcar.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.rentalcar.dao.DiscountRepo;
import com.rentalcar.entity.Discount;
import com.rentalcar.service.DiscountService;

@Service
public class DiscountServiceImpl implements DiscountService{
	@Autowired DiscountRepo discRepo;

	public <S extends Discount> S save(S entity) {
		return discRepo.save(entity);
	}

	public List<Discount> findAll() {
		return discRepo.findAll();
	}

	public Optional<Discount> findById(Long id) {
		return discRepo.findById(id);
	}

	public boolean existsById(Long id) {
		return discRepo.existsById(id);
	}

	public <S extends Discount> boolean exists(Example<S> example) {
		return discRepo.exists(example);
	}

	public long count() {
		return discRepo.count();
	}

	public void deleteById(Long id) {
		discRepo.deleteById(id);
	}

	public Discount getById(Long id) {
		return discRepo.getById(id);
	}

	public void delete(Discount entity) {
		discRepo.delete(entity);
	}
	
	
}
