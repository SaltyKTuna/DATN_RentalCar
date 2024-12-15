package com.rentalcar.entity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    @Column(nullable = false, length = 100)
    private String make;

    @Column(nullable = false, length = 100)
    private String model;

    @Column(nullable = false, length = 100, columnDefinition = "NVARCHAR(100)")
    private String condition;

    @Column(nullable = false, length = 255, columnDefinition = "NVARCHAR(255)")
    private String vehicleLocation;

    @Column(nullable = false)
    private Integer year;
    
    @Column(nullable = true, length = 50, columnDefinition = "NVARCHAR(50)")
    private String gearBox;

    @Column(nullable = false, length = 20)
    private String licensePlate;

    @Column(length = 100)
    private String color;

    @Column(nullable = false)
    private Integer mileage;

    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)")
    private String status;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal dailyRate;

    @Column(length = 255, columnDefinition = "NVARCHAR(4000)")
    private String imageUrl;

    @Column(nullable = false)
    private Integer seats;

    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)")
    private String transmission;

    @Column(nullable = false)
    private Integer engineCapacity;

    @Column(nullable = false, length = 50)
    private String fuelType;

    @Column(nullable = false, precision = 4, scale = 1)
    private BigDecimal fuelConsumption;

    @Column(nullable = false, length = 255)
    private String detailCar;

    @Column(nullable = false, length = 255)
    private String facilities;
    
    @Min(0)
    private Integer rentals;

    @DecimalMin("0.00")
    @DecimalMax("100.00")
    @Column(precision = 5, scale = 2)
    private BigDecimal percentDiscount;
    
    private String carType;
    
    @OneToMany(mappedBy = "car")
    private Set<RentalVehicle> rentalVehicle;
    
    @ElementCollection
    @Column(length = 1000)
    private List<String> feedback;
    
}	

