package com.rentalcar.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.rentalcar.dao.FeedbackRepo;
import com.rentalcar.dto.FeedbackInfo;
import com.rentalcar.entity.Feedback;
import com.rentalcar.service.FeedbackService;

@Service
public class FeedbackServiceImpl implements FeedbackService{
	@Autowired FeedbackRepo fbRepo;
	
	@Override
	public List<FeedbackInfo> getCompletedRentalsWithFeedbackMotorbike(Long motorbikeId) {
	    return fbRepo.getCompletedRentalsWithFeedbackMotorbike(motorbikeId);  // Truyền motorbikeId vào
	}

	@Override
	public List<FeedbackInfo> getCompletedRentalsWithFeedbackCar(Long carId) {
	    return fbRepo.getCompletedRentalsWithFeedbackCar(carId);  // Truyền carId vào repository method
	}


	public <S extends Feedback> S save(S entity) {
		return fbRepo.save(entity);
	}

	public List<Feedback> findAll() {
		return fbRepo.findAll();
	}

	public Optional<Feedback> findById(Long id) {
		return fbRepo.findById(id);
	}

	public boolean existsById(Long id) {
		return fbRepo.existsById(id);
	}

	public <S extends Feedback> boolean exists(Example<S> example) {
		return fbRepo.exists(example);
	}

	public long count() {
		return fbRepo.count();
	}

	public void deleteById(Long id) {
		fbRepo.deleteById(id);
	}

	public Feedback getById(Long id) {
		return fbRepo.getById(id);
	}
	
	
}
