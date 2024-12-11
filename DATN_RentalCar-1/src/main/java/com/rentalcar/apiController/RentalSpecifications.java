package com.rentalcar.apiController;

import org.springframework.data.jpa.domain.Specification;

import com.rentalcar.entity.Rental;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RentalSpecifications {

    // Tìm theo Account ID
    public static Specification<Rental> hasAccountId(Long accountId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("account").get("accountId"), accountId);
    }

    // Tìm theo trạng thái rental
    public static Specification<Rental> hasRenStatus(String renStatus) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("renStatus"), "%" + renStatus + "%");
    }

    // Tìm theo ngày thuê
    public static Specification<Rental> rentalDateAfter(String rentalDateFrom) {
        LocalDateTime fromDate = LocalDateTime.parse(rentalDateFrom);
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("rentalDate"), fromDate);
    }

    public static Specification<Rental> rentalDateBefore(String rentalDateTo) {
        LocalDateTime toDate = LocalDateTime.parse(rentalDateTo);
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("rentalDate"), toDate);
    }

    // Tìm theo tên Account
    public static Specification<Rental> hasAccountName(String accountName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("account").get("fullName"), "%" + accountName + "%");
    }

    // Tìm theo số điện thoại Account
    public static Specification<Rental> hasAccountPhone(String accountPhone) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("account").get("phoneNumber"), "%" + accountPhone + "%");
    }

    // Tìm theo email Account
    public static Specification<Rental> hasAccountEmail(String accountEmail) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("account").get("email"), "%" + accountEmail + "%");
    }
}


