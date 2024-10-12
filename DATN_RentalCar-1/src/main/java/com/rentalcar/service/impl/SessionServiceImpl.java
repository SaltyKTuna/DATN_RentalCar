package com.rentalcar.service.impl;

<<<<<<< HEAD
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
=======
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> sơn
import org.springframework.stereotype.Service;

import com.rentalcar.service.SessionService;

<<<<<<< HEAD
@Service // Ensure this annotation is present
public class SessionServiceImpl implements SessionService {
	@Autowired
	private HttpServletRequest request; // Inject HttpServletRequest
	
	@Override
	public <T> T get(String name) {
		HttpSession session = request.getSession(); // Obtain HttpSession from request
=======
import jakarta.servlet.http.HttpSession;

@Service
public class SessionServiceImpl implements SessionService{
	@Autowired HttpSession session;

	@Override
	public <T> T get(String name) {
		// TODO Auto-generated method stub
>>>>>>> sơn
		return (T) session.getAttribute(name);
	}

	@Override
	public <T> T getValue(String name, T defaultValue) {
		T value = this.get(name);
		return value != null ? value : defaultValue;
	}
<<<<<<< HEAD

	@Override
	public void set(String name, Object value) {
		HttpSession session = request.getSession(); // Obtain HttpSession from request
=======
	@Override
	public void set(String name, Object value) {
		// TODO Auto-generated method stub
>>>>>>> sơn
		session.setAttribute(name, value);
	}

	@Override
	public void remove(String name) {
<<<<<<< HEAD
		HttpSession session = request.getSession(); // Obtain HttpSession from request
		session.removeAttribute(name);
	}

	@Override
	public boolean validateToken(String token) {
		return "valid_token".equals(token);
	}
=======
		// TODO Auto-generated method stub
		session.removeAttribute(name);
	}

>>>>>>> sơn
}
