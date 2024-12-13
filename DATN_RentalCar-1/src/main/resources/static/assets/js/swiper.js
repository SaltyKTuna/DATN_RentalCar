// Khởi tạo các slider Swiper với cấu hình chi tiết
new Swiper('.img-slider', {
	slidesPerView: 3,
	spaceBetween: 15,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 15,
		},
		576: {
			slidesPerView: 2,
		},
	},
	autoplay: {
		delay: 1800,
	},
});

new Swiper('.address-list', {
	slidesPerView: 4,
	spaceBetween: 20,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 15,
		},
		480: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
	},
});

new Swiper('.topdes-slider', {
	slidesPerView: 4,
	spaceBetween: 15,
	navigation: {
		nextEl: '.swiper-button-next-topdes',
		prevEl: '.swiper-button-prev-topdes',
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 15,
		},
		480: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
	},
});

new Swiper('.blog-slider', {
	slidesPerView: 2,
	spaceBetween: 15,
	navigation: {
		nextEl: '.swiper-button-next-blog',
		prevEl: '.swiper-button-prev-blog',
	},
});

new Swiper('.slider-2', {
	slidesPerView: 5,
	spaceBetween: 15,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 15,
		},
		480: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 4,
		},
	},
});

new Swiper('.slider-video', {
	slidesPerView: 3,
	spaceBetween: 15,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
	},
});

new Swiper('.slider-brand', {
	slidesPerView: 5,
	spaceBetween: 15,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 15,
		},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 4,
		},
	},
});

new Swiper('.slider-footer');

// Điều khiển mở và đóng menu mobile
const menuEl = document.querySelector('.menu-mobile1');
const closeEl = document.querySelector('.close-menu');
const openMenuEl = document.querySelector('.menu-mobile');

if (menuEl && closeEl && openMenuEl) {
	closeEl.addEventListener('click', () => {
		menuEl.classList.add('move-left');
	});

	openMenuEl.addEventListener('click', () => {
		menuEl.classList.remove('move-left');
	});
}

// Thêm sự kiện click cho từng swiper-slide
// document.querySelectorAll('.swiper-slide').forEach(slide => {
// 	slide.addEventListener('click', async function() {
// 		// Lấy id của address-item để làm location
// 		const addressItem = this.querySelector('.address-item');
// 		if (!addressItem) return;
// 		const location = addressItem.id; // Lấy địa chỉ từ id của slide

// 		// Lấy thông tin từ form
// 		const pickupDate = document.getElementById('pickup-date').value;
// 		const returnDate = document.getElementById('return-date').value;
// 		const vehicleType = document.getElementById('vehicleType').value;

// 		// Xác định API tương ứng (ô tô hoặc xe máy)
// 		const apiUrl = vehicleType === 'car'
// 			? 'http://localhost:8080/api/car'
// 			: 'http://localhost:8080/api/motorbikes';

// 		try {
// 			// Gọi API để lấy danh sách phương tiện
// 			const response = await fetch(apiUrl);
// 			if (!response.ok) throw new Error('Failed to fetch vehicle data');
// 			const vehicles = await response.json();

// 			// Lưu thông tin tìm kiếm vào localStorage
// 			localStorage.setItem('searchData', JSON.stringify({
// 				location, // Lấy location từ id
// 				pickupDate,
// 				returnDate,
// 				vehicleType,
// 			}));
// 			if (vehicleType === "bike") {
// 				localStorage.setItem('selectedVehicle', "motorbike");
// 			} else {
// 				localStorage.setItem('selectedVehicle', "car");
// 			}


// 			// Chuyển hướng đến trang hiển thị kết quả
// 			window.location.href = '/pick-vehicle';
// 		} catch (error) {
// 			console.error('Error fetching vehicles:', error);
// 			alert('Không thể tải danh sách phương tiện. Vui lòng thử lại!');
// 		}
// 	});
// });

