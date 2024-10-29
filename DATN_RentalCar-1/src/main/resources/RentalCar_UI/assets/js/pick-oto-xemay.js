document.addEventListener('DOMContentLoaded', () => {
    // Lấy các nút Xe Con và Xe Máy
    const carBtn = document.querySelector('.car-btn');
    const motorbikeBtn = document.querySelector('.motorbike-btn');
    const carList = document.querySelectorAll('.prod.car');
    const motorbikeList = document.querySelectorAll('.prod.motorbike');

    // Kiểm tra xem người dùng đã chọn loại xe trước đó không
    let selectedVehicle = localStorage.getItem('selectedVehicle') || 'car';

    // Hàm để hiển thị danh sách sản phẩm và ẩn sản phẩm không cần thiết
    const showProductList = (productsToShow, productsToHide) => {
        productsToHide.forEach(product => {
            product.style.display = 'none';
        });
        productsToShow.forEach(product => {
            product.style.display = 'block';
        });
    };

    // Hàm để thiết lập trạng thái 'active' cho nút
    const setActiveButton = (button) => {
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    };

    // Kiểm tra và hiển thị loại xe đã chọn trước đó
    if (carBtn && motorbikeBtn) {
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
            showProductList(carList, motorbikeList);
            localStorage.setItem('selectedVehicle', 'car');
        });

        // Thêm sự kiện click cho nút "Xe Máy"
        motorbikeBtn.addEventListener('click', () => {
            setActiveButton(motorbikeBtn);
            showProductList(motorbikeList, carList);
            localStorage.setItem('selectedVehicle', 'motorbike');
        });
    }

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

    ['car-type', 'gear-type', 'car-brand', 'city', 'district'].forEach(id => {
        const element = document.getElementById(id);
        if (element) setupDropdown(id);
    });

    // --- Xử lý chọn ngày ---
    const startDateBtn = document.getElementById('start-date-btn');
    if (startDateBtn) {
        startDateBtn.addEventListener('click', () => alert('Chọn ngày bắt đầu'));
    }

    const endDateBtn = document.getElementById('end-date-btn');
    if (endDateBtn) {
        endDateBtn.addEventListener('click', () => alert('Chọn ngày kết thúc'));
    }

    // --- Xử lý cuộn ---
    const rightColumn = document.querySelector('.right-column');
    if (rightColumn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                rightColumn.classList.add('scrolled');
            } else {
                rightColumn.classList.remove('scrolled');
            }
        });
    }
});
