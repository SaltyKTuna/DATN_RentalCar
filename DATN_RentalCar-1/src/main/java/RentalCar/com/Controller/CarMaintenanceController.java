package RentalCar.com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import RentalCar.com.dao.CarMainternanceRepo;
import RentalCar.com.entity.CarMaintenance;

@RestController
public class CarMaintenanceController {
	
	@Autowired
	private CarMainternanceRepo CarMaintenanceRepo;
		
		
		//tìm tất cả
		@GetMapping(value = "/findAllCarMaintenance")
		public List<CarMaintenance> getAllCars() {
			return CarMaintenanceRepo.findAll();
		}
		
		//tìm theo id AdditionalFee
		@GetMapping(value = "/findByCarMaintenanceID/{id}")
		public ResponseEntity<Optional<CarMaintenance>> getByID(@PathVariable("id") Long id) {
			if (!CarMaintenanceRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(CarMaintenanceRepo.findById(id));
			}
		}
		
		//lưu AdditionalFee
		@PostMapping(value = "/saveCarMaintenance")
		public String save(@RequestBody CarMaintenance carMaintenance) {
			CarMaintenanceRepo.save(carMaintenance);
			return "saved...";
		}
		
		@PutMapping(value = "/upDateByCarMaintenanceID/{id}")
		public String upDateCar(@PathVariable("id") Long id, @RequestBody CarMaintenance carMaintenance) {
		    // Tìm Account cần cập nhật
			CarMaintenance carMaintenanceUpDate = CarMaintenanceRepo.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
		    
		    // Cập nhật thông tin AdditionalFee
			carMaintenanceUpDate.setCost(carMaintenance.getCost());
			carMaintenanceUpDate.setDescription(carMaintenance.getDescription());
			carMaintenanceUpDate.setMaintenanceDate(carMaintenance.getMaintenanceDate());
			carMaintenanceUpDate.setCar(carMaintenance.getCar());
			carMaintenanceUpDate.setMotorbike(carMaintenance.getMotorbike());
		    
		    // Lưu đối tượng 
			CarMaintenanceRepo.save(carMaintenanceUpDate);
		    
		    return "updated...";
		}
		
		@DeleteMapping(value = "/deleteCarMaintenanceID/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			CarMaintenanceRepo.deleteById(id);
			
			return "Deleted...";
	    }
	
}