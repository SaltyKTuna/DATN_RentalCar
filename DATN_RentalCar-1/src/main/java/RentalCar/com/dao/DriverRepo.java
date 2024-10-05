package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import RentalCar.com.entity.Driver;

@Repository
public interface DriverRepo extends JpaRepository<Driver, Long>{

}
