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

import RentalCar.com.dao.MotorbikeRepo;
import RentalCar.com.entity.Motorbike;


@RestController
@RequestMapping("/motorbikes")
public class MotorbikeApiController {

    private final MotorbikeRepo motorbikeRepo;

    @Autowired
    public MotorbikeApiController(MotorbikeRepo motorbikeRepo) {
        this.motorbikeRepo = motorbikeRepo;
    }

    // Lấy tất cả các xe máy
    @GetMapping
    public List<Motorbike> getAllMotorbikes() {
        return motorbikeRepo.findAll();
    }

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
                    motorbike.setServicePricingList(motorbikeDetails.getServicePricingList());
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
}
