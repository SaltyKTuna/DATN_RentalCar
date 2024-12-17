package com.rentalcar.interceptor;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;

import com.rentalcar.apiController.StatisticsDataController;
import com.rentalcar.entity.Account;
import com.rentalcar.service.SessionService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    SessionService session;

    @Autowired
    private StatisticsDataController statisticsController;

    // Sử dụng Set để theo dõi các session đã được đếm
    private static final Set<String> trackedSessions = new HashSet<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        if (request != null) {
            // Lấy session ID để đảm bảo mỗi session chỉ được đếm một lần
            String sessionId = request.getSession().getId();

            Account account = session.get("user");
            if (account != null) {
                request.setAttribute("user", account);
                
                // Kiểm tra và đếm khách hàng nếu chưa được đếm
                if (!trackedSessions.contains(sessionId)) {
                    statisticsController.incrementField("totalCustomers");
                    trackedSessions.add(sessionId);
                }

                if (session.contains("anonymous")) {
                    System.out.println("Anonymous session delete: " + session.get("anonymous"));
                    session.remove("anonymous");
                }
            } else {
                if (!session.contains("anonymous")) {
                    session.set("anonymous", "anonymous-user");
                    System.out.println("Anonymous session created: " + session.get("anonymous"));
                    
                    // Kiểm tra và đếm khách hàng nếu chưa được đếm
                    if (!trackedSessions.contains(sessionId)) {
                        statisticsController.incrementField("totalCustomers");
                        trackedSessions.add(sessionId);
                    }
                }
            }
        }
        return true;
    }
}