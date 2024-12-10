package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.AccountRepo;
import com.rentalcar.dao.RentalRepo;
import com.rentalcar.entity.Rental;
import com.rentalcar.entity.Account;
import com.rentalcar.entity.Discount;
import com.rentalcar.dao.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/rental")
public class RentalController {

    @Autowired
    private RentalRepo rentalRepo;

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private DiscountRepo discountRepo;

    // Tìm tất cả với phân trang
    @GetMapping
    public ResponseEntity<Page<Rental>> getAll(Pageable pageable) {
        Page<Rental> rentals = rentalRepo.findAll(pageable);
        return ResponseEntity.ok(rentals);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Rental> getByID(@PathVariable("id") Long id) {
        Optional<Rental> rental = rentalRepo.findById(id);

        // Kiểm tra nếu tìm thấy rental thì trả về, ngược lại trả về NOT FOUND
        return rental.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Lưu thông tin rental
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Rental rentalRequest) {
    	System.out.println("request data : " + rentalRequest.toString());
    	
    	
        try {
            // Kiểm tra Account
            if (rentalRequest.getAccount() == null || rentalRequest.getAccount().getAccountId() == null) {
                return ResponseEntity.badRequest().body("Account ID must not be null");
            }
            Account account = accountRepo.findById(rentalRequest.getAccount().getAccountId())
                                          .orElseThrow(() -> new RuntimeException("Account ID not found"));
            rentalRequest.setAccount(account);

            // Kiểm tra Discount
            if (rentalRequest.getDiscount() != null && rentalRequest.getDiscount().getDiscountId() != null) {
                Discount discount = discountRepo.findById(rentalRequest.getDiscount().getDiscountId())
                                                 .orElse(null); 
                if(discount != null) {                	
                	rentalRequest.setDiscount(discount);
                }
            }

            Rental savedRental = rentalRepo.save(rentalRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRental);
        } catch (Exception e) {
        	
        	System.out.println(e.getMessage());
        	
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving rental: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Rental rentalDetail) {
        Optional<Rental> optionalRental = rentalRepo.findById(id);
        if (optionalRental.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rental ID " + id + " not found");
        }

        Rental rentalUpdate = optionalRental.get();

        // Chỉ cập nhật renStatus nếu trạng thái là "Chờ xác nhận"
        if ("Chờ xác nhận".equals(rentalUpdate.getRenStatus()) && "Đã huỷ".equals(rentalDetail.getRenStatus())) {
            rentalUpdate.setRenStatus("Đã huỷ");
        }

        // Cập nhật các trường khác nếu có
        rentalUpdate.setAccount(rentalDetail.getAccount());
        rentalUpdate.setRentalDate(rentalDetail.getRentalDate());
        rentalUpdate.setReturnDate(rentalDetail.getReturnDate());
        rentalUpdate.setActualReturnDate(rentalDetail.getActualReturnDate());
        rentalUpdate.setTotalCost(rentalDetail.getTotalCost());
        rentalUpdate.setDiscount(rentalDetail.getDiscount());
        rentalUpdate.setHaveDriver(rentalDetail.getHaveDriver());
        rentalUpdate.setRentalLocations(rentalDetail.getRentalLocations());
        rentalUpdate.setNotes(rentalDetail.getNotes());

        Rental updatedRental = rentalRepo.save(rentalUpdate);
        return ResponseEntity.ok(updatedRental);
    }
    
    @PutMapping("/cancel/{id}")
    public ResponseEntity<Rental> updateRental(@PathVariable Long id, @RequestBody Rental rental) {
        // Kiểm tra xem rental tồn tại hay không
        Rental existingRental = rentalRepo.findById(id).orElseThrow(() -> new RuntimeException("Rental not found"));
        existingRental.setRenStatus(rental.getRenStatus());  // Chỉ cập nhật trạng thái
        rentalRepo.save(existingRental);
        return ResponseEntity.ok(existingRental);
    }
    

    // Xóa rental theo id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        if (!rentalRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rental ID " + id + " not found");
        }

        rentalRepo.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Rental ID " + id + " deleted successfully");
        return ResponseEntity.ok(response);
    }
}


