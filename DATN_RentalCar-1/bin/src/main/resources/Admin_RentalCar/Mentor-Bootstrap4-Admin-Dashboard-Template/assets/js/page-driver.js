
//fill Avatar
document.getElementById('uploadBtnDCar').addEventListener('click', function() {
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
document.getElementById('deleteBtnDCar').addEventListener('click', function() {
    document.getElementById('avatar').src = 'assets/img/avtar/AvtDefault.png'; 
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

