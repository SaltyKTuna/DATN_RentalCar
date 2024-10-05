package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import RentalCar.com.entity.Rental;

@Repository
public interface RentalRepo extends JpaRepository<Rental, Long>{

}
