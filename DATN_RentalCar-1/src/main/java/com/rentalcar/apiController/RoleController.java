package com.rentalcar.apiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rentalcar.dao.RoleRepo;
import com.rentalcar.entity.Role;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/role")
public class RoleController {
	
	@Autowired
	private RoleRepo roleRepo;
		
		
		//tìm tất cả
		@GetMapping
		public List<Role> getAll() {
			return roleRepo.findAll();
		}
		
		//tìm theo id xe
		@GetMapping(value = "/{id}")
		public ResponseEntity<Optional<Role>> getByID(@PathVariable("id") Long id) {
			if (!roleRepo.existsById(id)) {
				return ResponseEntity.notFound().build();
			} else {
				return ResponseEntity.ok(roleRepo.findById(id));
			}
		}
		
		//lưu
		@PostMapping
		public String save(@RequestBody Role role) {
			roleRepo.save(role);
			return "saved...";
		}
		
		@PutMapping(value = "/{id}")
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
		
		@DeleteMapping(value = "/{id}")
	    public String deleteById(@PathVariable("id") Long id) {
			roleRepo.deleteById(id);
			
			return "deleted...";
	    }
}
