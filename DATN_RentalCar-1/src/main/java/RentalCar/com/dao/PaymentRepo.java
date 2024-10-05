package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import RentalCar.com.entity.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long>{

}
