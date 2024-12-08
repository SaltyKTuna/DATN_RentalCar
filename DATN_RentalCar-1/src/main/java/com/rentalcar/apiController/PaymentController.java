package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.PaymentRepo;
import com.rentalcar.entity.Payment;
import com.rentalcar.entity.RentalVehicle;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentRepo paymentRepo;

    // Tìm tất cả
    @GetMapping
    public ResponseEntity<List<Payment>> getAll() {
        List<Payment> payments = paymentRepo.findAll();
        if (payments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(payments);
    }

    // Tìm theo ID
    @GetMapping(value = "/{id}")
    public ResponseEntity<Payment> getById(@PathVariable("id") Long id) {
        Optional<Payment> payment = paymentRepo.findById(id);
        if (payment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(null);
        }
        return ResponseEntity.ok(payment.get());
    }
    
    @GetMapping(value ="/by-rental/{id}")
    public ResponseEntity<List<Payment>> getRentalByRentalId(@PathVariable Long id) {
        List<Payment> payments = paymentRepo.findByRental_RentalId(id);
        return ResponseEntity.ok(payments);
    }

    // Lưu
    @PostMapping
    public ResponseEntity<Payment> save(@RequestBody Payment payment) {
        try {
            Payment savedPayment = paymentRepo.save(payment);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPayment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null);
        }
    }

    // Cập nhật
    @PutMapping(value = "/{id}")
    public ResponseEntity<String> update(@PathVariable("id") Long id, @RequestBody Payment paymentDetail) {
        Optional<Payment> existingPayment = paymentRepo.findById(id);
        if (existingPayment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }

        Payment paymentUpdate = existingPayment.get();
        paymentUpdate.setAmount(paymentDetail.getAmount());
        paymentUpdate.setRental(paymentDetail.getRental());
        paymentUpdate.setPaymentDate(paymentDetail.getPaymentDate());
        paymentUpdate.setPaymentMethod(paymentDetail.getPaymentMethod());
        paymentUpdate.setNotes(paymentDetail.getNotes());
        paymentUpdate.setIdQrCode(paymentDetail.getIdQrCode());

        paymentRepo.save(paymentUpdate);
        return ResponseEntity.ok("Payment updated successfully");
    }

    // Xóa
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteById(@PathVariable("id") Long id) {
        if (!paymentRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }
        paymentRepo.deleteById(id);
        return ResponseEntity.ok("Payment deleted successfully");
    }
}
