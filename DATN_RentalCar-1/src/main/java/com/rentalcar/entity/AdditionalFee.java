package com.rentalcar.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "AdditionalFees")
public class AdditionalFee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feeID;

    @Column(nullable = false, length = 50)
    private String feeType;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(length = 255)
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "rentalVehicleID", nullable = false)
    @JsonIgnore // Tránh vòng lặp khi serialize đối tượng
    //@JsonBackReference
    private RentalVehicle rentalVehicle;

}
