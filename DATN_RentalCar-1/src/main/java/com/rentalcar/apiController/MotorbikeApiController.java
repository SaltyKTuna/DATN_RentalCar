package com.rentalcar.apiController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentalcar.dao.MotorbikeRepo;
import com.rentalcar.entity.Motorbike;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/motorbikes")
public class MotorbikeApiController {

    private final MotorbikeRepo motorbikeRepo;
    
    @Autowired
    private HttpServletRequest request;

    @Autowired
    public MotorbikeApiController(MotorbikeRepo motorbikeRepo) {
        this.motorbikeRepo = motorbikeRepo;
    }

    // Lấy tất cả các xe máy
    @GetMapping
    public List<Motorbike> getAllMotorbikes() {
        return motorbikeRepo.findAll();
    }
    
//    @GetMapping
//    public List<Motorbike> getAllMotorbikes() {
//        // Lấy URL hiện tại
//        String currentURL = request.getRequestURL().toString();
//
//        // Kiểm tra URL có chứa "http://localhost:8080"
//        boolean isLocalhost = currentURL.contains("http://localhost:8080");
//
//        // Lọc danh sách xe máy
//        return motorbikeRepo.findAll().stream()
//                .filter(motorbike -> {
//                    // Điều kiện status và URL
//                    if (isLocalhost && !"sẵn sàng".equalsIgnoreCase(motorbike.getStatus())) {
//                        return false; // Không trả về nếu không sẵn sàng và đang ở localhost
//                    }
//                    return true;
//                })
//                .collect(Collectors.toList());
//    }

    // Lấy xe máy theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Motorbike> getMotorbikeById(@PathVariable Long id) {
        return motorbikeRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Tạo mới một xe máy
    @PostMapping
    public ResponseEntity<Motorbike> createMotorbike(@RequestBody Motorbike motorbike) {
        Motorbike savedMotorbike = motorbikeRepo.save(motorbike);
        return ResponseEntity.status(201).body(savedMotorbike);
    }

    // Cập nhật một xe máy hiện có
    @PutMapping("/{id}")
    public ResponseEntity<Motorbike> updateMotorbike(@PathVariable Long id, @RequestBody Motorbike motorbikeDetails) {
        return motorbikeRepo.findById(id)
                .map(motorbike -> {
                    motorbike.setColor(motorbikeDetails.getColor());
                    motorbike.setCondition(motorbikeDetails.getCondition());
                    motorbike.setDailyRate(motorbikeDetails.getDailyRate());
                    motorbike.setDetailBike(motorbikeDetails.getDetailBike());
                    motorbike.setGearBox(motorbikeDetails.getGearBox());
                    motorbike.setEngineCapacity(motorbikeDetails.getEngineCapacity());
                    motorbike.setFacilities(motorbikeDetails.getFacilities());
                    motorbike.setFuelConsumption(motorbikeDetails.getFuelConsumption());
                    motorbike.setFuelType(motorbikeDetails.getFuelType());
                    motorbike.setImageUrl(motorbikeDetails.getImageUrl());
                    motorbike.setLicensePlate(motorbikeDetails.getLicensePlate());
                    motorbike.setMake(motorbikeDetails.getMake());
                    motorbike.setMileage(motorbikeDetails.getMileage());
                    motorbike.setModel(motorbikeDetails.getModel());

                    motorbike.setStatus(motorbikeDetails.getStatus());
                    motorbike.setVehicleLocation(motorbikeDetails.getVehicleLocation());
                    motorbike.setYear(motorbikeDetails.getYear());
                    motorbike.setRentals(motorbikeDetails.getRentals());

                    Motorbike updatedMotorbike = motorbikeRepo.save(motorbike);
                    return ResponseEntity.ok(updatedMotorbike);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Xóa một xe máy theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMotorbike(@PathVariable Long id) {
        if (!motorbikeRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        motorbikeRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/models")
	public List<String> getMotorbikeModels() {
		return motorbikeRepo.findAllModels();
	}
    
    @GetMapping("/makes")
	public List<String> getMotorbikeMakes() {
		return motorbikeRepo.findAllMakes();
	}
}
