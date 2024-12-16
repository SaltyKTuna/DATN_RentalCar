package com.rentalcar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rentalcar.entity.Car;

@Repository
public interface CarRepo extends JpaRepository<Car, Long>{
	
//	@Query("SELECT c FROM Car c")
//	public List<Car> findAllCar();
//
//	// Xóa tất cả các xe theo ID
//	@Query("DELETE FROM Cars c WHERE c.car_id = :car_id")
//	void deleteById(@Param("car_id") Long car_id);
//
//	// Tìm tất cả các xe theo loại xe
//	@Query("SELECT c FROM Cars c WHERE c.Model = :Model")
//	List<Car> findByType(@Param("Model") String Model);
//
//	// Tìm tất cả các xe theo hãng xe
//	@Query("SELECT c FROM Cars c WHERE c.Make = :Make")
//	List<Car> findByBrand(@Param("Make") String Make);
//
//	@Query("DELETE Cars pc WHERE c.car_id = :car_id")
//	void deleteByProductId(@Param("car_id") Long car_id);
//	
////	@Query("SELECT p FROM Product p WHERE p.name LIKE :name")
////	public Page<Product> findByKeyword(@Param("name") String name, Pageable pageable);
	 @Query("SELECT DISTINCT c.model FROM Car c")
    List<String> findAllModels();
    
    @Query("SELECT DISTINCT c.make FROM Car c")
    List<String> findAllMakes();
    
    @Query("SELECT c FROM Car c WHERE c.vehicleLocation = :location")
    List<Car> findAllVehicleLocation(@Param("location") String location);
    
    @Query(value = "SELECT CASE " +
            "WHEN CHARINDEX('TP', c.vehicle_location) > 0 THEN " +
            "LTRIM(SUBSTRING(c.vehicle_location, CHARINDEX('TP', c.vehicle_location) + 2, LEN(c.vehicle_location))) " +
            "ELSE c.vehicle_location END AS extractedLocation " +
            "FROM Car c " +
            "WHERE c.vehicle_location LIKE CONCAT(N'%', :location, '%')", 
    nativeQuery = true)
    List<Car> findVehicleLocation(@Param("location") String location);

}
