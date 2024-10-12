package com.rentalcar.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiger implements WebMvcConfigurer{
	 @Autowired private AuthInterceptor authInterceptor;

	    @Override
	    public void addInterceptors(InterceptorRegistry registry) {
	        registry.addInterceptor(authInterceptor)
	                .addPathPatterns("/**").excludePathPatterns("/login"); // Áp dụng cho tất cả các yêu cầu ngoại trừ /login
	    }
}
