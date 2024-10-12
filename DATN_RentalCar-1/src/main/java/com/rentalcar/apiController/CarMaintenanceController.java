package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.CarMainternanceRepo;
import com.rentalcar.entity.CarMaintenance;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/CarMaintenanceManagement")
public class CarMaintenanceController {
	
	@Autowired
	private CarMainternanceRepo CarMaintenanceRepo;
		
		
		//tìm tất cả
		@GetMapping(value = "/findAll")
		public List<CarMaintenance> getAllCars() {
			return CarMaintenanceRepo.findAll();
		}
		
		//tìm theo id AdditionalFee
		@GetMapping(value = "/findByID/{id}")
		public ResponseEntity<Optional<CarMaintenance>> getByID(@PathVariable("id") Long id) {
			if (!CarMaintenanceRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(CarMaintenanceRepo.findById(id));
			}
		}
		
		//lưu AdditionalFee
		@PostMapping(value = "/save")
		public String save(@RequestBody CarMaintenance carMaintenance) {
			CarMaintenanceRepo.save(carMaintenance);
			return "saved...";
		}
		
		@PutMapping(value = "/updateByID/{id}")
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
		
		@DeleteMapping(value = "/deleteID/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			CarMaintenanceRepo.deleteById(id);
			
			return "Deleted...";
	    }
	
}
