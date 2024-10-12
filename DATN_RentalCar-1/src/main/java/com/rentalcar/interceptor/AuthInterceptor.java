package com.rentalcar.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.rentalcar.entity.Account;
import com.rentalcar.service.SessionService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class AuthInterceptor implements HandlerInterceptor {
	@Autowired
	SessionService session;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
		Account account = session.get("user");
		if (account != null) {
			request.setAttribute("user", account);
		}

		return true;
	}

}
