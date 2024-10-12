package com.rentalcar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rentalcar.entity.Account;
import com.rentalcar.service.AcountService;
import com.rentalcar.service.SessionService;

@Controller
@RequestMapping(value = "/login")
public class LoginController {
	
    @Autowired
    private AcountService acountService;
    @Autowired
    private SessionService session;

    // Phương thức GET để hiển thị trang đăng nhập
    @GetMapping
    public String showLoginPage() {
        return "login"; // Tên của file template đăng nhập (login.html hoặc login.jsp)
    }

    // Phương thức POST để xử lý đăng nhập
    @PostMapping
    public String login(@RequestParam("email") String email, @RequestParam("password") String password, Model model) {
        Account account = acountService.findByEmail(email);

        if (account != null && account.getPasswordHash().equals(password)) {
        	session.set("user", account);
        	
        	Account loggedAcc = session.get("user");
    		System.out.println("User from session: " +loggedAcc.getUsername());

            return "redirect:/home";  // Chuyển hướng đến trang home sau khi đăng nhập thành công
        } else {
            model.addAttribute("error", "Email hoặc mật khẩu không hợp lệ");
            return "login"; // Hiển thị lại trang đăng nhập kèm thông báo lỗi
        }
    }
}
