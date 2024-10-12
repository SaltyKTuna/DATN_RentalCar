package com.rentalcar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rentalcar.service.SessionService;

@RestController
public class TestController {

    @Autowired
    private SessionService sessionService;

    @GetMapping("/test-session")
    public String testSession() {
        sessionService.set("testKey", "testValue");
        String value = sessionService.get("testKey");
        return "Session value for 'testKey': " + value;
    }
}
