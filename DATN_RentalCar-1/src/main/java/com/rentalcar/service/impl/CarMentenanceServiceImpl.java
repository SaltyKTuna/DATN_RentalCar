package com.rentalcar.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.rentalcar.dao.CarMainternanceRepo;
import com.rentalcar.entity.CarMaintenance;
import com.rentalcar.service.CarMaintenanceService;

@Service
public class CarMentenanceServiceImpl implements CarMaintenanceService {

    @Autowired
    private CarMainternanceRepo carMainternanceRepo;

	/**
	 * @param <S>
	 * @param entity
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#save(java.lang.Object)
	 */
	public <S extends CarMaintenance> S save(S entity) {
		return carMainternanceRepo.save(entity);
	}

	/**
	 * @param sort
	 * @return
	 * @see org.springframework.data.repository.ListPagingAndSortingRepository#findAll(org.springframework.data.domain.Sort)
	 */
	public List<CarMaintenance> findAll(Sort sort) {
		return carMainternanceRepo.findAll(sort);
	}

	/**
	 * 
	 * @see org.springframework.data.jpa.repository.JpaRepository#flush()
	 */
	public void flush() {
		carMainternanceRepo.flush();
	}

	/**
	 * @param pageable
	 * @return
	 * @see org.springframework.data.repository.PagingAndSortingRepository#findAll(org.springframework.data.domain.Pageable)
	 */
	public Page<CarMaintenance> findAll(Pageable pageable) {
		return carMainternanceRepo.findAll(pageable);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#findAll()
	 */
	public List<CarMaintenance> findAll() {
		return carMainternanceRepo.findAll();
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#findById(java.lang.Object)
	 */
	public Optional<CarMaintenance> findById(Long id) {
		return carMainternanceRepo.findById(id);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#existsById(java.lang.Object)
	 */
	public boolean existsById(Long id) {
		return carMainternanceRepo.existsById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getOne(java.lang.Object)
	 */
	public CarMaintenance getOne(Long id) {
		return carMainternanceRepo.getOne(id);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#count()
	 */
	public long count() {
		return carMainternanceRepo.count();
	}

	/**
	 * @param id
	 * @see org.springframework.data.repository.CrudRepository#deleteById(java.lang.Object)
	 */
	public void deleteById(Long id) {
		carMainternanceRepo.deleteById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getById(java.lang.Object)
	 */
	public CarMaintenance getById(Long id) {
		return carMainternanceRepo.getById(id);
	}

	/**
	 * @param entity
	 * @see org.springframework.data.repository.CrudRepository#delete(java.lang.Object)
	 */
	public void delete(CarMaintenance entity) {
		carMainternanceRepo.delete(entity);
	}

	/**
	 * 
	 * @see org.springframework.data.repository.CrudRepository#deleteAll()
	 */
	public void deleteAll() {
		carMainternanceRepo.deleteAll();
	}

	
}

