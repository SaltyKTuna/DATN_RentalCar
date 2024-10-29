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
import com.rentalcar.service.MotorbikeService;
import com.rentalcar.service.SessionService;

@Controller
public class DetailVehicleController {
	
	@Autowired
    private MotorbikeRepo motorbikeRepo;
	@Autowired
    private CarRepo carRepo;
	
	
	@Autowired
    private CarService carService;
	@Autowired
    private MotorbikeService motorbikeService;

	@GetMapping("/car/detail/{id}")
    public String getCarById(@PathVariable Long id, Model model) {
        Optional<Car> car = carService.findById(id);

        if (car.isPresent()) {
            model.addAttribute("car", car.get());  // Truyền đối tượng car vào model
        } else {
            // Xử lý lỗi khi không tìm thấy xe
            model.addAttribute("error", "Không tìm thấy xe với ID này");
            return "error-page";  // Trả về trang lỗi
        }

        return "car-details2";  // Trả về trang chi tiết xe
    }
	

	@GetMapping("/motorbike/detail/{id}")
    public String getMotobikeById(@PathVariable Long id, Model model) {
        Optional<Motorbike> motorbike = motorbikeRepo.findById(id);

        if (motorbike.isPresent()) {
        	model.addAttribute("motorbike", motorbike.get());
        } else {
            // Xử lý lỗi khi không tìm thấy xe
            model.addAttribute("error", "Không tìm thấy xe với ID này");
            return "error-page";  // Trả về trang lỗi
        }

        return "car-details2";  // Trả về trang chi tiết xe
    }
}

