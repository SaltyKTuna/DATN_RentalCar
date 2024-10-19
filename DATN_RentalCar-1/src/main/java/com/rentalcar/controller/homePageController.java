package com.rentalcar.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;
import com.rentalcar.dao.CarRepo;
import com.rentalcar.dao.MotorbikeRepo;
import com.rentalcar.entity.Car;
import com.rentalcar.entity.Motorbike;
import com.rentalcar.service.CarService;
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
	
	@Autowired
    private CarService carService;

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

    @GetMapping("/car/{id}")
    public String getCarById(@PathVariable Long id, Model model) {
        Optional<Car> car = carService.findById(id);

        if (car.isPresent()) {
            model.addAttribute("car", car.get());  // truyền đối tượng car vào model
        } else {
            // Nếu không tìm thấy xe theo ID, bạn có thể xử lý một thông báo lỗi
            model.addAttribute("error", "Car not found");
        }

        return "car-details2"; // trả về trang hiển thị chi tiết xe
    }
}

