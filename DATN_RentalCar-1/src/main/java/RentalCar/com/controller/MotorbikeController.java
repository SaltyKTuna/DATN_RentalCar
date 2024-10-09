package RentalCar.com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import RentalCar.com.dao.MotorbikeRepo;
import RentalCar.com.entity.Motorbike;


@Controller
public class MotorbikeController {
	
	@Autowired
    private MotorbikeRepo motorbikeRepo;

    @GetMapping(value = "/motorbikes-react")
    public String motorbikesPage() {
        // Trả về trang chứa React component
        return "motorbikes-react";
    }
    
    @GetMapping(value = "/motorbikes-thymeleaf")
    public String motorbikesPage(Model model) {
        // Lấy danh sách xe máy từ cơ sở dữ liệu
        List<Motorbike> motorbikes = motorbikeRepo.findAll();
        // Đưa danh sách xe máy vào model để Thymeleaf render
        model.addAttribute("motorbikes", motorbikes);
        return "motorbikes-thymeleaf"; 
    }
    
    @GetMapping(value = "/motorbikes-thymeleaf-1")
    public String motorbikesPage1(Model model) {
        // Lấy danh sách xe máy từ cơ sở dữ liệu
        List<Motorbike> motorbikes = motorbikeRepo.findAll();
        // Đưa danh sách xe máy vào model để Thymeleaf render
        model.addAttribute("motorbikes", motorbikes);
        return "index2"; 
    }
}

