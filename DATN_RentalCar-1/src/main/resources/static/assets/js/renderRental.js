// Hiển thị các thông tin thuê xe từ LocalStorage
function displayRentals() {
    console.log("Displaying rentals...");

    const carRentals = getRentalsFromLocalStorage('carRentals');
    const motorbikeRentals = getRentalsFromLocalStorage('motorbikeRentals');

    console.log("Car Rentals:", carRentals);
    console.log("Motorbike Rentals:", motorbikeRentals);

    const carTableBody = document.querySelector('#car-rentals tbody');
    const motorbikeTableBody = document.querySelector('#motorbike-rentals tbody');

    // Làm sạch bảng trước khi thêm dữ liệu
    carTableBody.innerHTML = '';
    motorbikeTableBody.innerHTML = '';

    // Thêm dữ liệu xe ô tô vào bảng
    carRentals.forEach((rental, index) => {
        const row = createRentalRow(rental, index, 'car');
        carTableBody.appendChild(row);
    });

    // Thêm dữ liệu xe máy vào bảng
    motorbikeRentals.forEach((rental, index) => {
        const row = createRentalRow(rental, index, 'motorbike');
        motorbikeTableBody.appendChild(row);
    });
}

// Tạo một dòng trong bảng hiển thị thông tin thuê xe
function createRentalRow(rental, index, vehicleType) {
    const renStatus = rental.rental.renStatus; // Lấy trạng thái thuê xe
	
	console.log(renStatus)
	
    const isCar = vehicleType === 'car';

    // Chỉ hiển thị nút huỷ khi trạng thái là "Chờ xác nhận"
    const cancelButton = renStatus === 'Chờ xác nhận' 
        ? `<button class="btn btn-danger btn-sm" onclick="cancelRental(${index}, '${vehicleType}')">Huỷ</button>` 
        : '';  
 // Nút "Xem Chi Tiết"
 const detailButton = `<button class="btn btn-info btn-sm" onclick="viewRentalDetails(${index}, '${vehicleType}')">Xem Chi Tiết</button>`;

    const row = document.createElement('tr');

    if (isCar) {
        row.innerHTML = `
            
			<td class="rental-table-cell">${rental.car.make} ${rental.car.model} ${rental.car.year} </td>
            <td class="rental-table-cell">${new Date(rental.rental.rentalDate).toLocaleDateString('vi-VN')}</td>
            <td class="rental-table-cell">${new Date(rental.rental.returnDate).toLocaleDateString('vi-VN')}</td>
            <td class="rental-table-cell">${renStatus}</td>
            <td class="rental-table-cell">${cancelButton}</td><td class="rental-table-cell">${detailButton}
        `;
    } else {    
        row.innerHTML = `
            <td class="rental-table-cell">${rental.motorbike.model}</td>
            <td class="rental-table-cell">${new Date(rental.rental.rentalDate).toLocaleDateString('vi-VN')}</td>
            <td class="rental-table-cell">${new Date(rental.rental.returnDate).toLocaleDateString('vi-VN')}</td>
            <td class="rental-table-cell">${renStatus}</td>
            <td class="rental-table-cell">${cancelButton}</td><td class="rental-table-cell">${detailButton}
        `;
    }

    return row;
}

