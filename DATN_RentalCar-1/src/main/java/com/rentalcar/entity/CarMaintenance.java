package com.rentalcar.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "CarMaintenance")
public class CarMaintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long maintenanceId;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "carId")
    private Car car;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "motorbikeId")
    private Motorbike motorbike;

    @Column(nullable = false)
    private Date maintenanceDate;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal cost;

    // Getters and Setters
}

