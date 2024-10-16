package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.AccountRepo;
import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;
import com.rentalcar.dao.RoleRepo;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accountManagement")
public class AccountController {
	
	@Autowired
	private AccountRepo accountRepo;
		
		
		//tìm tất cả
		@GetMapping
		public List<Account> getAllCars() {
			return accountRepo.findAll();
		}
		
		//tìm theo id Account
		@GetMapping(value = "/{id}")
		public ResponseEntity<Optional<Account>> getByID(@PathVariable("id") Long id) {
			if (!accountRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(accountRepo.findById(id));
			}
		}
		
		//lưu Account
		@PostMapping(value = "/save")
		public String save(@RequestBody Account account) {		
			accountRepo.save(account);
			return "saved...";
		}
		
		@PutMapping(value = "/upDateByID/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody Account carDetails) {
		    // Tìm Account cần cập nhật
			Account accountUpDate = accountRepo.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
		    
		    // Cập nhật thông tin Account
			accountUpDate.setFullName(carDetails.getFullName());
			accountUpDate.setUsername(carDetails.getUsername());
			accountUpDate.setEmail(carDetails.getEmail());
			accountUpDate.setPhoneNumber(carDetails.getPhoneNumber());
			accountUpDate.setPasswordHash(carDetails.getPasswordHash());
			accountUpDate.setRoles(carDetails.getRoles());
			accountUpDate.setDateOfBirth(carDetails.getDateOfBirth());
			accountUpDate.setAddress(carDetails.getAddress());
		    
		    // Lưu đối tượng 
			accountRepo.save(accountUpDate);
		    
		    return "account updated successfully";
		}
		
		// dữ liệu test
		
//		{	
//			  "accountId": 1,
//			  "fullName": "Nguyễn Văn A2",
//			  "email": "nguyenvana_new@example.com", //không được trùng
//			  "phoneNumber": "9876543210",
//			  "username": "nguyenvana_new",			 //không được trùng
//			  "passwordHash": "newhashedpassword456",
//			  "address": "456 Đường XYZ, Thành phố ABC",
//			  "dateOfBirth": "1990-01-01",
//			  "roles": [
//			    {
//			      "roleId": 2
//			    },
//			    {
//			      "roleId": 3
//			    }
//			  ]
//			}

		
//		@PutMapping(value = "/upDateByID/{id}")
//		public Account updateAccount(Long id, Account accountDetails) {
//	        Optional<Account> optionalAccount = accountRepo.findById(id);
//	        if (optionalAccount.isPresent()) {
//	            Account account = optionalAccount.get();
//	            account.setFullName(accountDetails.getFullName());
//	            account.setEmail(accountDetails.getEmail());
//	            account.setPhoneNumber(accountDetails.getPhoneNumber());
//	            account.setUsername(accountDetails.getUsername());
//	            account.setPasswordHash(accountDetails.getPasswordHash());
//	            account.setRoles(accountDetails.getRoles());
//	            account.setAddress(accountDetails.getAddress());
//	            account.setDateOfBirth(accountDetails.getDateOfBirth());
//
//	            // Save the updated account object back to the database
//	            return accountRepo.save(account);
//	        } else {
//	            throw new RuntimeException("Account not found with id: " + id);
//	        }
//	    }
		

		
		@DeleteMapping(value = "/delete/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			accountRepo.deleteById(id);
			
			return "Deleted";
	    }
	
}
