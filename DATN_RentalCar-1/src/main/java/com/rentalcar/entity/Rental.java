package com.rentalcar.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime; // Sử dụng LocalDateTime
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Rentals")
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rentalId;

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    //@JsonIgnore
    private Account account;

    @Column(nullable = false)
    private LocalDateTime rentalDate; // Đổi sang LocalDateTime

    @Column(nullable = false)
    private LocalDateTime returnDate; // Đổi sang LocalDateTime

    private LocalDateTime actualReturnDate; // Đổi sang LocalDateTime

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalCost;

    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)")
    private String renStatus;

   
    @ManyToOne
    @JoinColumn(name = "discountId" , nullable =  true)
    //@JsonIgnore
    private Discount discount;

    @Column(nullable = false)
    private Boolean haveDriver;

    @Column(length = 255, columnDefinition = "NVARCHAR(255)")
    private String rentalLocations;
    
    @Column(length = 255, columnDefinition = "NVARCHAR(255)")
    private String notes;
    
    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RentalVehicle> rentalVehicle;
    
    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Payment> payment;
    
    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Feedback> Feedback;
    
    
    
}
