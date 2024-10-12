package com.rentalcar.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.rentalcar.dao.AdditionalFeeRepo;
import com.rentalcar.entity.AdditionalFee;
import com.rentalcar.service.AdditionalFeeService;

import java.util.List;
import java.util.Optional;

@Service
public class AdditionalfeeServiceImpl implements AdditionalFeeService {

    @Autowired
    private AdditionalFeeRepo additionalFeeRepo;

	/**
	 * @param <S>
	 * @param entity
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#save(java.lang.Object)
	 */
	public <S extends AdditionalFee> S save(S entity) {
		return additionalFeeRepo.save(entity);
	}

	/**
	 * @param <S>
	 * @param example
	 * @return
	 * @see org.springframework.data.repository.query.QueryByExampleExecutor#findOne(org.springframework.data.domain.Example)
	 */
	public <S extends AdditionalFee> Optional<S> findOne(Example<S> example) {
		return additionalFeeRepo.findOne(example);
	}

	/**
	 * @param sort
	 * @return
	 * @see org.springframework.data.repository.ListPagingAndSortingRepository#findAll(org.springframework.data.domain.Sort)
	 */
	public List<AdditionalFee> findAll(Sort sort) {
		return additionalFeeRepo.findAll(sort);
	}

	/**
	 * @param pageable
	 * @return
	 * @see org.springframework.data.repository.PagingAndSortingRepository#findAll(org.springframework.data.domain.Pageable)
	 */
	public Page<AdditionalFee> findAll(Pageable pageable) {
		return additionalFeeRepo.findAll(pageable);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#findAll()
	 */
	public List<AdditionalFee> findAll() {
		return additionalFeeRepo.findAll();
	}

	/**
	 * @param ids
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#findAllById(java.lang.Iterable)
	 */
	public List<AdditionalFee> findAllById(Iterable<Long> ids) {
		return additionalFeeRepo.findAllById(ids);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#findById(java.lang.Object)
	 */
	public Optional<AdditionalFee> findById(Long id) {
		return additionalFeeRepo.findById(id);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#existsById(java.lang.Object)
	 */
	public boolean existsById(Long id) {
		return additionalFeeRepo.existsById(id);
	}

	/**
	 * @param <S>
	 * @param example
	 * @return
	 * @see org.springframework.data.repository.query.QueryByExampleExecutor#exists(org.springframework.data.domain.Example)
	 */
	public <S extends AdditionalFee> boolean exists(Example<S> example) {
		return additionalFeeRepo.exists(example);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getOne(java.lang.Object)
	 */
	public AdditionalFee getOne(Long id) {
		return additionalFeeRepo.getOne(id);
	}

	/**
	 * @param id
	 * @see org.springframework.data.repository.CrudRepository#deleteById(java.lang.Object)
	 */
	public void deleteById(Long id) {
		additionalFeeRepo.deleteById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getById(java.lang.Object)
	 */
	public AdditionalFee getById(Long id) {
		return additionalFeeRepo.getById(id);
	}

	/**
	 * @param entity
	 * @see org.springframework.data.repository.CrudRepository#delete(java.lang.Object)
	 */
	public void delete(AdditionalFee entity) {
		additionalFeeRepo.delete(entity);
	}

	/**
	 * 
	 * @see org.springframework.data.repository.CrudRepository#deleteAll()
	 */
	public void deleteAll() {
		additionalFeeRepo.deleteAll();
	}

}

