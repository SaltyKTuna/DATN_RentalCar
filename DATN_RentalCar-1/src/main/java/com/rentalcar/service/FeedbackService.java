package com.rentalcar.service;

import java.util.List;

import com.rentalcar.dto.FeedbackInfo;

public interface FeedbackService {

	// List<FeedbackInfo> getCompletedRentalsWithFeedbackMotorbike(Long motorbikeId);

	// List<FeedbackInfo> getCompletedRentalsWithFeedbackCar(Long carId);

	List<FeedbackInfo> getCompletedRentalsWithFeedbackCar(Long carId);
    List<FeedbackInfo> getCompletedRentalsWithFeedbackMotorbike(Long motorbikeId);

}
