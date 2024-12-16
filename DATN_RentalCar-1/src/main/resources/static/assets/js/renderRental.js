function displayRentals() {
  console.log("Displaying rentals...");

  const carRentals = getRentalsFromLocalStorage("carRentals");
  const motorbikeRentals = getRentalsFromLocalStorage("motorbikeRentals");

  console.log("Car Rentals:", carRentals);
  console.log("Motorbike Rentals:", motorbikeRentals);

  const carTableBody = document.querySelector("#car-rentals-body");
  const motorbikeTableBody = document.querySelector("#motorbike-rentals-body");

  carTableBody.innerHTML = "";
  motorbikeTableBody.innerHTML = "";

  carRentals.forEach((rental, index) => {
    const row = createRentalRow(rental, index, "car");
    carTableBody.appendChild(row);
  });

  motorbikeRentals.forEach((rental, index) => {
    const row = createRentalRow(rental, index, "motorbike");
    motorbikeTableBody.appendChild(row);
  });
}

// Tạo một dòng trong bảng hiển thị thông tin thuê xe
function createRentalRow(rental, index, vehicleType) {
  const renStatus = rental.rental.renStatus;

  console.log(renStatus);

  const isCar = vehicleType === "car";

  // Chỉ hiển thị nút huỷ khi trạng thái là "Chờ xác nhận"
  const cancelButton =
    renStatus === "Chờ xác nhận"
      ? `<button class="btn btn-danger btn-sm" onclick="cancelRental(${index}, '${vehicleType}')">Huỷ</button>`
      : "";

// Thêm nút đánh giá nếu trạng thái là "Hoàn tất"
const reviewButton = renStatus === "Hoàn tất"
  ? `<button class="btn btn-warning btn-sm" onclick="showFeedbackModal(${index}, '${vehicleType}')">Đánh giá</button>`
  : "";
  // Nút "Xem Chi Tiết"
  const detailButton = `<button class="btn btn-info btn-sm" onclick="viewRentalDetails(${index}, '${vehicleType}')">Xem Chi Tiết</button>`;

  const row = document.createElement("tr");

  if (isCar) {
    row.innerHTML = `
            <td class="rental-table-cell">${
              index + 1
            }</td> <!-- Thêm số thứ tự -->
			<td class="rental-table-cell">${rental.car.make} ${rental.car.model} ${
      rental.car.year
    } </td>
            <td class="rental-table-cell">${new Date(
              rental.rental.rentalDate
            ).toLocaleDateString("vi-VN")}</td>
            <td class="rental-table-cell">${new Date(
              rental.rental.returnDate
            ).toLocaleDateString("vi-VN")}</td>
            <td class="rental-table-cell">${renStatus}</td>
            <td class="rental-table-cell">${cancelButton} ${reviewButton}</td><td class="rental-table-cell">${detailButton}
        `;
  } else {
    row.innerHTML = `
        <td class="rental-table-cell">${index + 1}</td> <!-- Thêm số thứ tự -->
            <td class="rental-table-cell">${rental.motorbike.model}</td>
            <td class="rental-table-cell">${new Date(
              rental.rental.rentalDate
            ).toLocaleDateString("vi-VN")}</td>
            <td class="rental-table-cell">${new Date(
              rental.rental.returnDate
            ).toLocaleDateString("vi-VN")}</td>
            <td class="rental-table-cell">${renStatus}</td>
            <td class="rental-table-cell">${cancelButton} ${reviewButton}</td><td class="rental-table-cell">${detailButton}
        `;
  }

  return row;
}

