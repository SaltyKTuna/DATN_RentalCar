package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import RentalCar.com.entity.RentalVehicle;

@Repository
public interface RentalVehicleRepo extends JpaRepository<RentalVehicle, Long>{

}