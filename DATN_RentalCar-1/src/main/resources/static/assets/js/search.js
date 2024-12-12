function setVehicleType(type) {
	// Đặt giá trị loại phương tiện (car hoặc bike)
	document.getElementById('vehicleType').value = type;

	// Cập nhật trạng thái nút
	document.querySelectorAll('.btn-select').forEach(btn => btn.classList.remove('active'));
	document.querySelector(`[data-type="${type}"]`).classList.add('active');
}





document.querySelector('.btn.btn-primary').addEventListener('click', async function(event) {
	event.preventDefault(); // Ngăn form gửi dữ liệu ngay

	// Lấy thông tin từ form
	const location = document.getElementById('location').value;
	const pickupDate = document.getElementById('pickup-date').value;
	const returnDate = document.getElementById('return-date').value;
	const vehicleType = document.getElementById('vehicleType').value;

	// Xác định API tương ứng (ô tô hoặc xe máy)
	const apiUrl = vehicleType === 'car'
		? 'http://localhost:8080/api/car'
		: 'http://localhost:8080/api/motorbikes';

	try {
		// Gọi API để lấy danh sách phương tiện
		const response = await fetch(apiUrl);
		if (!response.ok) throw new Error('Failed to fetch vehicle data');
		const vehicles = await response.json();

		// Lưu thông tin tìm kiếm và danh sách phương tiện vào localStorage
		localStorage.setItem('searchData', JSON.stringify({
			location,
			pickupDate,
			returnDate,
			vehicleType,
		}));
		if (vehicleType === "bike") {
			localStorage.setItem('selectedVehicle', "motorbike");
		}else{
			localStorage.setItem('selectedVehicle', "car");
		}

		// Chuyển hướng đến trang hiển thị kết quả
		window.location.href = '/pick-vehicle';
	} catch (error) {
		console.error('Error fetching vehicles:', error);
		alert('Không thể tải danh sách phương tiện. Vui lòng thử lại!');
	}
});

