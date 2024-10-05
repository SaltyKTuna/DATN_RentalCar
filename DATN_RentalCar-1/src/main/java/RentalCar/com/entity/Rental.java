package RentalCar.com.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

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
    private Date rentalDate;

    @Column(nullable = false)
    private Date returnDate;

    private Date actualReturnDate;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalCost;

    @Column(nullable = false, length = 50)
    private String renStatus;

    @ManyToOne
    @JoinColumn(name = "discountId")
    //@JsonIgnore
    private Discount discount;

    @Column(nullable = false)
    private Boolean haveDriver;

    // Getters and Setters
}

