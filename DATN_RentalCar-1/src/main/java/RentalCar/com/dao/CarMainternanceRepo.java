package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import RentalCar.com.entity.CarMaintenance;

@Repository
public interface CarMainternanceRepo extends JpaRepository<CarMaintenance, Long>{
	
}
