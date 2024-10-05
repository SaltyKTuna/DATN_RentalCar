package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import RentalCar.com.entity.DrivingLicense;

@Repository
public interface DrivingLiscenseRepo extends JpaRepository<DrivingLicense, Long>{
	
}
