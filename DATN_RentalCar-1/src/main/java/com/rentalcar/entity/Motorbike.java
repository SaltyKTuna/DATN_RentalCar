package com.rentalcar.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Motorbikes")
public class Motorbike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long motorbikeId;

    @Column(nullable = false, length = 100)
    private String make;

    @Column(nullable = false, length = 100)
    private String model;

    @Column(nullable = false, length = 100)
    private String condition;

    @Column(nullable = false, length = 255)
    private String vehicleLocation;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false, length = 20)
    private String licensePlate;
    
    @Column(nullable = true, length = 50)
    private String gearBox;

    @Column(length = 50)
    private String color;

    @Column(nullable = false)
    private Integer mileage;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal dailyRate;

    @Column(nullable = false)
    private Integer engineCapacity;

    @Column(nullable = false, length = 50)
    private String fuelType;

    @Column(nullable = false, precision = 4, scale = 1)
    private BigDecimal fuelConsumption;

    @Column(length = 255)
    private String imageUrl;

    @Column(nullable = false, length = 255)
    private String detailBike;

    @Column(nullable = false, length = 255)
    private String facilities;
    
    private Integer rentals;

    @OneToMany(mappedBy = "motorbike", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ServicePricing> servicePricingList;
    // Getters and Setters
}
