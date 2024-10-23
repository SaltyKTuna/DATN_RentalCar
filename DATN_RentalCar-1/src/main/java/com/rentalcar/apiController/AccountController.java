package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.AccountRepo;
import com.rentalcar.dao.RoleRepo;
import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/account")
public class AccountController {

	@Autowired
	private AccountRepo accountRepo;
	@Autowired
	private RoleRepo roleRepo;
	// Find all accounts
		@GetMapping
		public List<Account> getAllAccounts() {
			return accountRepo.findAll();
		}
		
		// Find account by ID
		@GetMapping(value = "/{id}")
		public ResponseEntity<Account> getByID(@PathVariable("id") Long id) {
			return accountRepo.findById(id)
					.map(ResponseEntity::ok)
					.orElseGet(() -> ResponseEntity.notFound().build());
		}
		
		// Save account
		@PostMapping
		public ResponseEntity<String> save(@RequestBody Account account) {
		    try {
		        accountRepo.save(account);
		        return ResponseEntity.ok("saved...");
		    } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving account");
		    }
		} // Thêm dấu ngoặc đóng ở đây

		
		// Update account
		@PutMapping(value = "/{id}")
		public ResponseEntity<String> update(@PathVariable("id") Long id, @RequestBody Account accountDetails) {
			return accountRepo.findById(id).map(account -> {
				account.setFullName(accountDetails.getFullName());
				account.setUsername(accountDetails.getUsername());
				account.setEmail(accountDetails.getEmail());
				account.setPhoneNumber(accountDetails.getPhoneNumber());
				account.setPasswordHash(accountDetails.getPasswordHash());
				account.setRoles(accountDetails.getRoles());
				account.setDateOfBirth(accountDetails.getDateOfBirth());
				account.setAddress(accountDetails.getAddress());
				accountRepo.save(account);
				return ResponseEntity.ok("account updated successfully");
			}).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found"));
		}
		
		// Delete account by ID
		@DeleteMapping(value = "/{id}")
		public ResponseEntity<String> deleteById(@PathVariable("id") Long id) {
			if (accountRepo.existsById(id)) {
				accountRepo.deleteById(id);
				return ResponseEntity.ok("Deleted");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
			}
		}
		
		// Fetch all roles
		@GetMapping("/roles")
		public List<Role> getAllRoles() {
			return roleRepo.findAll(); // Assuming roleRepo is defined and injected
		}
	
}
