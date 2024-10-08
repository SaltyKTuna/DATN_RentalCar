package RentalCar.com.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import RentalCar.com.dao.RoleRepo;
import RentalCar.com.entity.Role;

@RestController
@RequestMapping("/RoleManagement")
public class RoleController {
	
	@Autowired
	private RoleRepo roleRepo;
		
		
		//tìm tất cả
		@GetMapping(value = "/findAll")
		public List<Role> getAll() {
			return roleRepo.findAll();
		}
		
		//tìm theo id xe
		@GetMapping(value = "/findByID/{id}")
		public ResponseEntity<Optional<Role>> getByID(@PathVariable("id") Long id) {
			if (!roleRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(roleRepo.findById(id));
			}
		}
		
		//lưu
		@PostMapping(value = "/save")
		public String save(@RequestBody Role role) {
			roleRepo.save(role);
			return "saved...";
		}
		
		@PutMapping(value = "/updateByID/{id}")
		public String update(@PathVariable("id") Long id, @RequestBody Role rolelDetail) {
		    // Tìm xe cần cập nhật
			Role roleUpdate = roleRepo.findById(id).orElseThrow(() -> new RuntimeException("role not found"));
		    
		    // Cập nhật thông tin xe từ đối tượng carDetails
			roleUpdate.setRoleName(rolelDetail.getRoleName());
			roleUpdate.setDescription(rolelDetail.getDescription());
			
		    // Lưu đối tượng xe đã cập nhật
			roleRepo.save(roleUpdate);
		    
		    return "updated successfully";
		}	
		
		@DeleteMapping(value = "/delete/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			roleRepo.deleteById(id);
			
			return "deleted...";
	    }
}
