package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import RentalCar.com.entity.AdditionalFee;

@Repository
public interface AdditionalFeeRepo extends JpaRepository<AdditionalFee, Long>{
	
}
