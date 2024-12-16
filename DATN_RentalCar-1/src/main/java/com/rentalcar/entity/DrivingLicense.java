package com.rentalcar.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "DrivingLicenses")
public class DrivingLicense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long licenseId;

    @ManyToOne
    //@JsonIgnore
    @JsonBackReference
    @JoinColumn(name = "accountId", nullable = false)
    private Account account;

    @Column(nullable = false, length = 50)
    private String licenseNumber;

    private Date dateOfBirth;

    @Column(length = 255, columnDefinition = "NVARCHAR(255)")
    private String imageUrl;

    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)")
    private String licenseStatus;
    
   

    // Getters and Setters
}

