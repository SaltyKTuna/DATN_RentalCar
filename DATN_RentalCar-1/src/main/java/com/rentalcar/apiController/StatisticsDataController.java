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

    @Autowired
    private StatisticsDataRepo statisticsDataService;

    @GetMapping
    public ResponseEntity<List<StatisticsData>> getAllStatistics() {
        try {
            return ResponseEntity.ok(statisticsDataService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<StatisticsData> createOrUpdateStatistics(@RequestBody StatisticsData inputData) {
        try {
            LocalDate today = LocalDate.now();
            
            Optional<StatisticsData> existingDataOptional = statisticsDataService.findByStatDate(today);
            
            StatisticsData dataToSave;
            if (existingDataOptional.isPresent()) {
                dataToSave = existingDataOptional.get();
                
                // Increment numeric fields
                dataToSave.setTotalMotorbikeRentals(
                    dataToSave.getTotalMotorbikeRentals() + inputData.getTotalMotorbikeRentals()
                );
                dataToSave.setTotalCarRentals(
                    dataToSave.getTotalCarRentals() + inputData.getTotalCarRentals()
                );
                dataToSave.setTotalRevenue(
                    dataToSave.getTotalRevenue() + inputData.getTotalRevenue()
                );
                dataToSave.setTotalCustomers(
                    dataToSave.getTotalCustomers() + inputData.getTotalCustomers()
                );
                dataToSave.setTotalNewCustomers(
                    dataToSave.getTotalNewCustomers() + inputData.getTotalNewCustomers()
                );
                dataToSave.setTotalVehiclesRented(
                    dataToSave.getTotalVehiclesRented() + inputData.getTotalVehiclesRented()
                );
                dataToSave.setTotalMotorbikesAvailable(
                    inputData.getTotalMotorbikesAvailable() > 0 ? 
                    inputData.getTotalMotorbikesAvailable() : 
                    dataToSave.getTotalMotorbikesAvailable()
                );
                dataToSave.setTotalCarsAvailable(
                    inputData.getTotalCarsAvailable() > 0 ? 
                    inputData.getTotalCarsAvailable() : 
                    dataToSave.getTotalCarsAvailable()
                );
                dataToSave.setTotalDrivers(
                    dataToSave.getTotalDrivers() + inputData.getTotalDrivers()
                );
                
                // Update average fields
                double currentAverageDuration = dataToSave.getAverageRentalDuration();
                double currentAverageRevenue = dataToSave.getAverageRevenuePerRental();
                
                dataToSave.setAverageRentalDuration(
                    inputData.getAverageRentalDuration() > 0 ? 
                    inputData.getAverageRentalDuration() : 
                    currentAverageDuration
                );
                
                dataToSave.setAverageRevenuePerRental(
                    inputData.getAverageRevenuePerRental() > 0 ? 
                    inputData.getAverageRevenuePerRental() : 
                    currentAverageRevenue
                );
                
                dataToSave.setDiscountUsed(
                    dataToSave.getDiscountUsed() + inputData.getDiscountUsed()
                );
            } else {
                // Create new record for today
                dataToSave = inputData;
                dataToSave.setStatDate(today);
            }
            
            // Save the record
            StatisticsData savedData = statisticsDataService.save(dataToSave);
            return ResponseEntity.ok(savedData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}