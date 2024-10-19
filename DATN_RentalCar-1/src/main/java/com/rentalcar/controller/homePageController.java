package com.rentalcar.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;
import com.rentalcar.dao.CarRepo;
import com.rentalcar.dao.MotorbikeRepo;
import com.rentalcar.entity.Car;
import com.rentalcar.entity.Motorbike;
import com.rentalcar.service.SessionService;


@Controller
@RequestMapping(value = {"Rental-Car" , "/" , "/home"})
public class homePageController {
	
	@Autowired
    private MotorbikeRepo motorbikeRepo;
	@Autowired
    private CarRepo carRepo;
	@Autowired
    private SessionService session;

    // Phương thức để lấy danh sách xe và hiển thị trong Thymeleaf template
    @GetMapping()
    public String viewAll(Model model) {
    	
        List<Car> cars = carRepo.findAll();
        List<Motorbike> motorbikes = motorbikeRepo.findAll();
        
        model.addAttribute("cars", cars);      
        model.addAttribute("motorbikes", motorbikes);
        
        return "index2";
    }
    
    @GetMapping("/about")
    public String about() {
        return "about";
    } 	
    
    @GetMapping("/pick-vehicle")
    public String viewAllVehicle(Model model) {
    	
        List<Car> cars = carRepo.findAll();
        List<Motorbike> motorbikes = motorbikeRepo.findAll();
        
        model.addAttribute("cars", cars);      
        model.addAttribute("motorbikes", motorbikes);
        
        return "pick-vehicle2";
    }
    
    @RequestMapping("/logout")
	public String logoutSuccess(Model model) {
		session.remove("user");
		session.remove("userAdmin");
		session.remove("security-uri");
		session.remove("uri");
		model.addAttribute("message", "Đăng xuất thành công");
		return "login";
	}

}

