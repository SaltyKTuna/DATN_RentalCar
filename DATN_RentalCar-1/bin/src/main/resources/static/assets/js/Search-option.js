var element = document.getElementById('choose_address');
var value = element.getAttribute('data-id'); // Giá trị sẽ là '1'

var chooseAddressButton = document.getElementById('choose_address');
var modal_choose_address = document.getElementById('modal_choose_address');
var closeModal_chooseAddress = document.getElementsByClassName('close')[0];

var chooseDayButton = document.getElementById('choose_day');
var modal_choose_day = document.getElementById('modal_choose_day');
var closeModal_chooseDay = document.getElementsByClassName('close')[1];

var chooseAddressButton_xecotaixe = document.getElementById('choose_address_xecotaice');

var chooseTimeButton_xecotaixe = document.getElementById('choose_time_xecotaixe');
var modal_choose_time_xecotaixe = document.getElementById('modal_choose_time_xecotaixe');
var closeModal_chooseTime_xecotaixe = document.getElementsByClassName('close')[2];

var chooseCityButton_thuexedaihan = document.getElementById('choose_city_thuexedaihan');
var modal_choose_city_thuexedaihan = document.getElementById('modal_choose_city_thuexedaihan');
var closeModal_chooseCity_thuexedaihan = document.getElementsByClassName('close')[3];

chooseAddressButton.addEventListener('click', function () {
    modal_choose_address.style.display = 'block';
});
chooseDayButton.addEventListener('click', function () {
    modal_choose_day.style.display = 'block';
});
chooseAddressButton_xecotaixe.addEventListener('click', function () {
    modal_choose_address.style.display = 'block';
});
chooseTimeButton_xecotaixe.addEventListener('click', function () {
    modal_choose_time_xecotaixe.style.display = 'block';
});
chooseCityButton_thuexedaihan.addEventListener('click', function () {
    modal_choose_city_thuexedaihan.style.display = 'block';
});

closeModal_chooseAddress.addEventListener('click', function () {
    modal_choose_address.style.display = 'none';
});
closeModal_chooseDay.addEventListener('click', function () {
    modal_choose_day.style.display = 'none';
});
closeModal_chooseTime_xecotaixe.addEventListener('click', function () {
    modal_choose_time_xecotaixe.style.display = 'none';
});
closeModal_chooseCity_thuexedaihan.addEventListener('click', function () {
    modal_choose_city_thuexedaihan.style.display = 'none';
});
// Thêm sự kiện vào các nút để hiển thị modal
document.addEventListener('DOMContentLoaded', function() {
    // Lắng nghe sự kiện click cho từng button
    var chooseButtons = [
        { button: 'choose_address', modal: 'modal_choose_address', close: 0 },
        { button: 'choose_day', modal: 'modal_choose_day', close: 1 },
        { button: 'choose_address_xecotaice', modal: 'modal_choose_address', close: 0 },
        { button: 'choose_time_xecotaixe', modal: 'modal_choose_time_xecotaixe', close: 2 },
        { button: 'choose_city_thuexedaihan', modal: 'modal_choose_city_thuexedaihan', close: 3 }
    ];

    chooseButtons.forEach(function(item) {
        var button = document.getElementById(item.button);
        var modal = document.getElementById(item.modal);
        var closeModal = document.getElementsByClassName('close')[item.close];

        if (button && modal && closeModal) {
            button.addEventListener('click', function() {
                modal.style.display = 'block';
            });

            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });

            // Đóng modal khi click ra ngoài
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    });

    // Làm trống input nhập địa chỉ bắt đầu
    var del = document.getElementById("del_address_start");
    var ipt_address = document.getElementById("id_address_start");
    if (del && ipt_address) {
        del.onclick = function() {
            ipt_address.value = "";
        };
    }

    // Thêm `active` vào `option-item` khi được click và hiển thị phần `search` phù hợp
    function addActiveClassOptionItem(event) {
        var clickedItem = event.currentTarget;
        var dataHttxValue = clickedItem.getAttribute('data-httx');
        
        // Loại bỏ `active` khỏi tất cả `option-item`
        document.querySelectorAll('.search-option .option-item').forEach(function(item) {
            item.classList.remove('active');
        });
        // Thêm `active` vào `option-item` vừa click
        clickedItem.classList.add('active');

        // Loại bỏ `active` khỏi tất cả `search-item`
        document.querySelectorAll('.search-item').forEach(function(item) {
            item.classList.remove('active');
        });

        // Thêm `active` vào `search-item` tương ứng
        var correspondingItem = document.querySelector('.search-item[data-httx="' + dataHttxValue + '"]');
        if (correspondingItem) {
            correspondingItem.classList.add('active');
        }
    }

    // Gán sự kiện `click` cho tất cả `option-item`
    document.querySelectorAll('.search-option .option-item').forEach(function(item) {
        item.addEventListener('click', addActiveClassOptionItem);
    });

    // Hiển thị `search-item` phù hợp với `option-item` `active` khi tải trang
    function updateSearchContent() {
        var activeItem = document.querySelector('.search-option .option-item.active');
        if (activeItem) {
            var dataHttxValue = activeItem.getAttribute('data-httx');
            var correspondingItem = document.querySelector('.search-item[data-httx="' + dataHttxValue + '"]');
            if (correspondingItem) {
                correspondingItem.classList.add('active');
            }
        }
    }

    updateSearchContent(); // Khi tải trang
});



window.addEventListener('click', function (event) {
    if (event.target === modal_choose_address) {
        modal_choose_address.style.display = 'none';
    }
    if (event.target === modal_choose_day) {
        modal_choose_day.style.display = 'none';
    }
    if (event.target === modal_choose_time_xecotaixe) {
        modal_choose_time_xecotaixe.style.display = 'none';
    }
    if (event.target === modal_choose_city_thuexedaihan) {
        modal_choose_city_thuexedaihan.style.display = 'none';
    }
});
//  làm trống input nhập địa chỉ bắt đầu 