// Hàm huỷ thuê xe
function cancelRental(index, vehicleType) {
    console.log(`Canceling rental for ${vehicleType} at index: ${index}`);

    const rentalList = getRentalsFromLocalStorage(vehicleType === 'car' ? 'carRentals' : 'motorbikeRentals');
    const rental = rentalList[index];

    // Cập nhật trạng thái "Đã huỷ" trong localStorage
    rental.rental.renStatus = 'Đã huỷ';

    // Lưu lại vào localStorage
    saveRentalsToLocalStorage(vehicleType === 'car' ? 'carRentals' : 'motorbikeRentals', rentalList);

    // Cập nhật UI ngay lập tức
    displayRentals();

    // Gửi PUT request đến backend để cập nhật trạng thái
    fetch(`http://localhost:8080/api/rental/cancel/${rental.rental.rentalId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            renStatus: 'Đã huỷ',
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Chuyển đổi phản hồi thành JSON
    })
    .then(data => {
        if (data && data.renStatus === 'Đã huỷ') {
            alert('Đã huỷ thành công');
        } else {
            console.error('Error: Response does not contain updated rental data');
            alert('Cập nhật trạng thái thất bại');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi cập nhật trạng thái.');
    });
}

// Hàm lấy và lưu dữ liệu thuê xe từ LocalStorage
function getRentalsFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveRentalsToLocalStorage(key, rentals) {
    localStorage.setItem(key, JSON.stringify(rentals));
}

// Lấy dữ liệu từ API và lưu vào LocalStorage
function fetchAndSaveRentalVehicles() {
    console.log("Fetching rental vehicles...");
    fetch('http://localhost:8080/api/rental-vehicle/rental-List', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Data fetched from API:", data);

        // Phân tách xe ô tô và xe máy
        const carRentals = data.filter(item => item.vehicleType === 'car');
        const motorbikeRentals = data.filter(item => item.vehicleType === 'motorbike');

        // Lưu dữ liệu vào LocalStorage
        saveRentalsToLocalStorage('carRentals', carRentals);
        saveRentalsToLocalStorage('motorbikeRentals', motorbikeRentals);

        console.log("Car rentals saved to localStorage:", carRentals);
        console.log("Motorbike rentals saved to localStorage:", motorbikeRentals);

        // Hiển thị danh sách thuê
        displayRentals();
    })
    .catch(error => {
        console.error('Error fetching rental vehicles:', error);
    });
}

// Gọi hàm fetch khi trang được load
document.addEventListener('DOMContentLoaded', fetchAndSaveRentalVehicles);




function viewRentalDetails(index, vehicleType) {
    // Lấy dữ liệu từ LocalStorage dựa vào loại phương tiện
    const rentals = vehicleType === 'car' 
        ? getRentalsFromLocalStorage('carRentals') 
        : getRentalsFromLocalStorage('motorbikeRentals');

    // Kiểm tra dữ liệu thuê xe tại index
    if (!rentals || !rentals[index]) {
        console.error('Thông tin thuê xe không đầy đủ:', rentals ? rentals[index] : 'Không có dữ liệu');
        alert('Không tìm thấy thông tin thuê xe!');
        return;
    }

    const rental = rentals[index]; // Lấy thông tin thuê xe
    console.log('Chi tiết thuê xe:', rental);

    // Kiểm tra và hiển thị thông tin vào modal
    const rentalAddress = rental.rental.account?.address || 'Chưa có địa chỉ';
    const rentalFullName = rental.rental.account?.fullName || 'Chưa có tên';
    const rentalEmail = rental.rental.account?.email || 'Chưa có email';
    const rentalPhone = rental.rental.account?.phoneNumber || 'Chưa có số điện thoại';
    const rentalStatus = rental.rental.renStatus || 'Chưa có trạng thái';
    const rentalLocation = rental.rental.rentalLocations || 'Chưa có thông tin vị trí nhận xe';
    const rentalNotes = rental.rental.notes || 'Chưa có ghi chú';
    const rentalDiscount = rental.rental.discount?.discountCode || 'Không có mã giảm giá';
    const rentalTotalCost = rental.rental.totalCost || 0;
    const rentalDriver = rental.rental.haveDriver ? 'Có' : 'Không';

    // Kiểm tra và lấy ảnh xe (nếu có)
    let rentalImage = 'default-car-image.jpg'; // Hình ảnh mặc định
    if (rental.car && rental.car.imageUrl) {
        rentalImage = rental.car.imageUrl; // Nếu có ảnh, dùng ảnh đó
    }

    // điền vào dom ở dươi
    //            <div class="col-md-4">
    // <img src="${rentalImage}" alt="Car Image" class="img-fluid rounded" />
    // </div>


    // Điền nội dung vào modal
    document.querySelector('#rentalDetailContent').innerHTML = `
        <div class="row">
        
            <div class="col-md-8">
                <p><strong>Tên khách hàng:</strong> ${rentalFullName}</p>
                <p><strong>Email:</strong> ${rentalEmail}</p>
                <p><strong>Địa chỉ:</strong> ${rentalAddress}</p>
                <p><strong>Số điện thoại:</strong> ${rentalPhone}</p>
                <p><strong>Trạng thái:</strong> ${rentalStatus}</p>
                <p><strong>Vị trí nhận xe:</strong> ${rentalLocation}</p>
                <p><strong>Giảm giá:</strong> ${rentalDiscount}</p>
                <p><strong>Ghi chú:</strong> ${rentalNotes}</p>
                <p><strong>Tổng chi phí:</strong> ${rentalTotalCost.toLocaleString()}</p>
                <p><strong>Thuê xe có tài xế:</strong> ${rentalDriver}</p>
            </div>
        </div>
    `;

    // Hiển thị modal
    const modal = new bootstrap.Modal(document.getElementById('rentalDetailModal'));
    modal.show();
}