// Hàm huỷ thuê xe
function cancelRental(index, vehicleType) {
  console.log(`Canceling rental for ${vehicleType} at index: ${index}`);

  const rentalList = getRentalsFromLocalStorage(
    vehicleType === "car" ? "carRentals" : "motorbikeRentals"
  );
  const rental = rentalList[index];

  rental.rental.renStatus = "Đã huỷ";

  saveRentalsToLocalStorage(
    vehicleType === "car" ? "carRentals" : "motorbikeRentals",
    rentalList
  );

  displayRentals();

  fetch(`http://localhost:8080/api/rental/cancel/${rental.rental.rentalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      renStatus: "Đã huỷ",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.renStatus === "Đã huỷ") {
        alert("Đã huỷ thành công");
      } else {
        console.error("Error: Response does not contain updated rental data");
        alert("Cập nhật trạng thái thất bại");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái.");
    });
}

function getRentalsFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveRentalsToLocalStorage(key, rentals) {
  localStorage.setItem(key, JSON.stringify(rentals));
}

function fetchAndSaveRentalVehicles() {
  console.log("Fetching rental vehicles...");
  fetch("http://localhost:8080/api/rental-vehicle/rental-List", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data fetched from API:", data);

      const carRentals = data.filter((item) => item.vehicleType === "car");
      const motorbikeRentals = data.filter(
        (item) => item.vehicleType === "motobike"
      );

      carRentals.sort((a, b) => b.rentalVehicleId - a.rentalVehicleId);
      motorbikeRentals.sort((a, b) => b.rentalVehicleId - a.rentalVehicleId);

      console.log(
        "Xe ô tô sau khi sắp xếp theo rentalVehicleId giảm dần:",
        carRentals
      );
      console.log(
        "Xe máy sau khi sắp xếp theo rentalVehicleId giảm dần:",
        motorbikeRentals
      );

      saveRentalsToLocalStorage("carRentals", carRentals);
      saveRentalsToLocalStorage("motorbikeRentals", motorbikeRentals);

      displayRentals();
    })
    .catch((error) => {
      console.error("Error fetching rental vehicles:", error);
    });
}

document.addEventListener("DOMContentLoaded", fetchAndSaveRentalVehicles);

function viewRentalDetails(index, vehicleType) {
  const rentals =
    vehicleType === "car"
      ? getRentalsFromLocalStorage("carRentals")
      : getRentalsFromLocalStorage("motorbikeRentals");

  if (!rentals || !rentals[index]) {
    console.error(
      "Thông tin thuê xe không đầy đủ:",
      rentals ? rentals[index] : "Không có dữ liệu"
    );
    alert("Không tìm thấy thông tin thuê xe!");
    return;
  }

  const rental = rentals[index];
  console.log("Chi tiết thuê xe:", rental);
  const isCar = vehicleType === "car";

  const nameVehicle = isCar 
    ? `${rental.car.make} ${rental.car.model} ${rental.car.year}` 
    : `${rental.motorbike.make} ${rental.motorbike.model} ${rental.motorbike.year}`;
  
    const colorrvehicleType = isCar 
    ? rental.car.color 
    : rental.motorbike.color || "Chưa có màu sắc";

  const licenseplate = isCar 
    ? rental.car.licensePlate 
    : rental.motorbike.licensePlate || "Chưa có biển số";

  const gearbox = isCar 
    ? rental.car.gearBox || "chưa liên kết đươc hộp số" 
    : rental.motorbike.gearBox || "Chưa liên kết được hộp số";

  const rentalID = rental.rentalVehicleId || "Chưa có id";
  const rentalAddress = rental.rental.account?.address || "Chưa có địa chỉ";
  const rentalFullName = rental.rental.account?.fullName || "Chưa có tên";
  const rentalEmail = rental.rental.account?.email || "Chưa có email";
  const rentalPhone =
    rental.rental.account?.phoneNumber || "Chưa có số điện thoại";
  const rentalStatus = rental.rental.renStatus || "Chưa có trạng thái";
  const rentalLocation =
    rental.rental.rentalLocations || "Chưa có thông tin vị trí nhận xe";
  const rentalNotes = rental.rental.notes || "Chưa có ghi chú";
  const rentalDiscount =
    rental.rental.discount?.discountCode || "Không có mã giảm giá";
  const rentalTotalCost = rental.rental.totalCost || 0;
  const rentalDriver = rental.rental.haveDriver ? "Có" : "Không";

  // Kiểm tra và tách ảnh xe (lấy ảnh đầu tiên nếu có)
  let rentalImage = "default-car-image.jpg"; // Ảnh mặc định
  if (rental.car && rental.car.imageUrl) {
    const images = rental.car.imageUrl.split(","); // Tách chuỗi ảnh
    rentalImage = images[0]; // Lấy ảnh đầu tiên
  } else if (rental.motorbike && rental.motorbike.imageUrl) {
    // Nếu không có ảnh ô tô, lấy ảnh của xe máy
    const images = rental.motorbike.imageUrl.split(",");
    rentalImage = images[0];
  }

  // Xác định đường dẫn ảnh dựa trên loại xe (car hoặc motorbike)
  const imagePath = rental.car
    ? `http://localhost:8080//assets/images/car/${rentalImage}`
    : `http://localhost:8080//assets/images/motorbike/${rentalImage}`;

  // Fetch thông tin thanh toán và cập nhật modal
  fetch(`http://localhost:8080/api/payment/by-rental/${rentalID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Payment data fetched:", data);

      // Kiểm tra nếu dữ liệu thanh toán có tồn tại và hợp lệ
      if (data && data.length > 0) {
        const payment = data[0]; // Lấy thông tin thanh toán từ API
        const paymentStatus = payment.status || "Chưa có trạng thái thanh toán";
        const paymentMethod =
          payment.paymentMethod || "Chưa có phương thức thanh toán";
        const paymentAmount = payment.amount || 0;
        const paymentDate = payment.paymentDate
          ? new Date(payment.paymentDate).toLocaleDateString("vi-VN")
          : "Chưa có ngày thanh toán";
        const Statusbill = payment.status ;
        const transactionId = payment.transId || "Chưa có mã giao dịch";
        const paymentType = payment.paymentType || "Chưa có loại thanh toán";

        console.log(
          "Payment Info:",
          paymentStatus,
          paymentMethod,
          paymentAmount,
          paymentDate
        ); // Log kiểm tra

        // Render thông tin thuê xe vào modal
        document.querySelector("#rentalDetailContent").innerHTML = `
        <!-- Bảng 1: Thông tin xe -->
        <div class="table-responsive mb-3">
            <table class="table table-bordered" style="border: 2px solid black; border-radius: 10px; overflow: hidden;">
                <thead>
                    <tr>
                        <th colspan="2" class="text-center" style="font-size: 2.2rem; background-color: #cfcfcf;"><strong>Thông tin xe</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td style="display: flex; align-items: center; width: 25%; border: none;">
                            <img src="${imagePath}" alt="Vehicle Image" class="img-fluid rounded" style="max-width: 250px; height: auto; margin-right: 10px; " />
                           
                        </td>
                        <td style="font-size: 1.8rem; "> Tên xe:
                        <strong><span style="font-size: 1.8rem;">${nameVehicle}</span></strong><br>
                        Hộp Số:<strong><span style="font-size: 1.8rem;">${gearbox}</span></strong><br>
                        Màu sắc:<strong><span style="font-size: 1.8rem;">${colorrvehicleType}</span></strong><br>
                         Biển số:<strong><span style="font-size: 1.8rem;">${licenseplate}</span></strong><br>
                        </td>
                        
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Vị trí nhận xe</strong></td>
                        <td style="font-size: 1.8rem;">${rentalLocation}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Trạng thái thuê</strong></td>
                        <td style="font-size: 1.8rem;">${rentalStatus}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Giảm giá</strong></td>
                        <td style="font-size: 1.8rem;">${rentalDiscount}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Thuê xe có tài xế</strong></td>
                        <td style="font-size: 1.8rem;">${rentalDriver}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    
        <!-- Bảng 2: Thông tin khách hàng -->
        <div class="table-responsive mb-3">
           <table class="table table-bordered" style="border: 2px solid black; border-radius: 10px; overflow: hidden;">
                <thead>
                    <tr>
                        <th colspan="2" class="text-center" style="font-size: 2.2rem; background-color: #cfcfcf;"><strong>Thông tin khách hàng</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-size: 1.8rem; width: 22%;"><strong>Tên khách hàng</strong></td>
                        <td style="font-size: 1.8rem;">${rentalFullName}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Email</strong></td>
                        <td style="font-size: 1.8rem;">${rentalEmail}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Số điện thoại</strong></td>
                        <td style="font-size: 1.8rem;">${rentalPhone}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Địa Chỉ</strong></td>
                        <td style="font-size: 1.8rem;">${rentalAddress}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    
        <!-- Bảng 3: Thông tin thanh toán -->
        <div class="table-responsive mb-3" >
            <table class="table table-bordered" style="border: 2px solid black; border-radius: 10px; overflow: hidden;">
                <thead>
                    <tr>
                        <th colspan="2" class="text-center" style="font-size: 2.2rem; background-color: #cfcfcf;"><strong>Thông tin thanh toán</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Tổng chi phí</strong></td>
                        <td style="font-size: 1.8rem;">${rentalTotalCost.toLocaleString()} VND</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Ngày thanh toán</strong></td>
                        <td style="font-size: 1.8rem;">${paymentDate}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Trạng thái</strong></td>
                        <td style="font-size: 1.8rem; color: ${Statusbill == 'success' ? 'green' : 'red'};">
                            ${Statusbill == 'success' ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Phương thức thanh toán</strong></td>
                        <td style="font-size: 1.8rem;">${paymentType}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Mã giao dịch</strong></td>
                        <td style="font-size: 1.8rem;">${transactionId}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 1.8rem; width: 25%;"><strong>Ghi chú</strong></td>
                        <td style="font-size: 1.8rem;">${rentalNotes}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    
        
    `;
      } else {
        console.error("Không có dữ liệu thanh toán trả về");
      }
    })
    .catch((error) => {
      console.error("Error fetching payment data:", error);
    });

  // Hiển thị modal
  const modal = new bootstrap.Modal(
    document.getElementById("rentalDetailModal")
  );
  modal.show();
}



// Đánh giá
function showFeedbackModal(index, vehicleType) {

  const rentals =
    vehicleType === "car"
      ? getRentalsFromLocalStorage("carRentals")
      : getRentalsFromLocalStorage("motorbikeRentals");

  if (!rentals || rentals.length === 0) {
    alert("Không tìm thấy danh sách xe!");
    return;
  }

  const rental = rentals[index];
  if (!rental) {
    alert("Không tìm thấy thông tin xe tại vị trí này!");
    return;
  }

  const isCar = vehicleType === "car";
  const vehicleName = isCar
    ? `${rental.car.make} ${rental.car.model} (${rental.car.year})`
    : `${rental.motorbike.make} ${rental.motorbike.model} (${rental.motorbike.year})`;

  let rentalImage = "default-car-image.jpg"; 
  if (isCar && rental.car.imageUrl) {
    const images = rental.car.imageUrl.split(","); 
    rentalImage = images[0]; 
  } else if (!isCar && rental.motorbike.imageUrl) {
    const images = rental.motorbike.imageUrl.split(",");
    rentalImage = images[0]; 
  }

  const imagePath = isCar
    ? `http://localhost:8080/assets/images/car/${rentalImage}`
    : `http://localhost:8080/assets/images/motorbike/${rentalImage}`;

  const vehicleColor = isCar
    ? rental.car.color || "Chưa có thông tin"
    : rental.motorbike.color || "Chưa có thông tin";

  const vehiclePlate = isCar
    ? rental.car.licensePlate || "Chưa có thông tin"
    : rental.motorbike.licensePlate || "Chưa có thông tin";

  let existingModal = document.getElementById("feedbackModal");

  if (!existingModal) {
    const modalHTML = `
      <div class="modal fade" id="feedbackModal" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="feedbackModalLabel">Đánh giá thuê xe</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Hiển thị thông tin xe -->
              <div class="mb-3" style="font-size: 1.4rem; border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: #f9f9f9; display: flex; align-items: center;">
                <img src="${imagePath}" alt="Vehicle Image" class="img-fluid rounded" style="max-width: 250px; height: auto; margin-right: 10px;" />
                <div>
                  <strong>Tên xe:</strong> <span id="vehicleName">${vehicleName}</span><br>
                  <strong>Màu sắc:</strong> <span id="vehicleColor">${vehicleColor}</span><br>
                  <strong>Biển số:</strong> <span id="vehiclePlate">${vehiclePlate}</span>
                </div>
              </div>

              <form id="feedbackForm">
                <div class="mb-3">
                  <label for="feedbackStars" class="form-label">Đánh giá (1-5 sao)</label>
                  <div id="feedbackStars" class="d-flex gap-2" style="font-size: 4rem;">
                    <span class="star" data-value="1" style="color: gray;">☆</span>
                    <span class="star" data-value="2" style="color: gray;">☆</span>
                    <span class="star" data-value="3" style="color: gray;">☆</span>
                    <span class="star" data-value="4" style="color: gray;">☆</span>
                    <span class="star" data-value="5" style="color: gray;">☆</span>
                  </div>
                  <input type="hidden" id="feedbackRating" required>
                </div>
                <div class="mb-3">
                  <label for="feedbackComment" class="form-label">Nhận xét</label>
                  <textarea id="feedbackComment" class="form-control" rows="4" placeholder="Nhập nhận xét của bạn..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Gửi đánh giá</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // su kien ngoi sao
    document.querySelectorAll("#feedbackStars .star").forEach((star) => {
      star.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        document.getElementById("feedbackRating").value = value;
        document.querySelectorAll("#feedbackStars .star").forEach((s) => {
          s.textContent = "☆";
          s.style.color = "gray";
        });
        for (let i = 1; i <= value; i++) {
          const selectedStar = document.querySelector(`.star[data-value="${i}"]`);
          selectedStar.textContent = "★";
          selectedStar.style.color = "gold";
        }
      });
    });
  }

  // Reset modal
  document.getElementById("vehicleName").textContent = "";
  document.getElementById("vehicleColor").textContent = "";
  document.getElementById("vehiclePlate").textContent = "";

  document.getElementById("feedbackRating").value = "";
  document.querySelectorAll("#feedbackStars .star").forEach((star) => {
    star.textContent = "☆";
    star.style.color = "gray"; 
  });

  document.getElementById("feedbackComment").value = ""; 

  document.getElementById("vehicleName").textContent = vehicleName;
  document.getElementById("vehicleColor").textContent = vehicleColor;
  document.getElementById("vehiclePlate").textContent = vehiclePlate;

  const feedbackModal = new bootstrap.Modal(document.getElementById("feedbackModal"));
  feedbackModal.show();
}

document.body.addEventListener("hidden.bs.modal", (event) => {
  if (event.target.id === "feedbackModal") {
    event.target.remove();
  }
});
