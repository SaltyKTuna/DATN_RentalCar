package RentalCar.com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import RentalCar.com.dao.AdditionalFeeRepo;
import RentalCar.com.entity.AdditionalFee;

@RestController
public class AdditionalFeeController {
	
	@Autowired
	private AdditionalFeeRepo additionalFeeRepo;
		
		
		//tìm tất cả
		@GetMapping(value = "/findAllAdditionalFee")
		public List<AdditionalFee> getAllCars() {
			return additionalFeeRepo.findAll();
		}
		
		//tìm theo id AdditionalFee
		@GetMapping(value = "/findByAdditionalFeeID/{id}")
		public ResponseEntity<Optional<AdditionalFee>> getByID(@PathVariable("id") Long id) {
			if (!additionalFeeRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(additionalFeeRepo.findById(id));
			}
		}
		
		//lưu AdditionalFee
		@PostMapping(value = "/saveAdditionalFee")
		public String save(@RequestBody AdditionalFee additionalFee) {
			additionalFeeRepo.save(additionalFee);
			return "saved...";
		}
		
		@PutMapping(value = "/upDateByAdditionalFeeID/{id}")
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
		
		@DeleteMapping(value = "/deleteAdditionalFeeID/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			additionalFeeRepo.deleteById(id);
			
			return "Deleted...";
	    }
	
}
