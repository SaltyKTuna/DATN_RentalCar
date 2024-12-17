package com.rentalcar.apiController;

import com.rentalcar.dao.StatisticsDataRepo;
import com.rentalcar.entity.StatisticsData;
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

    private final StatisticsDataRepo statisticsDataRepo;

    @Autowired
    public StatisticsDataController(StatisticsDataRepo statisticsDataRepo) {
        this.statisticsDataRepo = statisticsDataRepo;
    }

    @GetMapping
    public ResponseEntity<List<StatisticsData>> getAllStatistics() {
        try {
            return ResponseEntity.ok(statisticsDataRepo.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping
    public ResponseEntity<StatisticsData> createOrUpdateStatistics(@RequestBody StatisticsData inputData) {
        try {
            LocalDate today = LocalDate.now();
            
            StatisticsData dataToSave = statisticsDataRepo.findByStatDate(today)
                .map(existingData -> updateExistingStatistics(existingData, inputData))
                .orElseGet(() -> createNewStatistics(inputData, today));
            
            StatisticsData savedData = statisticsDataRepo.save(dataToSave);
            return ResponseEntity.ok(savedData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private StatisticsData updateExistingStatistics(StatisticsData existingData, StatisticsData inputData) {
        // Increment numeric fields
        existingData.setTotalMotorbikeRentals(existingData.getTotalMotorbikeRentals() + inputData.getTotalMotorbikeRentals());
        existingData.setTotalCarRentals(existingData.getTotalCarRentals() + inputData.getTotalCarRentals());
        existingData.setTotalRevenue(existingData.getTotalRevenue() + inputData.getTotalRevenue());
        existingData.setTotalCustomers(existingData.getTotalCustomers() + inputData.getTotalCustomers());
        existingData.setTotalNewCustomers(existingData.getTotalNewCustomers() + inputData.getTotalNewCustomers());
        existingData.setTotalVehiclesRented(existingData.getTotalVehiclesRented() + inputData.getTotalVehiclesRented());
        existingData.setTotalDrivers(existingData.getTotalDrivers() + inputData.getTotalDrivers());
        existingData.setDiscountUsed(existingData.getDiscountUsed() + inputData.getDiscountUsed());

        // Update available vehicles if input provides non-zero values
        existingData.setTotalMotorbikesAvailable(
            inputData.getTotalMotorbikesAvailable() > 0 ? 
            inputData.getTotalMotorbikesAvailable() : 
            existingData.getTotalMotorbikesAvailable()
        );
        existingData.setTotalCarsAvailable(
            inputData.getTotalCarsAvailable() > 0 ? 
            inputData.getTotalCarsAvailable() : 
            existingData.getTotalCarsAvailable()
        );

        // Update average fields
        existingData.setAverageRentalDuration(
            inputData.getAverageRentalDuration() > 0 ? 
            inputData.getAverageRentalDuration() : 
            existingData.getAverageRentalDuration()
        );
        existingData.setAverageRevenuePerRental(
            inputData.getAverageRevenuePerRental() > 0 ? 
            inputData.getAverageRevenuePerRental() : 
            existingData.getAverageRevenuePerRental()
        );

        return existingData;
    }

    private StatisticsData createNewStatistics(StatisticsData inputData, LocalDate today) {
        inputData.setStatDate(today);
        return inputData;
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        try {
            statisticsDataRepo.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting record");
        }
    }

    @GetMapping("/update/{field}")
    public ResponseEntity<String> incrementField(@PathVariable String field) {
        try {
            LocalDate today = LocalDate.now();
            StatisticsData dataToUpdate = statisticsDataRepo.findByStatDate(today)
                .orElseGet(() -> {
                    StatisticsData newData = new StatisticsData();
                    newData.setStatDate(today);
                    return newData;
                });

            switch (field) {
                case "totalCustomers":
                    dataToUpdate.setTotalCustomers(dataToUpdate.getTotalCustomers() + 1);
                    break;
                case "totalCarRentals":
                    dataToUpdate.setTotalCarRentals(dataToUpdate.getTotalCarRentals() + 1);
                    break;
                case "totalMotorbikeRentals":
                    dataToUpdate.setTotalMotorbikeRentals(dataToUpdate.getTotalMotorbikeRentals() + 1);
                    break;
                case "totalDrivers":
                    dataToUpdate.setTotalDrivers(dataToUpdate.getTotalDrivers() + 1);
                    break;
                case "discountUsed":
                    dataToUpdate.setDiscountUsed(dataToUpdate.getDiscountUsed() + 1);
                    break;
                case "totalNewCustomers":
                    dataToUpdate.setTotalNewCustomers(dataToUpdate.getTotalNewCustomers() + 1);
                    break;
                default:
                    return ResponseEntity.badRequest().body("Invalid field name");
            }

            statisticsDataRepo.save(dataToUpdate);
            return ResponseEntity.ok(field + " updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating " + field);
        }
    }
    
 // API để gọi phương thức cập nhật tổng doanh thu (hoặc các trường khác)
    @PatchMapping("/updateField")
    public ResponseEntity<String> incrementFieldB(@RequestParam String field, @RequestParam Double incrementValue) {
        try {
            LocalDate today = LocalDate.now();
            StatisticsData dataToUpdate = statisticsDataRepo.findByStatDate(today)
                .orElseGet(() -> {
                    StatisticsData newData = new StatisticsData();
                    newData.setStatDate(today);
                    return newData;
                });

            // Tùy chỉnh giá trị cập nhật dựa trên tham số 'field'
            switch (field) {
                case "totalRevenue":
                    dataToUpdate.setTotalRevenue(dataToUpdate.getTotalRevenue() + incrementValue);  // Thêm giá trị vào tổng doanh thu
                    break;
                case "averageRentalDuration":
                    dataToUpdate.setAverageRentalDuration(dataToUpdate.getTotalCarRentals() + incrementValue);  
                    break;
                case "averageRevenuePerRental":
                    dataToUpdate.setAverageRevenuePerRental(dataToUpdate.getAverageRentalDuration() + incrementValue);  
                case "discountUsed":
                    dataToUpdate.setDiscountUsed(dataToUpdate.getDiscountUsed() + incrementValue); 
                default:
                    return ResponseEntity.badRequest().body("Invalid field name");
            }

            statisticsDataRepo.save(dataToUpdate);
            return ResponseEntity.ok(field + " updated successfully by " + incrementValue);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating " + field);
        }
    }
}