//public class RentalController {
//	
//	@Autowired
//	private RentalRepo rentalRepo;
//	@Autowired
//	private AccountRepo accountRepo;
//	@Autowired
//	private DiscountRepo discountRepo;
//		
//		
//		//tìm tất cả
////		@GetMapping
////		public List<Rental> getAll() {
////			return rentalRepo.findAll();
////		}
//		@GetMapping
//		public ResponseEntity<Page<Rental>> getAll(@RequestParam(value = "page", defaultValue = "0") int page,
//		                                           @RequestParam(value = "size", defaultValue = "10") int size) {
//		    Pageable pageable = Pageable.ofSize(size).withPage(page);
//		    Page<Rental> rentals = rentalRepo.findAll(pageable);
//		    return new ResponseEntity<>(rentals, HttpStatus.OK);
//		}
//		
//		
//		//tìm theo id xe
//		@GetMapping(value = "/{id}")
//		public ResponseEntity<Optional<Rental>> getByID(@PathVariable("id") Long id) {
//			if (!rentalRepo.existsById(id)) {
//				return ResponseEntity.notFound().build();
//			} else {
//				return ResponseEntity.ok(rentalRepo.findById(id));
//			}
//		}
//		
////		@PostMapping
////		public ResponseEntity<Object> save(@RequestBody Rental rental) {
////		    System.out.println("-----------" + rentalRepo + "------------" + rental);
////		    rentalRepo.save(rental);
////
////		    // Trả về đối tượng JSON thay vì chuỗi
////		    Map<String, String> response = new HashMap<>();
////		    response.put("message", "saved...");
////		    response.put("status", "success");
////
////		    return ResponseEntity.ok(response);  // Trả về đối tượng JSON
////		}
//		
//		@PostMapping
//		public ResponseEntity<Rental> save(@RequestBody Rental rentalRequest) {
//		    // Kiểm tra account không null
//		    if (rentalRequest.getAccount() == null || rentalRequest.getAccount().getAccountId() == null) {
//		        throw new IllegalArgumentException("Account ID must not be null");
//		    }
//
//		    Account account = accountRepo.findById(rentalRequest.getAccount().getAccountId())
//		            .orElseThrow(() -> new RuntimeException("accountID not found"));
//		    rentalRequest.setAccount(account);
//
//		    // Nếu discount có mặt trong request, lấy discount từ cơ sở dữ liệu
//		    if (rentalRequest.getDiscount() != null && rentalRequest.getDiscount().getDiscountId() != null) {
//		        Discount discount = discountRepo.findById(rentalRequest.getDiscount().getDiscountId())
//		                .orElseThrow(() -> new RuntimeException("DiscountId not found"));
//		        rentalRequest.setDiscount(discount);
//		    }
//
//		    Rental savedRental = rentalRepo.save(rentalRequest);
//		    return ResponseEntity.ok(savedRental);
//		}
//
//		
//		@PostMapping("/save2")
//		public ResponseEntity<Rental> createRental(@RequestBody Rental rentalRequest) {
//			System.out.println("-----------"+ rentalRepo + "------------" + rentalRequest);
//		    // Kiểm tra account không null
//		    if (rentalRequest.getAccount() == null || rentalRequest.getAccount().getAccountId() == null) {
//		        throw new IllegalArgumentException("Account ID must not be null");
//		    }
//
//		    Account account = accountRepo.findById(rentalRequest.getAccount().getAccountId())
//		    		.orElseThrow(() -> new RuntimeException("accountID not found"));
//		    rentalRequest.setAccount(account);
//
//		    // Nếu discount có mặt trong request, lấy discount từ cơ sở dữ liệu
//		    if (rentalRequest.getDiscount() != null && rentalRequest.getDiscount().getDiscountId() != null) {
//		        Discount discount = discountRepo.findById(rentalRequest.getDiscount().getDiscountId())
//		        		.orElseThrow(() -> new RuntimeException("DiscountId not found"));
//		        rentalRequest.setDiscount(discount);
//		    }
//
//		    Rental savedRental = rentalRepo.save(rentalRequest);
//		    return ResponseEntity.ok(savedRental);
//		}
//
//
//		@PutMapping(value = "/{id}")
//		public String update(@PathVariable("id") Long id, @RequestBody Rental rentalDetail) {
//		    // Tìm xe cần cập nhật
//			Rental RentalUpdate = rentalRepo.findById(id).orElseThrow(() -> new RuntimeException("Rental not found"));
//		    
//		    // Cập nhật thông tin xe từ đối tượng carDetails
//			RentalUpdate.setAccount(rentalDetail.getAccount());
//			RentalUpdate.setRentalDate(rentalDetail.getRentalDate());
//			RentalUpdate.setReturnDate(rentalDetail.getReturnDate());
//			RentalUpdate.setActualReturnDate(rentalDetail.getActualReturnDate());
//			RentalUpdate.setTotalCost(rentalDetail.getTotalCost());
//			RentalUpdate.setRenStatus(rentalDetail.getRenStatus());
//			RentalUpdate.setDiscount(rentalDetail.getDiscount());
//			RentalUpdate.setHaveDriver(rentalDetail.getHaveDriver());
//			RentalUpdate.setRentalLocations(rentalDetail.getRentalLocations());
//			RentalUpdate.setNotes(rentalDetail.getNotes());	
//
//		    // Lưu đối tượng xe đã cập nhật
//			rentalRepo.save(RentalUpdate);
//		    
//		    return "updated successfully";
//		}	
//		
//		@DeleteMapping(value = "/{id}")
//	    public String deleteById(@PathVariable("id") Long id) {
//			rentalRepo.deleteById(id);
//			
//			return "deleted...";
//	    }
//}
