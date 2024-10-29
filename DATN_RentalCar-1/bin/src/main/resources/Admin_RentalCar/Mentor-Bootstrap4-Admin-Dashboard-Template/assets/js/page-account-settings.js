
//fill Avatar
document.getElementById('uploadBtn').addEventListener('click', function () {
    document.getElementById('avatarInput').click();
});

document.getElementById('avatarInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('avatar').src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});
document.getElementById('deleteBtn').addEventListener('click', function () {
    document.getElementById('avatar').src = 'assets/img/avtar/AvtDefault.png';
});

// Lấy checkbox 
const checkbox = document.getElementById('statusCheckbox');
const statusLabel = document.getElementById('statusLabel');
checkbox.checked = false;
checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        statusLabel.textContent = 'on Visible';
    } else {
        statusLabel.textContent = 'off Disible';
    }
});

// Fill 
document.addEventListener('DOMContentLoaded', function () {
    const monthNames = ["01", "02", "03", "04", "05", "06", 
                        "07", "08", "09", "10", "11", "12"];
    const rows = document.querySelectorAll('#employeeTable tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', function () {
            document.getElementById('name').value = this.querySelector('.emp-name').textContent;
            document.getElementById('email').value = this.querySelector('.emp-email').textContent;
            document.getElementById('phone').value = this.querySelector('.emp-phone').textContent;
            document.getElementById('username').value = this.querySelector('.emp-username').textContent;
            document.getElementById('password').value = this.querySelector('.emp-password').textContent;
            document.getElementById('address').value = this.querySelector('.emp-address').textContent;

            const dob = this.querySelector('.emp-dob').textContent.split('/');
            const day = dob[0];  // Ngày
            const month = dob[1];  // Tháng (số)
            const year = dob[2];  // Năm

            document.getElementById('dob_date').value = day;
            document.getElementById('dob_month').value = monthNames[parseInt(month) - 1];  // Chuyển số tháng thành tên tháng
            document.getElementById('dob_year').value = year;

            const isManager = this.querySelector('input[name="role_manager"]').checked;
            const isEmployee = this.querySelector('input[name="role_employee"]').checked;
            const isDriver = this.querySelector('input[name="role_driver"]').checked;

            if (isManager) {
                document.getElementById('role').value = 'admin';  
            } else if (isEmployee) {
                document.getElementById('role').value = 'Employees';  
            } else if (isDriver) {
                document.getElementById('role').value = 'Driver';  
            } else {
                document.getElementById('role').value = ''; 
            }
            // document.getElementById('avatar').src = this.querySelector('td img').src; ẢNH
        });
    });

    // Tìm kiếm theo tên
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();  
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const employees = document.querySelectorAll('#employeeTable tbody tr');
        let firstVisibleRow = null;

        employees.forEach(employee => {
            const name = employee.querySelector('.emp-name').textContent.toLowerCase();
            if (name.includes(searchValue)) {
                employee.style.display = '';  
                if (!firstVisibleRow) {
                    firstVisibleRow = employee; 
                }
            } else {
                employee.style.display = 'none'; 
            }
        });

        // sau khi search, Fill vào form
        if (firstVisibleRow) {
            document.getElementById('name').value = firstVisibleRow.querySelector('.emp-name').textContent;
            document.getElementById('email').value = firstVisibleRow.querySelector('.emp-email').textContent;
            document.getElementById('phone').value = firstVisibleRow.querySelector('.emp-phone').textContent;
            document.getElementById('username').value = firstVisibleRow.querySelector('.emp-username').textContent;
            document.getElementById('password').value = firstVisibleRow.querySelector('.emp-password').textContent;
            document.getElementById('address').value = firstVisibleRow.querySelector('.emp-address').textContent;

            const dob = firstVisibleRow.querySelector('.emp-dob').textContent.split('/');
            const day = dob[0];  // Ngày
            const month = dob[1];  // Tháng (số)
            const year = dob[2];  // Năm

            document.getElementById('dob_date').value = day;
            document.getElementById('dob_month').value = monthNames[parseInt(month) - 1];  
            document.getElementById('dob_year').value = year;
            // Xử lý vai trò
            const isManager = firstVisibleRow.querySelector('input[name="role_manager"]').checked;
            const isEmployee = firstVisibleRow.querySelector('input[name="role_employee"]').checked;
            const isDriver = firstVisibleRow.querySelector('input[name="role_driver"]').checked;
            if (isManager) {
                document.getElementById('role').value = 'admin';  
            } else if (isEmployee) {
                document.getElementById('role').value = 'Employees';  
            } else if (isDriver) {
                document.getElementById('role').value = 'Driver';  
            } else {
                document.getElementById('role').value = '';  
            }
            // document.getElementById('avatar').src = firstVisibleRow.querySelector('td img').src; ẢNH
        }
    });
});
