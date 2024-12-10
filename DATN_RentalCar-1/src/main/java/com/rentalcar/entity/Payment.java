package com.rentalcar.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "rentalId")
    @OnDelete(action = OnDeleteAction.CASCADE) 
    private Rental rental;


    @Column(nullable = false)
    private LocalDate paymentDate;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)")
    private String paymentMethod; 
    
    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)")
    private String status; 
    
    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)" , name = "trans_id")
    private String transId; 
    
    @Column(length = 255, columnDefinition = "NVARCHAR(255)")
    private String notes; 
    
    @Column(length = 100, columnDefinition = "NVARCHAR(100)")
    private String idQrCode;
    
    private String paymentType ; 

}

