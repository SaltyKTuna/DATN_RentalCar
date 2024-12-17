package com.rentalcar.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rentalcar.apiController.StatisticsDataController;
import com.rentalcar.dao.AccountRepo;
import com.rentalcar.dao.RoleRepo;
import com.rentalcar.dao.StatisticsDataRepo;
import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;
import com.rentalcar.service.StatisticsService;
import com.rentalcar.service.impl.StatisticsServiceImpl;
import com.rentalcar.entity.StatisticsData;

@Controller
@RequestMapping(value = "/register")
public class RegisterController {
	@Autowired 
    private AccountRepo accRepo;
    
    @Autowired
    private RoleRepo roleRepo;
    
    @Autowired
    private StatisticsService statisticsService;
    @Autowired
    private StatisticsDataController statisticsController;
    
    @GetMapping
    public String registerPage(Model model) {
        model.addAttribute("account", new Account()); // Tạo một đối tượng Account rỗng
        return "rigister"; // Trả về tên trang HTML
    }
    
    @PostMapping
    public String register(Model model, Account account) {
    	// Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    	System.out.println("Phone number being checked: " + account.getPhoneNumber());
    	if (accRepo.findByPhoneNumber(account.getPhoneNumber()) != null) {
    	    model.addAttribute("SDTError", "Số điện thoại này đã tồn tại!");
    	    model.addAttribute("account", account); // Giữ lại dữ liệu người dùng nhập
    	    return "rigister"; // Trả về trang đăng ký với thông báo lỗi
    	}
    	// Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
        if (accRepo.findByEmail(account.getEmail()) != null) {
            model.addAttribute("EmailError", "Email này đã tồn tại!");
            model.addAttribute("account", account); // Giữ lại dữ liệu người dùng nhập
            return "rigister"; // Trả về trang đăng ký với thông báo lỗi
        }
        if (accRepo.findByUsername(account.getUsername()) != null) {
    	    model.addAttribute("error", "Tên tài khoản đã tồn tại!");
    	    model.addAttribute("account", account); // Giữ lại dữ liệu người dùng nhập
    	    return "rigister"; // Trả về trang đăng ký với thông báo lỗi
    	}
    	// Kiểm tra định dạng email
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@[a-zA0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
        if (!account.getEmail().matches(emailRegex)) {
            model.addAttribute("error", "Email không đúng định dạng!");
            model.addAttribute("account", account); // Đảm bảo giữ lại dữ liệu người dùng nhập
            return "rigister"; // Trả về trang đăng ký với thông báo lỗi
        }

        // Kiểm tra định dạng số điện thoại
        String phoneRegex = "^0[0-9]{9}$";
        if (!account.getPhoneNumber().matches(phoneRegex)) {
            model.addAttribute("error", "Số điện thoại chỉ được chứa số tối đa 10 số và bắt đầu bằng số 0");
            model.addAttribute("account", account); // Đảm bảo giữ lại dữ liệu người dùng nhập
            return "rigister"; // Trả về trang đăng ký với thông báo lỗi
        }
        
        
        // Kiểm tra mật khẩu không chứa ký tự đặc biệt
        String password = account.getPasswordHash();
        String passwordRegex = "^[a-zA-Z0-9]+$";  // Chỉ cho phép chữ cái và số
        if (password.length() < 3) {
            model.addAttribute("error", "Mật khẩu phải chứa ít nhất 3 ký tự!");
            return "rigister";  // Đảm bảo "register" khớp với tên của tệp register.html
        }
        else if (!password.matches(passwordRegex)) {
            model.addAttribute("error", "Mật khẩu không được chứa ký tự đặc biệt!");
            model.addAttribute("account", account); // Đảm bảo giữ lại dữ liệu người dùng nhập
            return "rigister"; // Trả về trang đăng ký với thông báo lỗi
        }

        account.setDateOfBirth(new Date());
        
        // Lấy Role từ cơ sở dữ liệu
        Long roleID = 2L; // ID của Role bạn muốn gán
        Role role = roleRepo.findById(roleID)
            .orElseThrow(() -> new RuntimeException("Role not found")); // Kiểm tra nếu Role không tồn tại

        // Thêm Role vào danh sách roles của account
        List<Role> roles = new ArrayList<>();
        roles.add(role);
        account.setRoles(roles); // Thiết lập vai trò cho tài khoản

        // Lưu thông tin tài khoản mới
        accRepo.save(account);
        
        //thêm số lượng đăng ký mới vào thống kê
        statisticsController.incrementField("totalNewCustomers");

     // Thêm thông báo thành công
        model.addAttribute("success", "Đăng ký thành công! Vui lòng đăng nhập.");
        // Chuyển hướng đến trang đăng nhập hoặc trang khác sau khi đăng ký thành công
        return "redirect:/login"; // Hoặc trang mà bạn muốn người dùng đến sau khi đăng ký
    }

}
