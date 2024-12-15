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
	@Autowired
    private FeedbackRepo feedbackRepository;

    @Override
    public List<FeedbackInfo> getCompletedRentalsWithFeedbackMotorbike(Long motorbikeId) {
        // Giả sử bạn có một phương thức trong FeedbackRepo để lấy thông tin này
        return feedbackRepository.findCompletedRentalsWithFeedbackMotorbike(motorbikeId);
    }

    @Override
    public List<FeedbackInfo> getCompletedRentalsWithFeedbackCar(Long carId) {
        // Giả sử bạn có một phương thức trong FeedbackRepo để lấy thông tin này
        return feedbackRepository.findCompletedRentalsWithFeedbackCar(carId);
    }

    @Override
    public List<FeedbackInfo> getFeedbackByCustomer(Long customerId) {
        // Lấy thông tin phản hồi của khách hàng từ repository
        return feedbackRepository.findFeedbackByCustomer(customerId);
    }
	
	
}
