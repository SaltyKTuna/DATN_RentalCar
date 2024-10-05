package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import RentalCar.com.entity.Damage;

@Repository
public interface DamageRepo extends JpaRepository<Damage, Long>{

}
