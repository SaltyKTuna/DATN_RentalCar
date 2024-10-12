package com.rentalcar.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.rentalcar.service.SessionService;

@Service // Ensure this annotation is present
public class SessionServiceImpl implements SessionService {
	@Autowired
	private HttpServletRequest request; // Inject HttpServletRequest
	
	@Override
	public <T> T get(String name) {
		HttpSession session = request.getSession(); // Obtain HttpSession from request
		return (T) session.getAttribute(name);
	}

	@Override
	public <T> T getValue(String name, T defaultValue) {
		T value = this.get(name);
		return value != null ? value : defaultValue;
	}

	@Override
	public void set(String name, Object value) {
		HttpSession session = request.getSession(); // Obtain HttpSession from request
		session.setAttribute(name, value);
	}

	@Override
	public void remove(String name) {
		HttpSession session = request.getSession(); // Obtain HttpSession from request
		session.removeAttribute(name);
	}

	@Override
	public boolean validateToken(String token) {
		return "valid_token".equals(token);
	}
}
