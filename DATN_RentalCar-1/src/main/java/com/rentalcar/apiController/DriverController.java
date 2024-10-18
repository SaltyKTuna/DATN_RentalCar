package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.DriverRepo;
import com.rentalcar.entity.Driver;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/DriverManagement")
public class DriverController {
	
	@Autowired
	private DriverRepo driverRepo;
		
		
		//tìm tất cả
		@GetMapping
		public List<Driver> getAll() {
			return driverRepo.findAll();
		}
		
		//tìm theo id
		@GetMapping(value = "/{id}")
		public ResponseEntity<Optional<Driver>> getByID(@PathVariable("id") Long id) {
			if (!driverRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(driverRepo.findById(id));
			}
		}
		
		//lưu
		@PostMapping
		public String save(@RequestBody Driver driver) {
			driverRepo.save(driver);
			return "saved...";
		}
		
		@PutMapping(value = "/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody Driver DriverDetail) {
		    // Tìm đối tượng cần cập nhật
			Driver driverUpdate = driverRepo.findById(id).orElseThrow(() -> new RuntimeException("driver not found"));
		    
		    // Cập nhật thông tin xe từ đối tượng 
			driverUpdate.setFullName(DriverDetail.getFullName());
			driverUpdate.setPhoneNumber(DriverDetail.getFullName());
			driverUpdate.setExperienceYears(DriverDetail.getExperienceYears());
			driverUpdate.setLicenseNumber(DriverDetail.getLicenseNumber());
			driverUpdate.setImageUrl(DriverDetail.getImageUrl());
			driverUpdate.setStatus(DriverDetail.getStatus());
			
			// Lưu đối tượng 
			driverRepo.save(driverUpdate);
		    
		    return "updated successfully";
		}	
		
		@DeleteMapping(value = "/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			driverRepo.deleteById(id);
			
			return "deleted...";
	    }
}
