package com.rentalcar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(nullable = false, length = 255)
    private String fullName;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(length = 20)
    private String phoneNumber;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(nullable = false, length = 255)
    private String passwordHash;

//    @ManyToMany(fetch = FetchType.EAGER) // Many-to-Many relationship with Role
//    @JoinTable(
//        name = "account_roles", // Intermediate table name
//        joinColumns = @JoinColumn(name = "account_id"), // Foreign key of Account
//        inverseJoinColumns = @JoinColumn(name = "role_id") // Foreign key of Role
//    )
//    private List<Role> roles; // List of roles associated with this account
    
//    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    
    @ManyToMany(fetch = FetchType.EAGER )
    @JoinTable(
        name = "account_roles",
        joinColumns = @JoinColumn(name = "account_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles = new ArrayList();

    @Column(length = 255)
    private String address;

    private Date dateOfBirth;
}
