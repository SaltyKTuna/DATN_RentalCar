package RentalCar.com.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import RentalCar.com.dao.MotorbikeRepo;
import RentalCar.com.entity.Motorbike;
import RentalCar.com.service.MotorbikeService;
import RentalCar.com.service.MotorbikeService;

@Service
public class MotorbikeServiceImpl implements MotorbikeService{
	@Autowired MotorbikeRepo motorbikeRepo;

	/**
	 * @param <S>
	 * @param entity
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#save(java.lang.Object)
	 */
	public <S extends Motorbike> S save(S entity) {
		return motorbikeRepo.save(entity);
	}

	/**
	 * @param sort
	 * @return
	 * @see org.springframework.data.repository.ListPagingAndSortingRepository#findAll(org.springframework.data.domain.Sort)
	 */
	public List<Motorbike> findAll(Sort sort) {
		return motorbikeRepo.findAll(sort);
	}

	/**
	 * 
	 * @see org.springframework.data.jpa.repository.JpaRepository#flush()
	 */
	public void flush() {
		motorbikeRepo.flush();
	}

	/**
	 * @param pageable
	 * @return
	 * @see org.springframework.data.repository.PagingAndSortingRepository#findAll(org.springframework.data.domain.Pageable)
	 */
	public Page<Motorbike> findAll(Pageable pageable) {
		return motorbikeRepo.findAll(pageable);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#findAll()
	 */
	public List<Motorbike> findAll() {
		return motorbikeRepo.findAll();
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#findById(java.lang.Object)
	 */
	public Optional<Motorbike> findById(Long id) {
		return motorbikeRepo.findById(id);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#existsById(java.lang.Object)
	 */
	public boolean existsById(Long id) {
		return motorbikeRepo.existsById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getOne(java.lang.Object)
	 */
	public Motorbike getOne(Long id) {
		return motorbikeRepo.getOne(id);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#count()
	 */
	public long count() {
		return motorbikeRepo.count();
	}

	/**
	 * @param id
	 * @see org.springframework.data.repository.CrudRepository#deleteById(java.lang.Object)
	 */
	public void deleteById(Long id) {
		motorbikeRepo.deleteById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getById(java.lang.Object)
	 */
	public Motorbike getById(Long id) {
		return motorbikeRepo.getById(id);
	}

	/**
	 * @param entity
	 * @see org.springframework.data.repository.CrudRepository#delete(java.lang.Object)
	 */
	public void delete(Motorbike entity) {
		motorbikeRepo.delete(entity);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.jpa.repository.JpaRepository#getReferenceById(java.lang.Object)
	 */
	public Motorbike getReferenceById(Long id) {
		return motorbikeRepo.getReferenceById(id);
	}

	/**
	 * 
	 * @see org.springframework.data.repository.CrudRepository#deleteAll()
	 */
	public void deleteAll() {
		motorbikeRepo.deleteAll();
	}
	
	

//	public <S extends Motorbike> S save(S entity) {
//		return motobikeRepo.save(entity);
//	}
//
//	public List<Motorbike> findAll() {
//		return motobikeRepo.findAll();
//	}
//
//	public Optional<Motorbike> findById(Long id) {
//		return motobikeRepo.findById(id);
//	}
//
//	public boolean existsById(Long id) {
//		return motobikeRepo.existsById(id);
//	}
//
//	public long count() {
//		return motobikeRepo.count();
//	}
//
//	public void deleteById(Long id) {
//		motobikeRepo.deleteById(id);
//	}
	
	
}
