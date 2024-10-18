package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.AdditionalFeeRepo;
import com.rentalcar.entity.AdditionalFee;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/additional-fee")
public class AdditionalFeeController {
	
	@Autowired
	private AdditionalFeeRepo additionalFeeRepo;
		
		
		//tìm tất cả
		@GetMapping
		public List<AdditionalFee> getAllCars() {
			return additionalFeeRepo.findAll();
		}
		
		//tìm theo id AdditionalFee
		@GetMapping(value = "/{id}")
		public ResponseEntity<Optional<AdditionalFee>> getByID(@PathVariable("id") Long id) {
			if (!additionalFeeRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(additionalFeeRepo.findById(id));
			}
		}
		
		//lưu AdditionalFee
		@PostMapping
		public String save(@RequestBody AdditionalFee additionalFee) {
			additionalFeeRepo.save(additionalFee);
			return "saved...";
		}
		
		@PutMapping(value = "/{id}")
		public String upDateCar(@PathVariable("id") Long id, @RequestBody AdditionalFee additionalFee) {
		    // Tìm Account cần cập nhật
			AdditionalFee additionalFeeUpDate = additionalFeeRepo.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
		    
		    // Cập nhật thông tin AdditionalFee
			//additionalFeeUpDate.setFeeID(additionalFee.getFeeID());
			additionalFeeUpDate.setFeeType(additionalFee.getFeeType());
			additionalFeeUpDate.setDescription(additionalFee.getDescription());
			additionalFeeUpDate.setRentalVehicle(additionalFee.getRentalVehicle());
		    
		    // Lưu đối tượng 
			additionalFeeRepo.save(additionalFeeUpDate);
		    
		    return "updated...";
		}
		
		@DeleteMapping(value = "/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			additionalFeeRepo.deleteById(id);
			
			return "Deleted...";
	    }
	
}
