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

import com.rentalcar.dao.AccountRepo;
import com.rentalcar.dao.RoleRepo;
import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;

@Controller
@RequestMapping(value = "/register")
public class RegisterController {
	@Autowired 
    private AccountRepo accRepo;
    
    @Autowired
    private RoleRepo roleRepo;
    
    List<Role> roles = new ArrayList<>();

    @GetMapping
    public String registerPage(Model model) {
        model.addAttribute("account", new Account()); // Tạo một đối tượng Account rỗng
        return "rigister"; // Trả về tên trang HTML
    }
    
    @PostMapping
    public String register(Model model, Account account) {
    	account.setDateOfBirth(new Date());
    	account.setPhoneNumber("");
    	
    	// Lấy Role từ cơ sở dữ liệu
    	Long roleID = 2L; // ID của Role bạn muốn gán
    	Role role = roleRepo.findById(roleID)
    	    .orElseThrow(() -> new RuntimeException("Role not found")); // Kiểm tra nếu Role không tồn tại

    	account.setRoles(roles);
    	System.out.println("role: "+role);
    	
        // Lưu thông tin tài khoản mới
        accRepo.save(account);

        // Chuyển hướng đến trang đăng nhập hoặc trang khác sau khi đăng ký thành công
        return "redirect:/login"; // Hoặc trang mà bạn muốn người dùng đến sau khi đăng ký
    }
}
