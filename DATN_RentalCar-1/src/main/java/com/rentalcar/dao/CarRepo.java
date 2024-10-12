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
}
