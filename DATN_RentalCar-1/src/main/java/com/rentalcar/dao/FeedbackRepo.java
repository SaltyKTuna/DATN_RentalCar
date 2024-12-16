package com.rentalcar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rentalcar.dto.FeedbackInfo;
import com.rentalcar.entity.Feedback;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {

    @Query("SELECT new com.rentalcar.dto.FeedbackInfo(" +
           "a.accountId, a.username, a.email, rv.vehicleType, " +
           "rv.car.carId, rv.motorbike.motorbikeId, f.rating, f.comment, f.feedbackDate) " +
           "FROM Account a " +
           "JOIN Rental r ON a.accountId = r.account.accountId " +
           "JOIN RentalVehicle rv ON r.rentalId = rv.rental.rentalId " +
           "LEFT JOIN Feedback f ON r.rentalId = f.rental.rentalId " +
           "WHERE r.renStatus = :renStatus " + // Sử dụng @Param
           "AND rv.motorbike.motorbikeId = :motorbikeId")
    List<FeedbackInfo> getCompletedRentalsWithFeedbackMotorbike(
        @Param("motorbikeId") Long motorbikeId,
        @Param("renStatus") String renStatus
    );

    @Query("SELECT new com.rentalcar.dto.FeedbackInfo(" +
           "a.accountId, a.username, a.email, rv.vehicleType, " +
           "rv.car.carId, rv.motorbike.motorbikeId, f.rating, f.comment, f.feedbackDate) " +
           "FROM Account a " +
           "JOIN Rental r ON a.accountId = r.account.accountId " +
           "JOIN RentalVehicle rv ON r.rentalId = rv.rental.rentalId " +
           "LEFT JOIN Feedback f ON r.rentalId = f.rental.rentalId " +
           "WHERE r.renStatus = :renStatus " +
           "AND rv.car.carId = :carId")
    List<FeedbackInfo> getCompletedRentalsWithFeedbackCar(
        @Param("carId") Long carId,
        @Param("renStatus") String renStatus
    );

}

