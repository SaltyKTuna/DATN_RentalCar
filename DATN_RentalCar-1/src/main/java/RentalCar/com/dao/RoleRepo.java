package RentalCar.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import RentalCar.com.entity.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long>{

}
