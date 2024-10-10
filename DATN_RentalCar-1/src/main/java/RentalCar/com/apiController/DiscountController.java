package RentalCar.com.apiController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import RentalCar.com.dao.DiscountRepo;
import RentalCar.com.entity.Discount;

@RestController
@RequestMapping("/discountManage")
public class DiscountController {
	@Autowired
	DiscountRepo discRepo;

	// tìm tất cả
	@GetMapping(value = "/findAll")
	public List<Discount> getAllDiscount() {
		return discRepo.findAll();
	}

	// tìm theo id
	@GetMapping(value = "/findByID/{id}")
	public ResponseEntity<Optional<Discount>> getByID(@PathVariable("id") Long id) {
		if (!discRepo.existsById(id)) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(discRepo.findById(id));
		}
	}

	// lưu
	@PostMapping(value = "/save")
	public String save(@RequestBody Discount disc) {
		discRepo.save(disc);
		return "Saved!!!";
	}

	@PutMapping(value = "/update/{id}")
	public String update(@PathVariable("id") Long id, @RequestBody Discount discountDetail) {
		// Tìm đối tượng cần cập nhật
		Discount discountUpdate = discRepo.findById(id).orElseThrow(() -> new RuntimeException("Discount not found"));

		// Cập nhật thông tin đối tượng
		discountUpdate.setDescription(discountDetail.getDescription());
		discountUpdate.setDiscountCode(discountDetail.getDiscountCode());
		discountUpdate.setDiscountPercentage(discountDetail.getDiscountPercentage());
		discountUpdate.setEndDate(discountDetail.getEndDate());
		discountUpdate.setStartDate(discountDetail.getStartDate());
		discountUpdate.setStatus(discountDetail.getStatus());
		
		// Lưu đối tượng xe đã cập nhật
		discRepo.save(discountUpdate);

		return "Updated!!!";
	}

	@DeleteMapping(value = "/delete/{id}")
	public String deleteById(@PathVariable("id") Long id) {
		discRepo.deleteById(id);

		return "Deleted!!!!";
	}
}
