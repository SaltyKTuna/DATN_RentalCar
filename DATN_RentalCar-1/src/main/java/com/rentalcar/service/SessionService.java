package com.rentalcar.service;

public interface SessionService {
	<T> T get(String name);
	
	<T> T getValue(String name, T defaultValue);

	void set(String name, Object value);

	void remove(String name);
	
	public boolean validateToken(String token);
}