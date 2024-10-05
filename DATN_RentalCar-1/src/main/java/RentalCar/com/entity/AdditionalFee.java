package RentalCar.com.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "AdditionalFees")
public class AdditionalFee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feeID;

    @ManyToOne
    @JoinColumn(name = "rentalVehicleID", nullable = false)
    private RentalVehicle rentalVehicle;

    @Column(nullable = false, length = 50)
    private String feeType;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(length = 255)
    private String description;

    // Getters and Setters
}

