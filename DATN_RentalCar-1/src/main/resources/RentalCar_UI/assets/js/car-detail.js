document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử modal
    const modal = document.getElementById("imageModal");
    if (!modal) return; // Dừng lại nếu modal không tồn tại

    // Lấy phần tử nút "Xem tất cả ảnh"
    const seeMoreButton = document.querySelector('.see-more-img');
    if (seeMoreButton) {
        seeMoreButton.addEventListener('click', function () {
            modal.style.display = "block";
            const thumbnails = document.querySelectorAll('.modal-thumbnails .thumbnail');
            if (thumbnails.length > 0) {
                currentIndex = 0; // Bắt đầu từ ảnh đầu tiên
                zoomedImage.src = thumbnails[currentIndex].src; // Hiển thị ảnh đầu tiên mặc định
            }
        });
    }
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            modal.style.display = "none";
        });
    }
    // Lấy tất cả các ảnh nhỏ
    const thumbnails = document.querySelectorAll('.modal-thumbnails .thumbnail');
    if (thumbnails.length > 0) {
        // Lấy ảnh lớn trong modal
        const zoomedImage = document.getElementById("zoomedImage");
        if (zoomedImage) {
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', function () {
                    // Thay đổi ảnh lớn bằng ảnh được click
                    currentIndex = index; // Cập nhật chỉ mục ảnh hiện tại
                    zoomedImage.src = this.src;
                });
            });
        }
    }
    // Lấy các nút mũi tên
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    // Khai báo biến để theo dõi ảnh hiện tại
    let currentIndex = 0;
    // Sự kiện click mũi tên trái
    if (leftArrow) {
        leftArrow.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length; // Quay lại ảnh trước
            if (thumbnails.length > 0) {
                zoomedImage.src = thumbnails[currentIndex].src;
            }
        });
    }
    // Sự kiện click mũi tên phải
    if (rightArrow) {
        rightArrow.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % thumbnails.length; // Chuyển đến ảnh tiếp theo
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
