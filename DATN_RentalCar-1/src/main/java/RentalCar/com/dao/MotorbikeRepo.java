package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import RentalCar.com.entity.Motorbike;

@Repository
public interface MotorbikeRepo extends JpaRepository<Motorbike, Long>{

}
