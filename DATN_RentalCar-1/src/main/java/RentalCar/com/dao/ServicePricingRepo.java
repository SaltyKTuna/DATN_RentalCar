package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import RentalCar.com.entity.ServicePricing;

@Repository
public interface ServicePricingRepo extends JpaRepository<ServicePricing, Long>{

}
