package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import RentalCar.com.entity.Feedback;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long>{
	
}
