package RentalCar.com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import RentalCar.com.dao.CarRepo;
import RentalCar.com.entity.Car;

@RestController
public class CarController {
	
	@Autowired
	private CarRepo carRepo;

		@GetMapping(value = "/findAllCar")
		public List<Car> getAllCars() {
			return carRepo.findAll();
		}
		
		
		@GetMapping(value = "/findByCarID/{id}")
		public ResponseEntity<Optional<Car>> getByID(@PathVariable("id") Long id) {
			if (!carRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(carRepo.findById(id));
			}
		}
		
		@PostMapping(value = "/saveCar")
		public String save(@RequestBody Car car) {
			carRepo.save(car);
			return "saved...";
		}
		
		@PutMapping(value = "/upDateByCarID/{id}")
		public String upDateCar(@PathVariable("id") Long id, @RequestBody Car carDetails) {
		    // Tìm xe cần cập nhật
		    Car carUpDate = carRepo.findById(id).orElseThrow(() -> new RuntimeException("Car not found"));
		    
		    // Cập nhật thông tin xe từ đối tượng carDetails
		    carUpDate.setMake(carDetails.getMake());
		    carUpDate.setModel(carDetails.getModel());
		    carUpDate.setCondition(carDetails.getCondition());
		    carUpDate.setVehicleLocation(carDetails.getVehicleLocation());
		    carUpDate.setYear(carDetails.getYear());
		    carUpDate.setLicensePlate(carDetails.getLicensePlate());
		    carUpDate.setColor(carDetails.getColor());
		    carUpDate.setMileage(carDetails.getMileage());
		    carUpDate.setStatus(carDetails.getStatus());
		    carUpDate.setDailyRate(carDetails.getDailyRate());
		    carUpDate.setImageUrl(carDetails.getImageUrl());
		    carUpDate.setSeats(carDetails.getSeats());
		    carUpDate.setTransmission(carDetails.getTransmission());
		    carUpDate.setEngineCapacity(carDetails.getEngineCapacity());
		    carUpDate.setFuelType(carDetails.getFuelType());
		    carUpDate.setFuelConsumption(carDetails.getFuelConsumption());
		    carUpDate.setDetailCar(carDetails.getDetailCar());
		    carUpDate.setFacilities(carDetails.getFacilities());
		    
		    // Lưu đối tượng xe đã cập nhật
		    carRepo.save(carUpDate);
		    
		    return "Car updated successfully";
		}

		
}
