package RentalCar.com.entity;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.*;

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

    @Column(nullable = false, length = 100)
    private String condition;

    @Column(nullable = false, length = 255)
    private String vehicleLocation;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false, length = 20)
    private String licensePlate;

    @Column(length = 100)
    private String color;

    @Column(nullable = false)
    private Integer mileage;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal dailyRate;

    @Column(length = 255)
    private String imageUrl;

    @Column(nullable = false)
    private Integer seats;

    @Column(nullable = false, length = 50)
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

// // Relationships
//    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL)
//    private List<ServicePricing> servicePricingList;
//    // Getters and Setters
}

