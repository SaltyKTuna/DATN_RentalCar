package com.rentalcar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import com.rentalcar.entity.Discount;
import com.rentalcar.dao.DiscountRepo;
import com.rentalcar.dao.CarRepo;
import com.rentalcar.dao.MotorbikeRepo;
import com.rentalcar.dto.FeedbackInfo;
import com.rentalcar.entity.Car;
import com.rentalcar.entity.Motorbike;
import com.rentalcar.service.FeedbackService;

import com.rentalcar.entity.Account;
import com.rentalcar.service.AccountService;
import com.rentalcar.service.SessionService;


@Controller
public class DetailVehicleController {
	
	@Autowired
    private MotorbikeRepo motorbikeRepo;
	@Autowired
    private CarRepo carRepo;
	@Autowired
    private DiscountRepo discountRepo;
	@Autowired
	private FeedbackService feedbackService;
	@Autowired
    private AccountService accountService;
    @Autowired
    private SessionService session;
	
	
    @GetMapping("/car/detail/{id}")
    public String getCarById(@PathVariable Long id, Model model) {
        Optional<Car> car = carRepo.findById(id);
        List<Discount> discounts = discountRepo.findAll();

        if (car.isPresent()) {
            model.addAttribute("car", car.get());  // Truyền đối tượng car vào model
            model.addAttribute("discounts", discounts);

            // Lấy phản hồi dựa trên carId
            List<FeedbackInfo> feedbacks = feedbackService.getCompletedRentalsWithFeedbackCar(id);  // Truyền carId
            System.out.println("--------------------------------------" + feedbacks);
            model.addAttribute("feedbacks", feedbacks);

            // Tính tổng rating và giá trị trung bình
            double totalRating = feedbacks.stream()
                                          .mapToDouble(FeedbackInfo::getRating)  // Giả sử FeedbackInfo có phương thức getRating
                                          .sum();
            double averageRating = feedbacks.isEmpty() ? 0 : totalRating / feedbacks.size();
            System.out.println("--------------------------------------" + averageRating);
            
            // Thêm giá trị vào model
            model.addAttribute("averageRating", averageRating);
            model.addAttribute("totalFeedbacks", feedbacks.size());  // Thêm tổng số feedbacks vào model nếu cần
            
            // Lấy vehicleLocation
            String vehicleLocation = car.get().getVehicleLocation();
            
            // Trích xuất và định dạng vehicleLocation
            String formattedLocation = formatVehicleLocation(vehicleLocation);
            model.addAttribute("formattedLocation", formattedLocation);
            
            // Tính tổng số người đã đánh giá
            int totalReviews = feedbacks.size();
            model.addAttribute("totalReviews", totalReviews);

            // Lấy account từ session
            Account loggedAcc = session.get("user");
            model.addAttribute("loggedAcc", loggedAcc);

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
	    List<Discount> discounts = discountRepo.findAll();

	    if (motorbike.isPresent()) {
	        model.addAttribute("motorbike", motorbike.get());
	        model.addAttribute("discounts", discounts);

	        // Lấy phản hồi cụ thể của xe máy theo ID
	        List<FeedbackInfo> feedbacks = feedbackService.getCompletedRentalsWithFeedbackMotorbike(id); // Truyền ID xe máy
	        model.addAttribute("feedbacks", feedbacks);

	        // Tính tổng số điểm và giá trị trung bình
	        double totalRating = feedbacks.stream()
	                                      .mapToDouble(FeedbackInfo::getRating)
	                                      .sum();
	        double averageRating = feedbacks.isEmpty() ? 0 : totalRating / feedbacks.size();
	        model.addAttribute("averageRating", averageRating);
	        model.addAttribute("totalFeedbacks", feedbacks.size());

	        // Thêm thông tin địa điểm của xe
	        String vehicleLocation = motorbike.get().getVehicleLocation();
	        String formattedLocation = formatVehicleLocation(vehicleLocation);
	        model.addAttribute("formattedLocation", formattedLocation);

	        // Thêm tổng số lượng đánh giá
	        model.addAttribute("totalReviews", feedbacks.size());

	        // Lấy tài khoản từ session
	        Account loggedAcc = session.get("user");
	        model.addAttribute("loggedAcc", loggedAcc);
	    } else {
	        model.addAttribute("error", "Không tìm thấy xe với ID này");
	        return "error-page";
	    }

	    return "motorbikes-details";
	}

	
	// Phương thức để định dạng vehicleLocation
	private String formatVehicleLocation(String location) {
	    String[] parts = location.split(" TP ");
	    if (parts.length == 2) {
	        return parts[0] + ", TP." + parts[1].trim();
	    }
	    return location; // Trả về giá trị gốc nếu không tìm thấy 'TP'
	}

}

