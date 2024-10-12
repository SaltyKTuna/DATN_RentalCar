package com.rentalcar.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.rentalcar.dao.PaymentRepo;
import com.rentalcar.entity.Payment;
import com.rentalcar.service.PaymentService;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepo paymentRepo;

	/**
	 * @param <S>
	 * @param entity
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#save(java.lang.Object)
	 */
	public <S extends Payment> S save(S entity) {
		return paymentRepo.save(entity);
	}

	/**
	 * @param sort
	 * @return
	 * @see org.springframework.data.repository.ListPagingAndSortingRepository#findAll(org.springframework.data.domain.Sort)
	 */
	public List<Payment> findAll(Sort sort) {
		return paymentRepo.findAll(sort);
	}

	/**
	 * 
	 * @see org.springframework.data.jpa.repository.JpaRepository#flush()
	 */
	public void flush() {
		paymentRepo.flush();
	}

	/**
	 * @param pageable
	 * @return
	 * @see org.springframework.data.repository.PagingAndSortingRepository#findAll(org.springframework.data.domain.Pageable)
	 */
	public Page<Payment> findAll(Pageable pageable) {
		return paymentRepo.findAll(pageable);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#findAll()
	 */
	public List<Payment> findAll() {
		return paymentRepo.findAll();
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#findById(java.lang.Object)
	 */
	public Optional<Payment> findById(Long id) {
		return paymentRepo.findById(id);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#existsById(java.lang.Object)
	 */
	public boolean existsById(Long id) {
		return paymentRepo.existsById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getOne(java.lang.Object)
	 */
	public Payment getOne(Long id) {
		return paymentRepo.getOne(id);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#count()
	 */
	public long count() {
		return paymentRepo.count();
	}

	/**
	 * @param id
	 * @see org.springframework.data.repository.CrudRepository#deleteById(java.lang.Object)
	 */
	public void deleteById(Long id) {
		paymentRepo.deleteById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getById(java.lang.Object)
	 */
	public Payment getById(Long id) {
		return paymentRepo.getById(id);
	}

	/**
	 * @param entity
	 * @see org.springframework.data.repository.CrudRepository#delete(java.lang.Object)
	 */
	public void delete(Payment entity) {
		paymentRepo.delete(entity);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.jpa.repository.JpaRepository#getReferenceById(java.lang.Object)
	 */
	public Payment getReferenceById(Long id) {
		return paymentRepo.getReferenceById(id);
	}

	/**
	 * 
	 * @see org.springframework.data.repository.CrudRepository#deleteAll()
	 */
	public void deleteAll() {
		paymentRepo.deleteAll();
	}
    
    
}

