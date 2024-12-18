package com.rentalcar.entity;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(nullable = false, length = 255, columnDefinition = "NVARCHAR(255)")
    private String fullName;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(length = 20)
    private String phoneNumber;

    @Column(nullable = false, unique = true, length = 100, columnDefinition = "NVARCHAR(255)")
    private String username;

    @Column(nullable = false, length = 255)
    private String passwordHash;

    @ManyToMany(fetch = FetchType.EAGER) // Thay đổi từ ManyToOne sang ManyToMany
    //@JsonBackReference
    @JoinTable(
        name = "account_roles", // Tên bảng trung gian
        joinColumns = @JoinColumn(name = "account_id"), // Khóa ngoại của bảng Accounts
        inverseJoinColumns = @JoinColumn(name = "role_id") // Khóa ngoại của bảng Roles
    )
    @JsonIgnore
    private List<Role> roles; // Danh sách các vai trò

    @Column(length = 255, columnDefinition = "NVARCHAR(255)")
    private String address;
    
    private Date dateOfBirth;
    
    @Column(columnDefinition = "NVARCHAR(2000)", length = 2000)
    private String imageUrl;
    
    @OneToMany(mappedBy = "account")
    private Set<Rental> rental;
    
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private DrivingLicense drivingLicense;
    
//    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<DrivingLicense> DrivingLicense;

    @Override
    public String toString() {
        return "Account{" +
                "accountId=" + accountId +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    // Getters and Setters
}
