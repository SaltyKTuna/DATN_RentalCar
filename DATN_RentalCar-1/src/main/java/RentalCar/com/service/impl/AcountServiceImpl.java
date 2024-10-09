package RentalCar.com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import RentalCar.com.dao.AccountRepo;
import RentalCar.com.entity.Account;
import RentalCar.com.service.AcountService;

import java.util.List;
import java.util.Optional;

@Service
public class AcountServiceImpl implements AcountService {

    @Autowired
    private AccountRepo accountRepo;

	/**
	 * @param <S>
	 * @param entity
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#save(java.lang.Object)
	 */
	public <S extends Account> S save(S entity) {
		return accountRepo.save(entity);
	}

	/**
	 * @param <S>
	 * @param entities
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#saveAll(java.lang.Iterable)
	 */
	public <S extends Account> List<S> saveAll(Iterable<S> entities) {
		return accountRepo.saveAll(entities);
	}

	/**
	 * @param sort
	 * @return
	 * @see org.springframework.data.repository.ListPagingAndSortingRepository#findAll(org.springframework.data.domain.Sort)
	 */
	public List<Account> findAll(Sort sort) {
		return accountRepo.findAll(sort);
	}

	/**
	 * @param pageable
	 * @return
	 * @see org.springframework.data.repository.PagingAndSortingRepository#findAll(org.springframework.data.domain.Pageable)
	 */
	public Page<Account> findAll(Pageable pageable) {
		return accountRepo.findAll(pageable);
	}

	/**
	 * @return
	 * @see org.springframework.data.repository.ListCrudRepository#findAll()
	 */
	public List<Account> findAll() {
		return accountRepo.findAll();
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#findById(java.lang.Object)
	 */
	public Optional<Account> findById(Long id) {
		return accountRepo.findById(id);
	}

	/**
	 * @param id
	 * @return
	 * @see org.springframework.data.repository.CrudRepository#existsById(java.lang.Object)
	 */
	public boolean existsById(Long id) {
		return accountRepo.existsById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getOne(java.lang.Object)
	 */
	public Account getOne(Long id) {
		return accountRepo.getOne(id);
	}

	/**
	 * @param id
	 * @see org.springframework.data.repository.CrudRepository#deleteById(java.lang.Object)
	 */
	public void deleteById(Long id) {
		accountRepo.deleteById(id);
	}

	/**
	 * @param id
	 * @return
	 * @deprecated
	 * @see org.springframework.data.jpa.repository.JpaRepository#getById(java.lang.Object)
	 */
	public Account getById(Long id) {
		return accountRepo.getById(id);
	}

	/**
	 * @param entity
	 * @see org.springframework.data.repository.CrudRepository#delete(java.lang.Object)
	 */
	public void delete(Account entity) {
		accountRepo.delete(entity);
	}

	/**
	 * 
	 * @see org.springframework.data.repository.CrudRepository#deleteAll()
	 */
	public void deleteAll() {
		accountRepo.deleteAll();
	}
}

