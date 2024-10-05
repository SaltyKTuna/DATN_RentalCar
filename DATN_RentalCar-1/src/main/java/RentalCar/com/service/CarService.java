package RentalCar.com.service;

import java.util.List;

import RentalCar.com.entity.Car;

public interface CarService {

    List<Car> getAllCars();
    
    List<Car> getCarById(Long id);

    Car addCar(Car car);

    Car updateCar(Long id, Car carDetails);

    void deleteById(Long id);
}
