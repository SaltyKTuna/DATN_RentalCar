package com.rentalcar.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rentalcar.entity.Account;
import com.rentalcar.entity.Role;
import com.rentalcar.service.AccountService;
import com.rentalcar.service.SessionService;

@Controller
@RequestMapping(value = "/login")
public class LoginController {
    
    @Autowired
    private AccountService accountService;
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
        Account account = accountService.findByEmail(email);  // Gọi accountService

        if (account == null) {  // Kiểm tra tài khoản không tồn tại
            model.addAttribute("error", "Tài khoản không tồn tại");
            return "login"; // Hiển thị lại trang đăng nhập kèm thông báo lỗi
        }
        
        if (account != null && account.getPasswordHash().equals(password)) {  // Nên thay thế bằng cơ chế mã hóa mật khẩu như BCrypt
            session.set("user", account);  // Lưu thông tin người dùng vào session
            
            Account loggedAcc = session.get("user");
            System.out.println("User from session: " + loggedAcc.getUsername());
            
            // Kiểm tra vai trò người dùng và chuyển hướng tương ứng
            if (this.checkAdmin(account)) {
                session.set("userAdmin", this.checkAdmin(account) ? "admin" : "staff");  // Lưu vai trò vào session
                return "redirect:http://localhost:5173/";  // Redirect đến trang 5173 nếu là admin hoặc staff
            } else {
                session.set("userAdmin", "customer");
                return "redirect:http://localhost:8080";  // Redirect về localhost:8080 nếu không phải admin hoặc staff
            }
        } else {
            model.addAttribute("error", "Email hoặc mật khẩu không hợp lệ");
            return "login"; // Hiển thị lại trang đăng nhập kèm thông báo lỗi
        }
    }

    

 // Phương thức xử lý login cho nextjs
    @PostMapping(value = "/nextjs",consumes = "application/x-www-form-urlencoded", produces = "application/json")
    @ResponseBody
    public Map<String, Object> login(@RequestParam("email") String email,
                                     @RequestParam("password") String password) {

        Map<String, Object> response = new HashMap<>();
        Account account = accountService.findByEmail(email);

        if (account != null && account.getPasswordHash().equals(password)) {
            session.set("user", account);
            if (checkAdmin(account)) {
                session.set("userAdmin", "admin");
            } else {
                session.set("userAdmin", "customer");
            }

            // Trả về thông báo đăng nhập thành công
            response.put("status", "success");
            response.put("message", "Login successful");
            response.put("redirectUrl", "/home"); // URL để điều hướng
        } else {
            response.put("status", "error");
            response.put("message", "Email hoặc mật khẩu không hợp lệ");
        }

        return response;  // Trả về Map dưới dạng JSON
    }


    
    public Boolean checkAdmin(Account account) { // Hàm để Check admin
        for (Role roleDetail : account.getRoles()) {
            if (roleDetail.getRoleName().equals("staff") || roleDetail.getRoleName().equals("admin")) {
                return true;
            }
        }
        return false;
    }
    
}
