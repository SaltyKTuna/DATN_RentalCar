package RentalCar.com.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Damages")
public class Damage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long damageID;

    @ManyToOne
    @JoinColumn(name = "rentalVehicleID", nullable = false)
    private RentalVehicle rentalVehicle;

    @Column(nullable = false, length = 255)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal repairCost;

    @Column(nullable = false)
    private LocalDate damageDate;

    // Getters and Setters
}

