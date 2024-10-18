package com.rentalcar.apiController;

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

import com.rentalcar.dao.FeedbackRepo;
import com.rentalcar.entity.Feedback;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
	@Autowired FeedbackRepo fbRepo;
	
	// tìm tất cả
		@GetMapping
		public List<Feedback> getAllFeedback() {
			return fbRepo.findAll();
		}

		// tìm theo id
		@GetMapping(value = "/{id}")
		public ResponseEntity<Optional<Feedback>> getByID(@PathVariable("id") Long id) {
			if (!fbRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(fbRepo.findById(id));
			}
		}

		// lưu
		@PostMapping
		public String save(@RequestBody Feedback fb) {
			fbRepo.save(fb);
			return "Saved!!!";
		}

		@PutMapping(value = "/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody Feedback fbDetail) {
			// Tìm đối tượng cần cập nhật
			Feedback fbUpdate = fbRepo.findById(id)
					.orElseThrow(() -> new RuntimeException("Feedback not found"));

			// Cập nhật thông tin đối tượng
			fbUpdate.setComment(fbDetail.getComment());
			fbUpdate.setFeedbackDate(fbDetail.getFeedbackDate());
			fbUpdate.setRating(fbDetail.getRating());

			// Lưu đối tượng xe đã cập nhật
			fbRepo.save(fbUpdate);

			return "Updated!!!";
		}

		@DeleteMapping(value = "/{id}")
		public String deleteById(@PathVariable("id") Long id) {
			fbRepo.deleteById(id);

			return "Deleted!!!!";
		}
}
