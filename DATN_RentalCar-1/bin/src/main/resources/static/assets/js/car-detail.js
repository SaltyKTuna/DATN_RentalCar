
document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử modal
    const modal = document.getElementById("imageModal");
    if (!modal) return; // Dừng lại nếu modal không tồn tại
    // Lấy phần tử nút "Xem tất cả ảnh"
    const seeMoreButton = document.querySelector('.see-more-img');
    if (seeMoreButton) {
        seeMoreButton.addEventListener('click', function () {
            modal.style.display = "flex"; // Chỉ khi click vào nút thì modal mới hiển thị
            const thumbnails = document.querySelectorAll('.modal-thumbnails .thumbnail');
            if (thumbnails.length > 0) {
                currentIndex = 0; // Bắt đầu từ ảnh đầu tiên
                zoomedImage.src = thumbnails[currentIndex].src; // Hiển thị ảnh đầu tiên mặc định
            }
        });
    }
    // Nút đóng modal
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            modal.style.display = "none"; // Ẩn modal khi click vào nút đóng
        });
    }
    // Lấy tất cả các ảnh nhỏ và thiết lập chức năng click
    const thumbnails = document.querySelectorAll('.modal-thumbnails .thumbnail');
    if (thumbnails.length > 0) {
        const zoomedImage = document.getElementById("zoomedImage");
        if (zoomedImage) {
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', function () {
                    currentIndex = index; // Cập nhật chỉ mục ảnh hiện tại
                    zoomedImage.src = this.src; // Thay đổi ảnh lớn bằng ảnh được click
                });
            });
        }
    }
    // Lấy các nút mũi tên để di chuyển giữa các ảnh
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    if (leftArrow) {
        leftArrow.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            if (thumbnails.length > 0) {
                zoomedImage.src = thumbnails[currentIndex].src;
            }
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            if (thumbnails.length > 0) {
                zoomedImage.src = thumbnails[currentIndex].src;
            }
        });
    }

    // Khi người dùng nhấn vào bất kỳ đâu ngoài modal, đóng modal
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});


// Xử lí modal giờ nhận trả xe
var modal = document.getElementById("uniqueModal");
var closeButton = document.querySelector(".unique-modal-close");
// Đảm bảo modal ẩn khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    modal.style.display = "none"; // Modal sẽ bị ẩn khi trang tải lần đầu
});
// Khi người dùng click vào "Nhận xe", mở modal
document.querySelector('.form-item:nth-child(1) .wrap-date-time').addEventListener('click', function () {
    modal.style.display = "flex"; // Hiển thị modal khi click vào "Nhận xe"
});
// Khi người dùng click vào "Trả xe", mở modal
document.querySelector('.form-item:nth-child(3) .wrap-date-time').addEventListener('click', function () {
    modal.style.display = "flex"; // Hiển thị modal khi click vào "Trả xe"
});
// Khi người dùng click vào nút "X", đóng modal
closeButton.onclick = function () {
    modal.style.display = "none"; // Ẩn modal khi bấm nút X
}
// Khi người dùng click ra ngoài modal, đóng modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Ẩn modal khi click ra ngoài modal
    }
}
// Khi nhấn "Lưu", cập nhật thông tin ngày và giờ
document.getElementById('saveDateTime').addEventListener('click', function () {
    var selectedDate = document.getElementById('modalDate').value;
    var selectedTime = document.getElementById('modalTime').value;
    // Cập nhật vào phần "Nhận xe" (hoặc "Trả xe" tùy thuộc vào sự kiện)
    document.querySelector('.form-item:nth-child(1) .wrap-date .value').innerText = selectedDate;
    document.querySelector('.form-item:nth-child(1) .wrap-time .value').innerText = selectedTime;
    // Đóng modal sau khi lưu
    modal.style.display = "none";
});

