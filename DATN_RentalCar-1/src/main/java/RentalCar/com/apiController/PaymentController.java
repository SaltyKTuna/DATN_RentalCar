package RentalCar.com.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import RentalCar.com.dao.PaymentRepo;
import RentalCar.com.entity.Payment;

@RestController
@RequestMapping("/PaymentManagement")
public class PaymentController {
	
	@Autowired
	private PaymentRepo paymentRepo;
		
		
		//tìm tất cả
		@GetMapping(value = "/findAll")
		public List<Payment> getAll() {
			return paymentRepo.findAll();
		}
		
		//tìm theo id
		@GetMapping(value = "/findByID/{id}")
		public ResponseEntity<Optional<Payment>> getByID(@PathVariable("id") Long id) {
			if (!paymentRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(paymentRepo.findById(id));
			}
		}
		
		//lưu
		@PostMapping(value = "/save")
		public String save(@RequestBody Payment payment) {
			paymentRepo.save(payment);
			return "saved...";
		}
		
		@PutMapping(value = "/updateByID/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody Payment paymentDetail) {
		    // Tìm đối tượng cần cập nhật
			Payment paymentUpdate = paymentRepo.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
		    
		    // Cập nhật thông tin xe từ đối tượng 
			paymentUpdate.setAmount(paymentDetail.getAmount());
			paymentUpdate.setPaymentDate(paymentDetail.getPaymentDate());
			paymentUpdate.setPaymentMethod(paymentDetail.getPaymentMethod());
			
			// Lưu đối tượng 
			paymentRepo.save(paymentUpdate);
		    
		    return "updated successfully";
		}	
		
		@DeleteMapping(value = "/delete/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			paymentRepo.deleteById(id);
			
			return "deleted...";
	    }
}
