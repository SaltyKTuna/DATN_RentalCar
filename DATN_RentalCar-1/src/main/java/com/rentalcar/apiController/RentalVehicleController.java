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

import com.rentalcar.dao.RentalVehicleRepo;
import com.rentalcar.entity.Damage;
import com.rentalcar.entity.RentalVehicle;

@RestController
@RequestMapping("/api/rental-vehicle")
public class RentalVehicleController {
	@Autowired RentalVehicleRepo rentalvehicleRepo;
	
	// tìm tất cả
		@GetMapping
		public List<RentalVehicle> getAll() {
			return rentalvehicleRepo.findAll();
		}

		// tìm theo id
		@GetMapping(value = "/{id}")
		public ResponseEntity<Optional<RentalVehicle>> getByID(@PathVariable("id") Long id) {
			if (!rentalvehicleRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(rentalvehicleRepo.findById(id));
			}
		}

		// lưu
		@PostMapping
		public String save(@RequestBody RentalVehicle rentalVehicle) {
			rentalvehicleRepo.save(rentalVehicle);
			return "Saved!!!";
		}

		@PutMapping(value = "/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody RentalVehicle rentalVehicleDetail) {
			// Tìm đối tượng cần cập nhật
			RentalVehicle rentalVehicleUpdate = rentalvehicleRepo.findById(id).orElseThrow(() -> new RuntimeException("RentalVehicle is not found"));

			// Cập nhật thông tin đối tượng
			rentalVehicleUpdate.setCar(rentalVehicleDetail.getCar());
			rentalVehicleUpdate.setDriver(rentalVehicleDetail.getDriver());
			rentalVehicleUpdate.setMotorbike(rentalVehicleDetail.getMotorbike());
			rentalVehicleUpdate.setRental(rentalVehicleDetail.getRental());
			rentalVehicleUpdate.setVehicleType(rentalVehicleDetail.getVehicleType());
			
			// Lưu đối tượng đã cập nhật
			rentalvehicleRepo.save(rentalVehicleUpdate);

			return "Updated!!!";
		}

		@DeleteMapping(value = "/{id}")
		public String deleteById(@PathVariable("id") Long id) {
			rentalvehicleRepo.deleteById(id);

			return "Deleted!!!!";
		}
}
