document.addEventListener('DOMContentLoaded', () => {
    // Xử lý Button

    // Lấy hai nút "Xe Con" và "Xe Máy"
    const carBtn = document.querySelector('.car-btn');
    const motorbikeBtn = document.querySelector('.motorbike-btn');

    // Hàm để thiết lập trạng thái 'active' cho nút
    const setActiveButton = (button) => {
        // Xóa lớp 'active' khỏi tất cả các nút
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        // Thêm lớp 'active' cho nút được nhấn
        button.classList.add('active');
    };

    // Mặc định chọn nút "Xe Con" khi trang tải lần đầu
    if (carBtn) {
        setActiveButton(carBtn);
    }

    // Thêm sự kiện click cho nút "Xe Con"
    if (carBtn) {
        carBtn.addEventListener('click', () => {
            setActiveButton(carBtn);
        });
    }

    // Thêm sự kiện click cho nút "Xe Máy"
    if (motorbikeBtn) {
        motorbikeBtn.addEventListener('click', () => {
            setActiveButton(motorbikeBtn);
        });
    }

    // Xử lý Select Dropdown

    // Hàm để tạo dropdown menu cho các option-arrow
    const setupDropdown = (id) => {
        const arrow = document.getElementById(id);
        if (!arrow) return; // Kiểm tra nếu không tìm thấy element để tránh lỗi

        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown-menu');
        dropdown.style.display = 'none';

        // Tạo một phần tử span để hiển thị lựa chọn được chọn dưới label
        const selectedText = document.createElement('span');
        selectedText.classList.add('selected-text');
        selectedText.textContent = 'Vui lòng chọn'; // Mặc định chưa có lựa chọn
        arrow.parentNode.insertBefore(selectedText, arrow.nextSibling);

        // Tạo các tùy chọn cho dropdown
        const options = ['Tùy chọn 1', 'Tùy chọn 2', 'Tùy chọn 3'];
        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('dropdown-item');
            optionElement.textContent = option;
            dropdown.appendChild(optionElement);

            // Xử lý sự kiện chọn mục
            optionElement.addEventListener('click', () => {
                selectedText.textContent = option; // Hiển thị tên của lựa chọn đã chọn dưới label
                dropdown.style.display = 'none'; // Ẩn danh sách
            });
        });

        // Thêm dropdown vào phần tử cha của arrow
        arrow.parentNode.appendChild(dropdown);

        // Xử lý sự kiện click để mở hoặc đóng dropdown
        arrow.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });
    };

    // Áp dụng cho tất cả các option-arrow
    ['car-type', 'gear-type', 'car-brand', 'city', 'district'].forEach(setupDropdown);
});


//beetween
document.addEventListener('DOMContentLoaded', () => {
    // Xử lý sự kiện chọn ngày
    const startDateBtn = document.getElementById('start-date-btn');
    const endDateBtn = document.getElementById('end-date-btn');

    startDateBtn.addEventListener('click', () => {
        // Thêm logic để hiển thị DatePicker cho nút chọn ngày bắt đầu
        alert('Chọn ngày bắt đầu');
    });

    endDateBtn.addEventListener('click', () => {
        // Thêm logic để hiển thị DatePicker cho nút chọn ngày kết thúc
        alert('Chọn ngày kết thúc');
    });

    // Xử lý sự kiện chọn sắp xếp
    const sortingDropdown = document.getElementById('sorting-dropdown');
    const sortingText = document.getElementById('sorting-text');
    const sortingOptions = ['Từ thấp đến cao', 'Từ cao đến thấp', 'Mới nhất', 'Cũ nhất'];

    sortingDropdown.addEventListener('click', () => {
        let currentIndex = sortingOptions.indexOf(sortingText.innerText);
        currentIndex = (currentIndex + 1) % sortingOptions.length;
        sortingText.innerText = sortingOptions[currentIndex];
    });
});

// Lắng nghe sự kiện cuộn
window.addEventListener('scroll', function () {
    const rightColumn = document.querySelector('.right-column');
    // Kiểm tra vị trí cuộn
    if (window.scrollY > 0) {
        rightColumn.classList.add('scrolled'); // Thêm class 'scrolled' khi cuộn
    } else {
        rightColumn.classList.remove('scrolled'); // Xóa class 'scrolled' khi không cuộn
    }
});
