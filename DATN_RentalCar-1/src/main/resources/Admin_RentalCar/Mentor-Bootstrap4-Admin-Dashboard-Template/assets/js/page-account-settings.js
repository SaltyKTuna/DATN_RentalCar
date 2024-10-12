
//fill Avatar
 document.getElementById('uploadBtn').addEventListener('click', function() {
    document.getElementById('avatarInput').click(); 
});

document.getElementById('avatarInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatar').src = e.target.result; 
        };

        reader.readAsDataURL(file); 
    }
});
document.getElementById('deleteBtn').addEventListener('click', function() {
    document.getElementById('avatar').src = 'assets/img/avtar/01.jpg'; 
});


    // Lấy checkbox và nhãn hiển thị trạng thái
    const checkbox = document.getElementById('statusCheckbox');
    const statusLabel = document.getElementById('statusLabel');


    checkbox.checked = false;


    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            statusLabel.textContent = 'on Visible'; 
        } else {
            statusLabel.textContent = 'off Disible'; 
        }
    });



//Fill database
document.querySelectorAll('.employee-row').forEach(row => {
    row.addEventListener('click', function () {
        // Lấy dữ liệu từ thuộc tính data
        const name = this.getAttribute('data-name');
        const email = this.getAttribute('data-email');
        const phone = this.getAttribute('data-phone');
        const address = this.getAttribute('data-address');
        const role = this.getAttribute('data-role');

        // Điền dữ liệu vào form
        document.getElementById('name1').value = name;
        document.getElementById('title1').value = email;
        document.getElementById('phone1').value = phone;
        document.getElementById('add1').value = address;
        document.getElementById('role').value = role === 'Quản Lý' ? 'admin' : 'Employees';
    });

    // Đổi màu khi hover
    row.addEventListener('mouseover', function () {
        this.classList.add('table-primary');
    });
    row.addEventListener('mouseout', function () {
        this.classList.remove('table-primary');
    });
});