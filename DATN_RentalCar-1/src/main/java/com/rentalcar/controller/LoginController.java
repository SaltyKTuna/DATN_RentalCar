package com.rentalcar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rentalcar.service.SessionService;
import com.rentalcar.entity.Role;
import com.rentalcar.entity.Account;
import com.rentalcar.service.AcountService;
import com.rentalcar.service.RoleService;


@Controller
@RequestMapping(value = "/login")
public class LoginController {
	
    @Autowired
    private AcountService acountService;
    @Autowired
    private RoleService roleService;
    @Autowired
    SessionService session;

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
            return "redirect:/home";  // Chuyển hướng đến trang home sau khi đăng nhập thành công
        } else {
            model.addAttribute("error", "Invalid email or password");
            return "login"; // Hiển thị lại trang đăng nhập kèm thông báo lỗi
        }
    }
    
    @GetMapping("/api/secure-data")
    public String getSecureData() {
        return "This is a secure data endpoint!";
    }

    @GetMapping("/api/login")
    public String login() {
        return "Login endpoint!";
    }
    
    /////////////////////////////////
    
    @GetMapping("/login2")
	public String formLogin2(Model model, @RequestParam(value = "message", required = false) String message) {
		model.addAttribute("message", message);
		return "login";
	}
	
	@PostMapping("/login2")
	public String login2(@RequestParam("username") String username, @RequestParam("password") String password, Model model) {
		try {
			Account account = acountService.findByUsername(username);
			
			if(!account.getPasswordHash().equals(password)) {
				model.addAttribute("message", "Invalid password");
			}else {
				String uri = session.get("security-uri");
				session.set("user", account);
				model.addAttribute("message", "Login success");
			}
		} catch (Exception e) {
			// TODO: handle exception
			model.addAttribute("message", "Invalid username");
		}
		return "login";
	}

//	public Boolean checkAdmin(Account account) {
//		if (Role role : account.getRole()) {
//			if(role.getRole().equals("staff") || role.getRole().equals("director")) {
//				return true;
//			}
//		}
//		return false;
//	}
}
