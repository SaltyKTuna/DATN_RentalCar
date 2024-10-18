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

import com.rentalcar.dao.DamageRepo;
import com.rentalcar.entity.Damage;
import com.rentalcar.entity.Motorbike;

@RestController
@RequestMapping("/api/damage")
public class DamageController {
	@Autowired
	DamageRepo damageRepo;

	// tìm tất cả
	@GetMapping
	public List<Damage> getAllDamage() {
		return damageRepo.findAll();
	}

	// tìm theo id
	@GetMapping(value = "/{id}")
	public ResponseEntity<Optional<Damage>> getByID(@PathVariable("id") Long id) {
		if (!damageRepo.existsById(id)) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(damageRepo.findById(id));
		}
	}

	// lưu
	@PostMapping
	public String save(@RequestBody Damage dmg) {
		damageRepo.save(dmg);
		return "Saved!!!";
	}

	@PutMapping(value = "/{id}")
	public String update(@PathVariable("id") Long id, @RequestBody Damage dmgDetail) {
		// Tìm tổn hại cần cập nhật
		Damage dmgUpdate = damageRepo.findById(id).orElseThrow(() -> new RuntimeException("Damage is not found"));

		// Cập nhật thông tin tổn hại từ đối tượng
		dmgUpdate.setDamageDate(dmgDetail.getDamageDate());
		dmgUpdate.setDescription(dmgDetail.getDescription());
		dmgUpdate.setRentalVehicle(dmgDetail.getRentalVehicle());
		dmgUpdate.setRepairCost(dmgDetail.getRepairCost());
		
		// Lưu đối tượng đã cập nhật
		damageRepo.save(dmgUpdate);

		return "Updated!!!";
	}

	@DeleteMapping(value = "/{id}")
	public String deleteById(@PathVariable("id") Long id) {
		damageRepo.deleteById(id);

		return "Deleted!!!!";
	}
}
