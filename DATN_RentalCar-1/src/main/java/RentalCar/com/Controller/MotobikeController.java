package RentalCar.com.Controller;

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

import RentalCar.com.dao.MotobikeRepo;
import RentalCar.com.entity.Car;
import RentalCar.com.entity.Motorbike;

@RestController
@RequestMapping("/motobikeManage")
public class MotobikeController {
	@Autowired
	MotobikeRepo motobikeRepo;

	// tìm tất cả
	@GetMapping(value = "/findAll")
	public List<Motorbike> getAllCars() {
		return motobikeRepo.findAll();
	}

	// tìm theo id
	@GetMapping(value = "/findByID/{id}")
	public ResponseEntity<Optional<Motorbike>> getByID(@PathVariable("id") Long id) {
		if (!motobikeRepo.existsById(id)) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(motobikeRepo.findById(id));
		}
	}

	// lưu
	@PostMapping(value = "/save")
	public String save(@RequestBody Motorbike motobike) {
		motobikeRepo.save(motobike);
		return "Saved!!!";
	}

	@PutMapping(value = "/update/{id}")
	public String update(@PathVariable("id") Long id, @RequestBody Motorbike motobikeDetail) {
		// Tìm xe cần cập nhật
		Motorbike motorbikeUpdate = motobikeRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Motobike not found"));

		// Cập nhật thông tin xe từ đối tượng
		motorbikeUpdate.setColor(motobikeDetail.getColor());
		motorbikeUpdate.setCondition(motobikeDetail.getCondition());
		motorbikeUpdate.setDailyRate(motobikeDetail.getDailyRate());
		motorbikeUpdate.setDetailBike(motobikeDetail.getDetailBike());
		motorbikeUpdate.setEngineCapacity(motobikeDetail.getEngineCapacity());
		motorbikeUpdate.setFacilities(motobikeDetail.getFacilities());
		motorbikeUpdate.setFuelConsumption(motobikeDetail.getFuelConsumption());
		motorbikeUpdate.setFuelType(motobikeDetail.getFuelType());
		motorbikeUpdate.setImageUrl(motobikeDetail.getImageUrl());
		motorbikeUpdate.setLicensePlate(motobikeDetail.getLicensePlate());
		motorbikeUpdate.setMake(motobikeDetail.getMake());
		motorbikeUpdate.setMileage(motobikeDetail.getMileage());
		motorbikeUpdate.setModel(motobikeDetail.getModel());
		motorbikeUpdate.setServicePricingList(motobikeDetail.getServicePricingList());
		motorbikeUpdate.setStatus(motobikeDetail.getStatus());
		motorbikeUpdate.setVehicleLocation(motobikeDetail.getVehicleLocation());
		motorbikeUpdate.setYear(motobikeDetail.getYear());

		// Lưu đối tượng xe đã cập nhật
		motobikeRepo.save(motorbikeUpdate);

		return "Updated!!!";
	}

	@DeleteMapping(value = "/delete/{id}")
	public String deleteById(@PathVariable("id") Long id) {
		motobikeRepo.deleteById(id);

		return "Deleted!!!!";
	}
}
