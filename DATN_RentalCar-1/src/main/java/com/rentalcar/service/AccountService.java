package com.rentalcar.service;

import com.rentalcar.entity.Account;

public interface AccountService {

	Account findByEmail(String email);

}
