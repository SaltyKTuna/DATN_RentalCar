package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.DrivingLiscenseRepo;
import com.rentalcar.entity.DrivingLicense;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/driving-liscense")
public class DrivingLiscenseController {
	
	@Autowired
	private DrivingLiscenseRepo drivingLiscenseRepo;
		
		
		//tìm tất cả
		@GetMapping
		public List<DrivingLicense> getAll() {
			return drivingLiscenseRepo.findAll();
		}
		
		//tìm theo id xe
		@GetMapping(value = "/{id}")
		public ResponseEntity<Optional<DrivingLicense>> getByID(@PathVariable("id") Long id) {
			if (!drivingLiscenseRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(drivingLiscenseRepo.findById(id));
			}
		}
		
		//lưu
		@PostMapping
		public String save(@RequestBody DrivingLicense drivingLicense) {
			drivingLiscenseRepo.save(drivingLicense);
			return "saved...";
		}
		
		@PutMapping(value = "/{id}")
		public String upDate(@PathVariable("id") Long id, @RequestBody DrivingLicense drivingLicenseDetail) {
		    // Tìm xe cần cập nhật
			DrivingLicense drivingLiscenseUpdate = drivingLiscenseRepo.findById(id).orElseThrow(() -> new RuntimeException("DrivingLiscense not found"));
		    
		    // Cập nhật thông tin xe từ đối tượng carDetails
			//drivingLiscenseUpdate.setAccount(drivingLicenseDetail.getAccount());
			drivingLiscenseUpdate.setDateOfBirth(drivingLicenseDetail.getDateOfBirth());
			drivingLiscenseUpdate.setImageUrl(drivingLicenseDetail.getImageUrl());
			drivingLiscenseUpdate.setLicenseNumber(drivingLicenseDetail.getLicenseNumber());
			drivingLiscenseUpdate.setLicenseStatus(drivingLicenseDetail.getLicenseStatus());
    
		    // Lưu đối tượng xe đã cập nhật
		    drivingLiscenseRepo.save(drivingLiscenseUpdate);
		    
		    return "updated successfully";
		}	
		
		@DeleteMapping(value = "/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			drivingLiscenseRepo.deleteById(id);
			
			return "deleted...";
	    }
}
