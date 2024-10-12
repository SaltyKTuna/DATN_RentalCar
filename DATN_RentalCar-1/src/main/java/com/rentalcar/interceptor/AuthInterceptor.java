package com.rentalcar.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;
import com.rentalcar.service.SessionService;

@Component
public class AuthInterceptor implements HandlerInterceptor{
	@Autowired
	SessionService session;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
		String uri = request.getRequestURI();
		Account account = session.get("user");
		String error = "";
		
		if(account == null) {
		    error = "Please Login";
		} else {
		    Role role = account.getRole();
		    if (role.getRoleName().equals("user") && uri.startsWith("/admin")) {
		        error = "Access Denied";
		    }
		}

		
		if(error.length() > 0) {
			session.set("security-uri", uri);
			response.sendRedirect("/login?message="+error);
			return false;
		}
		return true;
	}
}
