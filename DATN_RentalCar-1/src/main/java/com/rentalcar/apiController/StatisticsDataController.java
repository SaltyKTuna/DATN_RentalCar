package com.rentalcar.apiController;

import com.rentalcar.entity.StatisticsData;
import com.rentalcar.dao.StatisticsDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsDataController {

    @Autowired
    private StatisticsDataRepo statisticsDataRepo;

    // Create a new statistics record
    @PostMapping
    public ResponseEntity<StatisticsData> createStatisticsData(@RequestBody StatisticsData statisticsData) {
        try {
            if (statisticsData.getStatDate() == null) {
                statisticsData.setStatDate(LocalDate.now());
            }
            StatisticsData savedData = statisticsDataRepo.save(statisticsData);
            return new ResponseEntity<>(savedData, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
//	Mẫu api    
//    { 
//        "statDate": "2024-12-06",
//        "totalMotorbikeRentals": 45,
//        "totalCarRentals": 20,
//        "totalRevenue": 15750.50,
//        "totalCustomers": 62,
//        "totalNewCustomers": 12,
//        "totalVehiclesRented": 65,
//        "totalMotorbikesAvailable": 80,
//        "totalCarsAvailable": 35,
//        "totalDrivers": 15,
//        "averageRentalDuration": 4.5,
//        "averageRevenuePerRental": 242.50,
//        "discountUsed": 1250.75
//    }

    // Get all statistics records
    @GetMapping
    public ResponseEntity<List<StatisticsData>> getAllStatisticsData() {
        try {
            List<StatisticsData> statisticsDataList = statisticsDataRepo.findAll();
            if (statisticsDataList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(statisticsDataList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get statistics record by ID
    @GetMapping("/{id}")
    public ResponseEntity<StatisticsData> getStatisticsDataById(@PathVariable Long id) {
        Optional<StatisticsData> statisticsData = statisticsDataRepo.findById(id);
        return statisticsData.map(data -> new ResponseEntity<>(data, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get statistics record by date
    @GetMapping("/date/{date}")
    public ResponseEntity<StatisticsData> getStatisticsDataByDate(@PathVariable LocalDate date) {
        Optional<StatisticsData> statisticsData = statisticsDataRepo.findByStatDate(date);
        return statisticsData.map(data -> new ResponseEntity<>(data, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update an existing statistics record
    @PutMapping("/{id}")
    public ResponseEntity<StatisticsData> updateStatisticsData(@PathVariable Long id, @RequestBody StatisticsData statisticsData) {
        Optional<StatisticsData> existingData = statisticsDataRepo.findById(id);
        if (existingData.isPresent()) {
            StatisticsData updatedData = existingData.get();
            
            // Cập nhật từng trường một cách chi tiết
            updatedData.setTotalMotorbikeRentals(statisticsData.getTotalMotorbikeRentals());
            updatedData.setTotalCarRentals(statisticsData.getTotalCarRentals());
            updatedData.setTotalRevenue(statisticsData.getTotalRevenue());
            updatedData.setTotalCustomers(statisticsData.getTotalCustomers());
            updatedData.setTotalNewCustomers(statisticsData.getTotalNewCustomers());
            updatedData.setTotalVehiclesRented(statisticsData.getTotalVehiclesRented());
            updatedData.setTotalMotorbikesAvailable(statisticsData.getTotalMotorbikesAvailable());
            updatedData.setTotalCarsAvailable(statisticsData.getTotalCarsAvailable());
            updatedData.setTotalDrivers(statisticsData.getTotalDrivers());
            updatedData.setAverageRentalDuration(statisticsData.getAverageRentalDuration());
            updatedData.setAverageRevenuePerRental(statisticsData.getAverageRevenuePerRental());
            updatedData.setDiscountUsed(statisticsData.getDiscountUsed());

            return new ResponseEntity<>(statisticsDataRepo.save(updatedData), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Partial update of statistics record
    @PatchMapping("/{id}")
    public ResponseEntity<StatisticsData> partialUpdateStatisticsData(@PathVariable Long id, @RequestBody StatisticsData statisticsData) {
        Optional<StatisticsData> existingData = statisticsDataRepo.findById(id);
        if (existingData.isPresent()) {
            StatisticsData updatedData = existingData.get();
            
            // Chỉ cập nhật các trường không null
            if (statisticsData.getTotalMotorbikeRentals() != 0) {
                updatedData.setTotalMotorbikeRentals(statisticsData.getTotalMotorbikeRentals());
            }
            if (statisticsData.getTotalCarRentals() != 0) {
                updatedData.setTotalCarRentals(statisticsData.getTotalCarRentals());
            }
            if (statisticsData.getTotalRevenue() != 0.0) {
                updatedData.setTotalRevenue(statisticsData.getTotalRevenue());
            }
            // Thêm các điều kiện tương tự cho các trường khác

            return new ResponseEntity<>(statisticsDataRepo.save(updatedData), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a statistics record
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStatisticsData(@PathVariable Long id) {
        try {
            statisticsDataRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}