package com.rentalcar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextListener;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.rentalcar.interceptor.AuthInterceptor;
import com.rentalcar.service.SessionService;

@Configuration
public class WebConfigurer implements WebMvcConfigurer {
    @Autowired
    private AuthInterceptor authInterceptor;
    
    @Autowired
    private SessionService session;

    /**
     * Cấu hình đường dẫn cho tài nguyên tĩnh.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	registry.addResourceHandler("./static/**")
        .addResourceLocations("file:./assets/images/")
        .setCachePeriod(0);
    }

    /**
     * Cấu hình Interceptor cho các yêu cầu HTTP.
     */
    		
    @Bean
     public RequestContextListener requestContextListener() {
         return new RequestContextListener();
     }
    
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/**") // Áp dụng cho tất cả các URL
                .excludePathPatterns("/login", "/about", "/pick-vehicle", "/testReact"); // Ngoại trừ các đường dẫn này
    }

    /**
     * Cấu hình CORS để cho phép các yêu cầu từ các nguồn khác nhau.
     */
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Thêm các nguồn gốc (origins) được phép
        config.setAllowedOrigins(List.of(
            "http://localhost:3000", 
            "http://localhost:5173"
        ));
        
        // Các phương thức HTTP được phép
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        
        // Các header được phép
        config.setAllowedHeaders(List.of("*"));
        
        // Cho phép gửi cookie và thông tin xác thực
        config.setAllowCredentials(true);

        // Áp dụng cấu hình CORS cho tất cả các đường dẫn
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
