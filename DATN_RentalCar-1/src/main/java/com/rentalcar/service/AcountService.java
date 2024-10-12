package com.rentalcar.service;

import com.rentalcar.entity.Account;

public interface AcountService {

	Account findByEmail(String email);

	Account findByUsername(String username);

}
