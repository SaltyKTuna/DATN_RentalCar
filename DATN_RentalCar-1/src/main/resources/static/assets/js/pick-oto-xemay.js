document.addEventListener('DOMContentLoaded', () => {
	// Lấy các nút Xe Con và Xe Máy
	const carBtn = document.querySelector('.car-btn');
	const motorbikeBtn = document.querySelector('.motorbike-btn');
	const carList = document.querySelectorAll('.prod.car');
	const motorbikeList = document.querySelectorAll('.prod.motorbike');
	const sortingDropdown = document.getElementById('sorting-dropdown');
	const sortingText = document.getElementById('sorting-text');
	const sortingMenu = document.querySelector('.dropdown-menu');

	// Lưu trữ các lựa chọn người dùng
	let selectedModel = 'Vui lòng chọn';
	let selectedBrand = 'Vui lòng chọn';
	let selectedGearType = 'Vui lòng chọn';
	let selectedCity = 'Vui lòng chọn';
	let selectedDistrict = 'Vui lòng chọn';

	// URL API cho các loại xe
	const apiUrls = {
		car: {
			model: '/api/car/models',
			make: '/api/car/makes'
		},
		motorbike: {
			model: '/api/motorbikes/models',
			make: '/api/motorbikes/makes'
		}
	};

	// Hàm hiển thị và ẩn sản phẩm
	const showProductList = (productsToShow, productsToHide) => {
		productsToHide.forEach(product => product.style.display = 'none');
		productsToShow.forEach(product => product.style.display = 'block');
	};

	// Hàm thiết lập trạng thái 'active' cho nút
	const setActiveButton = (button) => {
		document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
	};

	// Thiết lập dropdown với dữ liệu từ API
	const setupDropdown = (id, apiUrl) => {
		const arrow = document.getElementById(id);
		if (!arrow) return;

		const dropdown = document.createElement('div');
		dropdown.classList.add('dropdown-menu');
		dropdown.style.display = 'none';

		const selectedText = document.createElement('span');
		selectedText.classList.add('selected-text');
		selectedText.textContent = 'Vui lòng chọn';
		arrow.parentNode.insertBefore(selectedText, arrow.nextSibling);

		// Lấy dữ liệu từ API và thêm vào dropdown
		const fetchOptionsForDropdown = async () => {
			try {
				const response = await fetch(apiUrl);
				if (!response.ok) throw new Error('Network response was not ok');
				const options = await response.json();
				dropdown.innerHTML = '';

				options.forEach(option => {
					const optionElement = document.createElement('div');
					optionElement.classList.add('dropdown-item');
					optionElement.textContent = option;
					dropdown.appendChild(optionElement);

					optionElement.addEventListener('click', () => {
						selectedText.textContent = option;
						if (id === 'car-type') selectedModel = option;
						else if (id === 'car-brand') selectedBrand = option;
						else if (id === 'gear-type') selectedGearType = option;
						else if (id === 'city') selectedCity = option;
						else if (id === 'district') selectedDistrict = option;
						dropdown.style.display = 'none';
					});
				});
			} catch (error) {
				console.error('Failed to fetch options:', error);
			}
		};

		fetchOptionsForDropdown();
		arrow.parentNode.appendChild(dropdown);
		arrow.addEventListener('click', () => {
			dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
		});
	};

	// Lấy các nút và dropdown
	const cityDropdown = document.getElementById('city');
	const districtDropdown = document.getElementById('district');

	// Tạo phần tử span cho thành phố, chỉ tạo một lần
	let citySelectedText = document.querySelector('.selected-city-text');
	if (!citySelectedText) {
		citySelectedText = document.createElement('span');
		citySelectedText.classList.add('selected-city-text');
		citySelectedText.textContent = 'Vui lòng chọn';
		cityDropdown.parentNode.insertBefore(citySelectedText, cityDropdown.nextSibling);
	}

	// Tạo phần tử span cho quận/huyện, chỉ tạo một lần
	let districtSelectedText = document.querySelector('.selected-district-text');
	if (!districtSelectedText) {
		districtSelectedText = document.createElement('span');
		districtSelectedText.classList.add('selected-district-text');
		districtSelectedText.textContent = 'Vui lòng chọn';
		districtDropdown.parentNode.insertBefore(districtSelectedText, districtDropdown.nextSibling);
	}

	// Dữ liệu các thành phố và quận/huyện
	const cityData = {
		'Hà Nội': ['Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Cầu Giấy', 'Quận Đống Đa'],
		'Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 7'],
		'Đà Nẵng': ['Quận Hải Châu', 'Quận Thanh Khê', 'Quận Liên Chiểu'],
		'Hải Phòng': ['Quận Hồng Bàng', 'Quận Lê Chân', 'Quận Ngô Quyền'],
		'Bình Dương': [],
		'Biên Hòa': [],
		'Đà Lạt': [],
		'Phú Quốc': [],
	};

	// Tạo dropdown cho thành phố
	const setupCityDropdown = () => {
		const dropdown = document.createElement('div');
		dropdown.classList.add('dropdown-menu');
		dropdown.style.display = 'none';

		for (const city in cityData) {
			const option = document.createElement('div');
			option.classList.add('dropdown-item');
			option.textContent = city;
			dropdown.appendChild(option);

			option.addEventListener('click', () => {
				// Cập nhật span cho thành phố đã chọn
				citySelectedText.textContent = city;
				selectedCity = city;
				selectedDistrict = "Vui lòng chọn";

				// Cập nhật dropdown quận/huyện dựa trên thành phố đã chọn
				updateDistrictDropdown(city);

				// Ẩn dropdown sau khi chọn
				dropdown.style.display = 'none';
			});
		}

		cityDropdown.parentNode.appendChild(dropdown);
		cityDropdown.addEventListener('click', () => {
			dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
		});
	};

	// Tạo dropdown cho quận/huyện dựa trên thành phố đã chọn
	const updateDistrictDropdown = (city) => {
		// Xóa các dropdown cũ
		const existingDropdown = districtDropdown.parentNode.querySelector('.dropdown-menu');
		if (existingDropdown) {
			existingDropdown.remove();
		}

		const districtOptions = cityData[city] || [];
		const dropdown = document.createElement('div');
		dropdown.classList.add('dropdown-menu');
		dropdown.style.display = 'none';

		// Cập nhật dropdown quận/huyện cho thành phố đã chọn
		districtOptions.forEach(district => {
			const option = document.createElement('div');
			option.classList.add('dropdown-item');
			option.textContent = district;
			dropdown.appendChild(option);

			option.addEventListener('click', () => {
				// Cập nhật nội dung cho quận/huyện đã chọn
				districtSelectedText.textContent = district;
				selectedDistrict = district;
				dropdown.style.display = 'none';
			});
		});

		districtDropdown.parentNode.appendChild(dropdown);
		districtDropdown.addEventListener('click', () => {
			dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
		});
	};



	// Cập nhật dropdown theo loại xe đã chọn
	const updateDropdowns = (vehicleType) => {
		setupDropdown('car-type', apiUrls[vehicleType].model);
		setupDropdown('car-brand', apiUrls[vehicleType].make);
		setupCityDropdown();
	};

	// Xử lý sự kiện click cho nút "Xe Con"
	carBtn.addEventListener('click', () => {
		setActiveButton(carBtn);
		showProductList(carList, motorbikeList);
		localStorage.setItem('selectedVehicle', 'car');
		updateDropdowns('car');
	});

	// Xử lý sự kiện click cho nút "Xe Máy"
	motorbikeBtn.addEventListener('click', () => {
		setActiveButton(motorbikeBtn);
		showProductList(motorbikeList, carList);
		localStorage.setItem('selectedVehicle', 'motorbike');
		updateDropdowns('motorbike');
	});

	// Hiển thị loại xe đã chọn trước đó và cập nhật dropdown
	const selectedVehicle = localStorage.getItem('selectedVehicle') || 'car';
	if (selectedVehicle === 'car') {
		setActiveButton(carBtn);
		showProductList(carList, motorbikeList);
	} else {
		setActiveButton(motorbikeBtn);
		showProductList(motorbikeList, carList);
	}
	updateDropdowns(selectedVehicle);

	// Hàm lọc xe theo các điều kiện mà người dùng đã chọn
	const filterVehicles = () => {
		console.log("SelectedCity", selectedCity);
		console.log("SelectedDistrict", selectedDistrict);

		const searchQuery = document.querySelector('.search-box input').value.toLowerCase();
		const vehicleType = carBtn.classList.contains('active') ? 'car' : 'motorbike';

		const productList = Array.from(vehicleType === 'car' ? carList : motorbikeList);
		const matchedProducts = productList.filter(product => {
			const productName = product.querySelector('.car-title, .motorbike-title').textContent.toLowerCase();
			const productModel = product.getAttribute('data-model');
			const productBrand = product.getAttribute('data-brand');
			const productGearType = product.getAttribute('data-gear');
			const productLocation = product.getAttribute('data-location'); // lấy giá trị location

			// Kiểm tra xem thành phố và quận người dùng chọn có nằm trong productLocation không
			const matchesSearchQuery = searchQuery === '' || productName.includes(searchQuery);
			const matchesModel = selectedModel === 'Vui lòng chọn' || selectedModel.toLowerCase() === productModel.toLowerCase();
			const matchesBrand = selectedBrand === 'Vui lòng chọn' || selectedBrand.toLowerCase() === productBrand.toLowerCase();
			const matchesGearType = selectedGearType === 'Vui lòng chọn' || selectedGearType.toLowerCase() === productGearType.toLowerCase();

			// Kiểm tra nếu người dùng đã chọn thành phố hoặc quận và so sánh với giá trị trong productLocation
			const matchesCity = (selectedCity === 'Vui lòng chọn' || productLocation.toLowerCase().includes(selectedCity.toLowerCase()));
			const matchesDistrict = (selectedDistrict === 'Vui lòng chọn' || productLocation.toLowerCase().includes(selectedDistrict.toLowerCase()));

			return matchesSearchQuery && matchesModel && matchesBrand && matchesGearType && matchesCity && matchesDistrict;
		});
		showProductList(matchedProducts, productList.filter(product => !matchedProducts.includes(product)));
	};


	// Xử lý sự kiện khi nhấn vào nút "Tìm kiếm"
	document.querySelector('.search-btn').addEventListener('click', (event) => {
		event.preventDefault();
		console.log("Search clicked")
		filterVehicles();
	});

	// Xử lý dropdown sắp xếp
	sortingDropdown.addEventListener('click', () => {
		sortingMenu.style.display = sortingMenu.style.display === 'none' ? 'block' : 'none';
	});

	sortingMenu.addEventListener('click', (event) => {
		if (event.target.classList.contains('dropdown-item')) {
			const selectedSort = event.target.getAttribute('data-sort');
			sortingText.textContent = event.target.textContent;
			sortingMenu.style.display = 'none';

			// Gọi hàm sắp xếp sản phẩm
			sortProducts(selectedSort);
		}
	});

	// Hàm sắp xếp sản phẩm
	const sortProducts = (order) => {
		const productList = Array.from(document.querySelectorAll('.prod'));
		productList.sort((a, b) => {
			const priceA = parseFloat(a.getAttribute('data-price'));
			const priceB = parseFloat(b.getAttribute('data-price'));
			return order === 'asc' ? priceA - priceB : priceB - priceA;
		});

		const container = document.querySelector('.product-container');
		productList.forEach(product => container.appendChild(product));
	};

	// Xử lý chọn ngày
	// Đồng bộ dữ liệu tìm kiếm từ localStorage tới input
	function syncSearchData() {
		// Lấy các phần tử input
		const startDateInput = document.getElementById("start-date-btn");
		const endDateInput = document.getElementById("end-date-btn");

		// Lấy giá trị JSON từ localStorage
		const searchData = JSON.parse(localStorage.getItem("searchData"));

		// Đồng bộ dữ liệu vào các input nếu có trong localStorage
		if (searchData) {
			if (searchData.pickupDate) startDateInput.value = searchData.pickupDate;
			if (searchData.returnDate) endDateInput.value = searchData.returnDate;

			// Nếu có location trong searchData, cập nhật city dropdown
			if (searchData.location) {
				selectedCity = searchData.location;

				// Cập nhật nội dung hiển thị trong dropdown thành phố
				const citySelectedText = document.querySelector('.selected-city-text');
				if (citySelectedText) {
					citySelectedText.textContent = selectedCity;
				}

				// Cập nhật dropdown quận/huyện dựa trên thành phố đã chọn
				updateDistrictDropdown(selectedCity);
			}
		}

		// Lắng nghe sự kiện thay đổi để cập nhật lại localStorage
		startDateInput.addEventListener("change", () => {
			console.log("Pickup Date changed to:", startDateInput.value);
			updateSearchData("pickupDate", startDateInput.value);
		});

		endDateInput.addEventListener("change", () => {
			console.log("Return Date changed to:", endDateInput.value);
			updateSearchData("returnDate", endDateInput.value);
		});
	}


	// Hàm cập nhật lại dữ liệu JSON trong localStorage
	function updateSearchData(key, value) {
		// Lấy dữ liệu hiện tại từ localStorage
		const searchData = JSON.parse(localStorage.getItem("searchData")) || {};

		// Cập nhật giá trị mới
		searchData[key] = value;

		// Lưu lại vào localStorage
		localStorage.setItem("searchData", JSON.stringify(searchData));
	}

	// Xử lý cuộn trang
	window.addEventListener('scroll', () => {
		const rightColumn = document.querySelector('.right-column');
		if (window.scrollY > 0) rightColumn.classList.add('scrolled');
		else rightColumn.classList.remove('scrolled');
	});

	syncSearchData();
	filterVehicles();
});