var del = document.getElementById("del_address_start");
var ipt_address = document.getElementById("id_address_start");
del.onclick = function () {
    ipt_address.value = "";
}

// chuyển đổi dữ liệu ngày tháng năm
function convertDateFormat(originalDateStr) {
    var parts = originalDateStr.split('/');

    var day = parseInt(parts[0], 10); // Parse day as integer
    var month = parseInt(parts[1], 10); // Parse month as integer
    var year = parseInt(parts[2], 10); // Parse year as integer

    // Array of month names
    var monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var dateObject = new Date(year, month - 1, day);
    return dateObject;
}

// tính số ngày thuê dựa trên ngày đã chọn
function numberRentalDay(d1, d2) {
    if (d2 != '') {
        d1 = d1.getTime();
        d2 = d2.getTime();
        var difference_ms = d2 - d1;
        var difference_days = 1 + (difference_ms / (1000 * 60 * 60 * 24));
        return difference_days;
    }
    else return difference_days = 1;
}

$(document).ready(function () {
    var date1_nhan = "";
    var date2_tra;
    var date3_nhan = convertDateFormat($("#span_date_nhan_modal_choose_time").text());
    var date4_tra = convertDateFormat($("#span_date_tra_modal_choose_time").text());
    var so_ngay_thue = numberRentalDay(date3_nhan, date4_tra);

    function initializeDatepicker() {
        var screenWidth = $(window).width();
        var numberOfMonths = (screenWidth <= 500) ? 1 : 2;

        $('#calendar').datepicker('destroy');
        $("#calendar").datepicker({
            dateFormat: 'dd/mm/yy', // Định dạng ngày tháng
            numberOfMonths: numberOfMonths,  // Hiển thị hai tháng
            minDate: 0,
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7",
                "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ],
            beforeShowDay: function (date) {
                return [true, date3_nhan && ((date.getTime() == date3_nhan.getTime()) || (date4_tra && date >= date3_nhan && date <= date4_tra)) ? "dp-highlight" : ""];
            },
            onSelect: function (dateText) {
                var convert_dateText = convertDateFormat(dateText);
                if (!date1_nhan || date2_tra || convert_dateText < date1_nhan) {
                    $("#span_date_nhan_modal_choose_time").text(dateText);
                    $("#span_date_tra_modal_choose_time").text("Chọn ngày kết thúc");
                    date1_nhan = convertDateFormat(dateText);
                    date3_nhan = date1_nhan;
                    date4_tra = "";
                    so_ngay_thue = 1;
                    $("#total_rental_date").text(so_ngay_thue);
                    localStorage.setItem('StartDay', dateText);
                    $('#a_btn_update_car_rental_datetime').addClass('disabled');
                    $(this).datepicker();
                } else if (convert_dateText.valueOf() == date1_nhan.valueOf()) {
                    $("#span_date_nhan_modal_choose_time").text(dateText);
                    $("#span_date_tra_modal_choose_time").text(dateText);
                    date1_nhan = convertDateFormat(dateText);
                    date3_nhan = date1_nhan;
                    date4_tra = convertDateFormat(dateText);
                    so_ngay_thue = 1;
                    $("#total_rental_date").text(so_ngay_thue);
                    localStorage.setItem('StartDay', dateText);
                    localStorage.setItem('EndDay', dateText);
                    $('#a_btn_update_car_rental_datetime').removeClass('disabled');
                    $(this).datepicker();
                } else {
                    $("#span_date_tra_modal_choose_time").text(dateText);
                    date1_nhan = convertDateFormat(dateText);
                    date4_tra = convertDateFormat(dateText);
                    so_ngay_thue = numberRentalDay(date3_nhan, date4_tra)
                    $("#total_rental_date").text(so_ngay_thue);
                    localStorage.setItem('EndDay', dateText);
                    $('#a_btn_update_car_rental_datetime').removeClass('disabled');
                    $(this).datepicker();
                }
            }
        });
    }
    initializeDatepicker();
    $(window).resize(function () {
        initializeDatepicker();
    });
})


// search-option-->
//Thêm active vào option-item được click + hiển thị file search phù hợp-->
function addActiveClassOptionItem(event) {
    var clickedItem = event.currentTarget;
    var dataHttxValue = clickedItem.getAttribute('data-httx');
    document.querySelectorAll('.search-option .option-item').forEach(function (item) {
        item.classList.remove('active');
    });

    clickedItem.classList.add('active');

    document.querySelectorAll('.search-item').forEach(function (item) {
        item.classList.remove('active');
    });

    document.querySelectorAll('.search-item').forEach(function (item) {
        var itemDataHttxValue = item.getAttribute('data-httx');
        if (itemDataHttxValue === dataHttxValue) {
            item.classList.add('active');
        }
    });
}

document.querySelectorAll('.search-option .option-item').forEach(function (item) {
    item.addEventListener('click', addActiveClassOptionItem);
});

//hiển thị file search phù hợp với option-item acitve khi load trang-->

function updateSearchContent() {
    var activeItem = document.querySelector('.search-option .option-item.active');
    if (activeItem) {
        var dataHttxValue = activeItem.getAttribute('data-httx');
        document.querySelectorAll('.search-item').forEach(function (item) {
            var itemDataHttxValue = item.getAttribute('data-httx');
            if (itemDataHttxValue === dataHttxValue) {
                item.classList.add('active');
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    updateSearchContent();
});


//hiển thị modal trong search-option-->
// --search-option -->