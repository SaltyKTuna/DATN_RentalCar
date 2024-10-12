document.addEventListener('DOMContentLoaded', () => {
    // Lấy các nút Xe Con và Xe Máy
    const carBtn = document.querySelector('.car-btn');
    const motorbikeBtn = document.querySelector('.motorbike-btn');
    const carList = document.querySelectorAll('.prod.car');  // Các sản phẩm xe con
    const motorbikeList = document.querySelectorAll('.prod.motorbike');  // Các sản phẩm xe máy

    // Kiểm tra xem người dùng đã chọn loại xe trước đó không
    let selectedVehicle = localStorage.getItem('selectedVehicle') || 'car';  // Mặc định là "car"

    // Hàm để hiển thị danh sách sản phẩm và ẩn sản phẩm không cần thiết
    const showProductList = (productsToShow, productsToHide) => {
        productsToHide.forEach(product => {
            product.style.display = 'none';  // Ẩn sản phẩm không được chọn
        });
        productsToShow.forEach(product => {
            product.style.display = 'block';  // Hiển thị sản phẩm được chọn
        });
    };

    // Hàm để thiết lập trạng thái 'active' cho nút
    const setActiveButton = (button) => {
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    };

    // Hiển thị loại xe đã chọn trước đó
    if (selectedVehicle === 'car') {
        setActiveButton(carBtn);
        showProductList(carList, motorbikeList);
    } else {
        setActiveButton(motorbikeBtn);
        showProductList(motorbikeList, carList);
    }

    // Thêm sự kiện click cho nút "Xe Con"
    carBtn.addEventListener('click', () => {
        setActiveButton(carBtn);
        showProductList(carList, motorbikeList);  // Hiển thị xe con, ẩn xe máy
        localStorage.setItem('selectedVehicle', 'car');  // Lưu lựa chọn vào localStorage
    });

    // Thêm sự kiện click cho nút "Xe Máy"
    motorbikeBtn.addEventListener('click', () => {
        setActiveButton(motorbikeBtn);
        showProductList(motorbikeList, carList);  // Hiển thị xe máy, ẩn xe con
        localStorage.setItem('selectedVehicle', 'motorbike');  // Lưu lựa chọn vào localStorage
    });

    // --- Xử lý Select Dropdown ---
    const setupDropdown = (id) => {
        const arrow = document.getElementById(id);
        if (!arrow) return;

        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-menu');
        dropdown.style.display = 'none';

        const selectedText = document.createElement('span');
        selectedText.classList.add('selected-text');
        selectedText.textContent = 'Vui lòng chọn';
        arrow.parentNode.insertBefore(selectedText, arrow.nextSibling);

        const options = ['Tùy chọn 1', 'Tùy chọn 2', 'Tùy chọn 3'];
        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('dropdown-item');
            optionElement.textContent = option;
            dropdown.appendChild(optionElement);

            optionElement.addEventListener('click', () => {
                selectedText.textContent = option;
                dropdown.style.display = 'none';
            });
        });

        arrow.parentNode.appendChild(dropdown);
        arrow.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });
    };

    ['car-type', 'gear-type', 'car-brand', 'city', 'district'].forEach(setupDropdown);

    // --- Xử lý chọn ngày ---
    const startDateBtn = document.getElementById('start-date-btn');
    const endDateBtn = document.getElementById('end-date-btn');

    if (startDateBtn) {
        startDateBtn.addEventListener('click', () => alert('Chọn ngày bắt đầu'));
    }

    if (endDateBtn) {
        endDateBtn.addEventListener('click', () => alert('Chọn ngày kết thúc'));
    }

    // --- Xử lý cuộn ---
    window.addEventListener('scroll', () => {
        const rightColumn = document.querySelector('.right-column');
        if (window.scrollY > 0) {
            rightColumn.classList.add('scrolled');
        } else {
            rightColumn.classList.remove('scrolled');
        }
    });
});
