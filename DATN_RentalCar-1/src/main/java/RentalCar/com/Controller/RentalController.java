package RentalCar.com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import RentalCar.com.dao.RentalRepo;
import RentalCar.com.entity.Rental;

@RestController
@RequestMapping("/RentalManagement")
public class RentalController {
	
	@Autowired
	private RentalRepo rentalRepo;
		
		
		//tìm tất cả
		@GetMapping(value = "/findAll")
		public List<Rental> getAll() {
			return rentalRepo.findAll();
		}
		
		//tìm theo id xe
		@GetMapping(value = "/findByID/{id}")
		public ResponseEntity<Optional<Rental>> getByID(@PathVariable("id") Long id) {
			if (!rentalRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rentalRepo.findById(id));
			}
		}
		
		//lưu
		@PostMapping(value = "/save")
		public String save(@RequestBody Rental drivingLicense) {
			rentalRepo.save(drivingLicense);
			return "saved...";
		}
		
		@PutMapping(value = "/updateByID/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody Rental rentalDetail) {
		    // Tìm xe cần cập nhật
			Rental RentalUpdate = rentalRepo.findById(id).orElseThrow(() -> new RuntimeException("Rental not found"));
		    
		    // Cập nhật thông tin xe từ đối tượng carDetails
			RentalUpdate.setAccount(rentalDetail.getAccount());
			RentalUpdate.setRentalDate(rentalDetail.getRentalDate());
			RentalUpdate.setReturnDate(rentalDetail.getReturnDate());
			RentalUpdate.setActualReturnDate(rentalDetail.getActualReturnDate());
			RentalUpdate.setTotalCost(rentalDetail.getTotalCost());
			RentalUpdate.setRenStatus(rentalDetail.getRenStatus());
			RentalUpdate.setDiscount(rentalDetail.getDiscount());
			RentalUpdate.setHaveDriver(rentalDetail.getHaveDriver());
			
			if (rentalDetail.getRentalDate() != null) {
			    RentalUpdate.setRentalDate(rentalDetail.getRentalDate());
			}
			if (rentalDetail.getReturnDate() != null) {
			    RentalUpdate.setReturnDate(rentalDetail.getReturnDate());
			}
			if (rentalDetail.getActualReturnDate() != null) {
			    RentalUpdate.setActualReturnDate(rentalDetail.getActualReturnDate());
			}
			if (rentalDetail.getTotalCost() != null) {
			    RentalUpdate.setTotalCost(rentalDetail.getTotalCost());
			}
			if (rentalDetail.getRenStatus() != null && !rentalDetail.getRenStatus().isEmpty()) {
			    RentalUpdate.setRenStatus(rentalDetail.getRenStatus());
			}

		    // Lưu đối tượng xe đã cập nhật
			rentalRepo.save(RentalUpdate);
		    
		    return "updated successfully";
		}	
		
		@DeleteMapping(value = "/delete/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			rentalRepo.deleteById(id);
			
			return "deleted...";
	    }
}
