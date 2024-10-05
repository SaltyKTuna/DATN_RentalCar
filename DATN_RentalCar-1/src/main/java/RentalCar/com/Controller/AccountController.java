package RentalCar.com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import RentalCar.com.dao.AccountRepo;
import RentalCar.com.entity.Account;

@RestController
public class AccountController {
	
	@Autowired
	private AccountRepo accountRepo;
		
		
		//tìm tất cả
		@GetMapping(value = "/findAllAccount")
		public List<Account> getAllCars() {
			return accountRepo.findAll();
		}
		
		//tìm theo id Account
		@GetMapping(value = "/findByAccountID/{id}")
		public ResponseEntity<Optional<Account>> getByID(@PathVariable("id") Long id) {
			if (!accountRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(accountRepo.findById(id));
			}
		}
		
		//lưu Account
		@PostMapping(value = "/saveAccount")
		public String save(@RequestBody Account account) {
			accountRepo.save(account);
			return "saved...";
		}
		
		@PutMapping(value = "/upDateByAccountID/{id}")
		public String upDateCar(@PathVariable("id") Long id, @RequestBody Account carDetails) {
		    // Tìm Account cần cập nhật
			Account accountUpDate = accountRepo.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
		    
		    // Cập nhật thông tin Account
			accountUpDate.setAccountId(carDetails.getAccountId());
			accountUpDate.setFullName(carDetails.getFullName());
			accountUpDate.setUsername(carDetails.getUsername());
			accountUpDate.setEmail(carDetails.getEmail());
			accountUpDate.setPhoneNumber(carDetails.getPhoneNumber());
			accountUpDate.setPasswordHash(carDetails.getPasswordHash());
			accountUpDate.setDateOfBirth(carDetails.getDateOfBirth());
			accountUpDate.setAddress(carDetails.getAddress());
		    
		    // Lưu đối tượng 
			accountRepo.save(accountUpDate);
		    
		    return "Car updated successfully";
		}
		
		@DeleteMapping(value = "/deleteAccount/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			accountRepo.deleteById(id);
			
			return "Deleted";
	    }
	
}
