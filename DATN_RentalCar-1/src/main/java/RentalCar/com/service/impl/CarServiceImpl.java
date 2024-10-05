package RentalCar.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import RentalCar.com.dao.CarRepo;
import RentalCar.com.entity.Car;
import RentalCar.com.service.CarService;

import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepo carRepo;
//
//    @Override
//    public List<Car> getAllCars() {
//        return carRepo.findAllCar();
//    }
//    
//    @Override
//    public Optional<Car> getCarById(Long id) {
//        return carRepo.findById(id);
//    }
//
//    @Override
//    public Car addCar(Car car) {
//        return carRepo.save(car);
//    }
//
//    @Override
//    public Car updateCar(Long id, Car carDetails) {
//        return carRepo.findById(id)
//                .map(car -> {
//                    car.setMake(carDetails.getMake());
//                    car.setModel(carDetails.getModel());
//                    car.setCondition(carDetails.getCondition());
//                    car.setVehicleLocation(carDetails.getVehicleLocation());
//                    car.setYear(carDetails.getYear());
//                    car.setLicensePlate(carDetails.getLicensePlate());
//                    car.setColor(carDetails.getColor());
//                    car.setMileage(carDetails.getMileage());
//                    car.setStatus(carDetails.getStatus());
//                    car.setDailyRate(carDetails.getDailyRate());
//                    car.setImageUrl(carDetails.getImageUrl());
//                    car.setSeats(carDetails.getSeats());
//                    car.setTransmission(carDetails.getTransmission());
//                    car.setEngineCapacity(carDetails.getEngineCapacity());
//                    car.setFuelType(carDetails.getFuelType());
//                    car.setFuelConsumption(carDetails.getFuelConsumption());
//                    car.setDetailCar(carDetails.getDetailCar());
//                    car.setFacilities(carDetails.getFacilities());
//                    return carRepo.save(car);
//                })
//                .orElseThrow(() -> new RuntimeException("Car not found"));
//    }
//
//    @Override
//    public void deleteById(Long id) {
//        carRepo.deleteById(id);
//    }

	/**
	 * @param <S>
	 * @param entity
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#save(java.lang.Object)
	 */
	public <S extends Car> S save(S entity) {
		return carRepo.save(entity);
	}

	/**
	 * @param <S>
	 * @param entities
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#saveAll(java.lang.Iterable)
	 */
	public <S extends Car> List<S> saveAll(Iterable<S> entities) {
		return carRepo.saveAll(entities);
	}

	/**
	 * @param sort
	 * @return
	 * @see org.springframework.data.repository.ListPagingAndSortingRepository#findAll(org.springframework.data.domain.Sort)
	 */
	public List<Car> findAll(Sort sort) {
		return carRepo.findAll(sort);
	}

	/**
	 * @param pageable
	 * @return
	 * @see org.springframework.data.repository.PagingAndSortingRepository#findAll(org.springframework.data.domain.Pageable)
	 */
	public Page<Car> findAll(Pageable pageable) {
		return carRepo.findAll(pageable);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#findAll()
	 */
	public List<Car> findAll() {
		return carRepo.findAll();
	}

	/**
	 * @param <S>
	 * @param example
	 * @param pageable
	 * @return
	 * @see org.springframework.data.repository.query.QueryByExampleExecutor#findAll(org.springframework.data.domain.Example, org.springframework.data.domain.Pageable)
	 */
	public <S extends Car> Page<S> findAll(Example<S> example, Pageable pageable) {
		return carRepo.findAll(example, pageable);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#findById(java.lang.Object)
	 */
	public Optional<Car> findById(Long id) {
		return carRepo.findById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getOne(java.lang.Object)
	 */
	public Car getOne(Long id) {
		return carRepo.getOne(id);
	}

	/**
	 * @param id
	 * @see org.springframework.data.repository.CrudRepository#deleteById(java.lang.Object)
	 */
	public void deleteById(Long id) {
		carRepo.deleteById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getById(java.lang.Object)
	 */
	public Car getById(Long id) {
		return carRepo.getById(id);
	}

	/**
	 * @param entity
	 * @see org.springframework.data.repository.CrudRepository#delete(java.lang.Object)
	 */
	public void delete(Car entity) {
		carRepo.delete(entity);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.jpa.repository.JpaRepository#getReferenceById(java.lang.Object)
	 */
	public Car getReferenceById(Long id) {
		return carRepo.getReferenceById(id);
	}

	/**
	 * 
	 * @see org.springframework.data.repository.CrudRepository#deleteAll()
	 */
	public void deleteAll() {
		carRepo.deleteAll();
	}

	@Override
	public List<Car> getAllCars() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Car> getCarById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Car addCar(Car car) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Car updateCar(Long id, Car carDetails) {
		// TODO Auto-generated method stub
		return null;
	}



}

