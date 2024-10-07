package RentalCar.com.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import RentalCar.com.dao.ServicePricingRepo;
import RentalCar.com.entity.ServicePricing;

@RestController
@RequestMapping("/ServicePricingManagement")
public class ServicePricingController {
	
	@Autowired
	private ServicePricingRepo servicePricingRepo;
		
		
		//tìm tất cả
		@GetMapping(value = "/findAll")
		public List<ServicePricing> getAll() {
			return servicePricingRepo.findAll();
		}
		
		//tìm theo id xe
		@GetMapping(value = "/findByID/{id}")
		public ResponseEntity<Optional<ServicePricing>> getByID(@PathVariable("id") Long id) {
			if (!servicePricingRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(servicePricingRepo.findById(id));
			}
		}
		
		//lưu
		@PostMapping(value = "/save")
		public String save(@RequestBody ServicePricing drivingLicense) {
			servicePricingRepo.save(drivingLicense);
			return "saved...";
		}
		
		@PutMapping(value = "/updateByID/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody ServicePricing ServicePricingDetail) {
		    // Tìm xe cần cập nhật
			ServicePricing servicePricingUpdate = servicePricingRepo.findById(id).orElseThrow(() -> new RuntimeException("Rental not found"));
		    
		    // Cập nhật thông tin xe từ đối tượng carDetails
			servicePricingUpdate.setHourlyRate(ServicePricingDetail.getHourlyRate());
			servicePricingUpdate.setDailyRate(ServicePricingDetail.getDailyRate());
			servicePricingUpdate.setLongTermRate(ServicePricingDetail.getLongTermRate());
			servicePricingUpdate.setDescription(ServicePricingDetail.getDescription());
			servicePricingUpdate.setPercentDiscount(ServicePricingDetail.getPercentDiscount());
			servicePricingUpdate.setVehicleType(ServicePricingDetail.getVehicleType());
			
			// Lưu đối tượng xe đã cập nhật
			servicePricingRepo.save(servicePricingUpdate);
		    
		    return "updated successfully";
		}	
		
		@DeleteMapping(value = "/delete/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			servicePricingRepo.deleteById(id);
			
			return "deleted...";
	    }
}
