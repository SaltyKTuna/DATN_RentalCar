create database RentalCar_test

-- Bảng Roles
CREATE TABLE Roles (
	RoleID BIGINT PRIMARY KEY IDENTITY(1,1),
	RoleName NVARCHAR(50) NOT NULL UNIQUE,
	Description NVARCHAR(255)
);

-- Bảng Accounts
CREATE TABLE Accounts (
	AccountID BIGINT PRIMARY KEY IDENTITY(1,1),
	FullName NVARCHAR(255) NOT NULL,
	Email NVARCHAR(255) NOT NULL UNIQUE,
	PhoneNumber NVARCHAR(20),
	Username NVARCHAR(100) NOT NULL UNIQUE,
	PasswordHash NVARCHAR(255) NOT NULL,
	RoleID BIGINT NOT NULL,
	Address NVARCHAR(255),
	DateOfBirth DATE,
	FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);

-- Bảng DrivingLicenses
CREATE TABLE DrivingLicenses (
	LicenseID BIGINT PRIMARY KEY IDENTITY(1,1),
	AccountID BIGINT NOT NULL,
	LicenseNumber NVARCHAR(50) NOT NULL,
	DateOfBirth DATE,
	ImageURL NVARCHAR(255),
	LicenseStatus NVARCHAR(50) CHECK (LicenseStatus IN ('Chưa xác thực', 'Đang xác thực', 'Đã xác thực')) NOT NULL,
	FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

-- Bảng Cars
CREATE TABLE Cars (
	CarID BIGINT PRIMARY KEY IDENTITY(1,1),
	Make NVARCHAR(100) NOT NULL,
	Model NVARCHAR(100) NOT NULL,
	Condition NVARCHAR(100) NOT NULL,
	VehicleLocation NVARCHAR(255) NOT NULL,
	Year INT NOT NULL,
	LicensePlate NVARCHAR(20) NOT NULL,
	Color NVARCHAR(100),
	Mileage INT NOT NULL,
	Status NVARCHAR(50) CHECK (Status IN ('Sẵn sàng', 'Đang thuê', 'Bảo trì', 'OFF')) NOT NULL,
	DailyRate DECIMAL(10, 2) NOT NULL,
	ImageURL NVARCHAR(255),
	Seats INT NOT NULL,
	Transmission NVARCHAR(50) NOT NULL,
	EngineCapacity INT NOT NULL,
	FuelType NVARCHAR(50) NOT NULL,
	FuelConsumption DECIMAL(4, 1) NOT NULL,
	DetailCar NVARCHAR(255) NOT NULL,
	Facilities NVARCHAR(255) NOT NULL,
	Rentals BIGINT NULL
);

-- Bảng Motorbikes
CREATE TABLE Motorbikes (
	MotorbikeID BIGINT PRIMARY KEY IDENTITY(1,1),
	Make NVARCHAR(100) NOT NULL,
	Model NVARCHAR(100) NOT NULL,
	Condition NVARCHAR(100) NOT NULL,
	VehicleLocation NVARCHAR(255) NOT NULL,
	Year INT NOT NULL,
	LicensePlate NVARCHAR(20) NOT NULL,
	Color NVARCHAR(50),
	Mileage INT NOT NULL,
	Status NVARCHAR(50) CHECK (Status IN ('Sẵn sàng', 'Đang thuê', 'Bảo trì', 'OFF')) NOT NULL,
	DailyRate DECIMAL(10, 2) NOT NULL,
	EngineCapacity INT NOT NULL,
	FuelType NVARCHAR(50) NOT NULL,
	FuelConsumption DECIMAL(4, 1) NOT NULL,
	ImageURL NVARCHAR(255),
	DetailBike NVARCHAR(255) NOT NULL,
	Facilities NVARCHAR(255) NOT NULL,
	Rentals BIGINT NULL
);

-- Bảng Discounts
CREATE TABLE Discounts (
	DiscountID BIGINT PRIMARY KEY IDENTITY(1,1),
	DiscountCode NVARCHAR(50) NOT NULL UNIQUE,
	Description NVARCHAR(255),
	DiscountPercentage DECIMAL(5, 2) CHECK (DiscountPercentage >= 0 AND DiscountPercentage <= 100) NOT NULL,
	StartDate DATE NOT NULL,
	EndDate DATE NOT NULL,
	Status NVARCHAR(50) CHECK (Status IN ('Còn hiệu lực', 'Hết hạn')) NOT NULL
);

-- Bảng Drivers
CREATE TABLE Drivers (
	DriverID BIGINT PRIMARY KEY IDENTITY(1,1),
	FullName NVARCHAR(255) NOT NULL,
	PhoneNumber NVARCHAR(20) NOT NULL,
	LicenseNumber NVARCHAR(50) NOT NULL UNIQUE,
	ExperienceYears INT NOT NULL,
	Status NVARCHAR(50) CHECK (Status IN ('Sẵn sàng', 'Bận', 'Nghỉ việc')) NOT NULL,
	ImageURL NVARCHAR(255)
);

CREATE TABLE ServicePricing (
	PriceID BIGINT PRIMARY KEY IDENTITY(1,1),
	VehicleType NVARCHAR(50) CHECK (VehicleType IN ('Car', 'Motorbike')) NOT NULL,
	CarID BIGINT NULL,
	MotorbikeID BIGINT NULL,
	HourlyRate DECIMAL(10, 2) NOT NULL,
	DailyRate DECIMAL(10, 2) NOT NULL,
	LongTermRate DECIMAL(10, 2) NOT NULL,
	PercentDiscount DECIMAL(5, 2) NULL,
	Description NVARCHAR(255),
	FOREIGN KEY (CarID) REFERENCES Cars(CarID) ON DELETE CASCADE,
	FOREIGN KEY (MotorbikeID) REFERENCES Motorbikes(MotorbikeID) ON DELETE CASCADE,
	CHECK (
		(VehicleType = 'Car' AND CarID IS NOT NULL AND MotorbikeID IS NULL) 
		OR (VehicleType = 'Motorbike' AND MotorbikeID IS NOT NULL AND CarID IS NULL)
	)
);

-- Bảng Rentals
CREATE TABLE Rentals (
	RentalID BIGINT PRIMARY KEY IDENTITY(1,1),
	AccountID BIGINT NOT NULL,
	RentalDate DATE NOT NULL,
	ReturnDate DATE NOT NULL,
	ActualReturnDate DATE,
	TotalCost DECIMAL(10, 2) NOT NULL,
	RenStatus NVARCHAR(50) CHECK (RenStatus IN ('Đang giao xe', 'Đang thuê', 'Hoàn tất')) NOT NULL,
	DiscountID BIGINT NULL,
	HaveDriver BIT NOT NULL,
	FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID),
	FOREIGN KEY (DiscountID) REFERENCES Discounts(DiscountID)
);

-- Bảng RentalVehicles
CREATE TABLE RentalVehicles (
	RentalVehicleID BIGINT PRIMARY KEY IDENTITY(1,1),
	RentalID BIGINT NOT NULL,
	CarID BIGINT NULL,
	MotorbikeID BIGINT NULL,
	VehicleType NVARCHAR(50) CHECK (VehicleType IN ('Car', 'Motorbike')) NOT NULL,
	DriverID BIGINT NULL,
	FOREIGN KEY (DriverID) REFERENCES Drivers(DriverID),
	FOREIGN KEY (RentalID) REFERENCES Rentals(RentalID),
	FOREIGN KEY (CarID) REFERENCES Cars(CarID),
	FOREIGN KEY (MotorbikeID) REFERENCES Motorbikes(MotorbikeID),
	CHECK (
		(VehicleType = 'Car' AND CarID IS NOT NULL AND MotorbikeID IS NULL) 
		OR (VehicleType = 'Motorbike' AND CarID IS NULL AND MotorbikeID IS NOT NULL)
	)
);

-- Bảng CarMaintenance
CREATE TABLE CarMaintenance (
	MaintenanceID BIGINT PRIMARY KEY IDENTITY(1,1),
	CarID BIGINT NULL,
	MotorbikeID BIGINT NULL,
	MaintenanceDate DATE NOT NULL,
	Description NVARCHAR(MAX) NOT NULL,
	Cost DECIMAL(10, 2) NOT NULL,
	FOREIGN KEY (CarID) REFERENCES Cars(CarID),
	FOREIGN KEY (MotorbikeID) REFERENCES Motorbikes(MotorbikeID),
	CHECK ((CarID IS NOT NULL AND MotorbikeID IS NULL) OR (CarID IS NULL AND MotorbikeID IS NOT NULL))
);

-- Bảng Payments
CREATE TABLE Payments (
	PaymentID BIGINT PRIMARY KEY IDENTITY(1,1),
	RentalID BIGINT NOT NULL,
	PaymentDate DATE NOT NULL,
	Amount DECIMAL(10, 2) NOT NULL,
	PaymentMethod NVARCHAR(50) CHECK (PaymentMethod IN ('Thẻ', 'Tiền mặt', 'Chuyển khoản')) NOT NULL,
	FOREIGN KEY (RentalID) REFERENCES Rentals(RentalID)
);

-- Bảng Feedbacks
CREATE TABLE Feedbacks (
	FeedbackID BIGINT PRIMARY KEY IDENTITY(1,1),
	RentalID BIGINT NOT NULL,
	Rating INT CHECK (Rating >= 1 AND Rating <= 5) NOT NULL,
	Comment NVARCHAR(255),
	FeedbackDate DATE NOT NULL,
	FOREIGN KEY (RentalID) REFERENCES Rentals(RentalID)
);

-- Bảng AdditionalFees
CREATE TABLE AdditionalFees (
	FeeID BIGINT PRIMARY KEY IDENTITY(1,1),
	RentalVehicleID BIGINT NOT NULL,
	FeeType NVARCHAR(50) NOT NULL,
	Amount DECIMAL(10, 2) NOT NULL,
	Description NVARCHAR(255),
	FOREIGN KEY (RentalVehicleID) REFERENCES RentalVehicles(RentalVehicleID)
);

-- Bảng Damages
CREATE TABLE Damages (
	DamageID BIGINT PRIMARY KEY IDENTITY(1,1),
	RentalVehicleID BIGINT NOT NULL,
	Description NVARCHAR(255) NOT NULL,
	RepairCost DECIMAL(10, 2) NOT NULL,
	DamageDate DATE NOT NULL,
	FOREIGN KEY (RentalVehicleID) REFERENCES RentalVehicles	(RentalVehicleID)
);

-- Insert Data Test

INSERT INTO roles (role_name, description) VALUES 
    ('admin', 'Quản trị hệ thống'),
    ('customer', 'Khách hàng sử dụng dịch vụ'),
    ('driver', 'Tài xế lái xe');

INSERT INTO accounts (full_name, email, phone_number, username, password_hash, address, date_of_birth) VALUES 
    ('Nguyen Van A', 'nguyenvana@example.com', '0909123456', 'nguyenvana', 'hashedpassword1', '123 Street, Hanoi', '1990-05-15'),
    ('Tran Thi B', 'tranb@example.com', '0909123457', 'tranb', 'hashedpassword2', '456 Avenue, Ho Chi Minh', '1985-08-10'),
    ('Le Quoc C', 'lequocc@example.com', '0909123458', 'lequocc', 'hashedpassword3', '789 Road, Da Nang', '1992-11-22');

INSERT INTO driving_licenses (accountid, license_number, date_of_birth, image_url, license_status) VALUES 
    (1, '123456789', '1990-05-15', 'image1.jpg', 'Đã xác thực'),
    (2, '987654321', '1985-08-10', 'image2.jpg', 'Chưa xác thực');

INSERT INTO cars (make, model, condition, vehicle_location, year, license_plate, color, mileage, status, daily_rate, image_url, seats, transmission, engine_capacity, fuel_type, fuel_consumption, detail_car, facilities) VALUES 
    ('Toyota', 'Camry', 'Good', 'Hanoi', 2020, '30A-12345', 'Black', 50000, 'Sẵn sàng', 500000, 'car_image1.jpg', 5, 'Automatic', 2000, 'Petrol', 8.5, 'Sedan, 4-door', 'Air Conditioner, GPS'),
    ('Honda', 'Civic', 'New', 'Ho Chi Minh', 2021, '50A-98765', 'White', 30000, 'Đang thuê', 600000, 'car_image2.jpg', 5, 'Automatic', 1800, 'Petrol', 7.5, 'Sedan, 4-door', 'Air Conditioner, GPS');

INSERT INTO motorbikes (make, model, condition, vehicle_location, year, license_plate, color, mileage, status, daily_rate, engine_capacity, fuel_type, fuel_consumption, image_url, detail_bike, facilities) VALUES 
    ('Yamaha', 'Exciter', 'Good', 'Hanoi', 2019, '29B1-23456', 'Blue', 20000, 'Sẵn sàng', 100000, 150, 'Petrol', 2.5, 'bike_image1.jpg', 'Sport Bike', 'Helmet, GPS'),
    ('Honda', 'Air Blade', 'New', 'Da Nang', 2020, '43B2-67890', 'Red', 10000, 'Bảo trì', 80000, 125, 'Petrol', 2.0, 'bike_image2.jpg', 'Scooter', 'Helmet, GPS');

INSERT INTO discounts (discount_code, description, discount_percentage, start_date, end_date, status) VALUES 
    ('DISCOUNT2023', 'Giảm giá 10% cho thuê xe', 10, '2023-01-01', '2023-12-31', 'Còn hiệu lực'),
    ('NEWYEAR2024', 'Giảm giá 20% dịp năm mới', 20, '2024-01-01', '2024-02-01', 'Còn hiệu lực');

INSERT INTO drivers (full_name, phone_number, license_number, experience_years, status, image_url) VALUES 
    ('Pham Van D', '0909345678', '987654321', 5, 'Sẵn sàng', 'driver_image1.jpg'),
    ('Nguyen Thi E', '0909123765', '876543210', 7, 'Bận', 'driver_image2.jpg');

INSERT INTO service_pricing (vehicle_type, car_id, motorbike_id, hourly_rate, daily_rate, long_term_rate, percent_discount, description) VALUES 
    ('Car', 1, NULL, 100000, 500000, 10000000, 10, 'Giá thuê xe Toyota Camry'),
    ('Motorbike', NULL, 1, 20000, 100000, 2000000, 5, 'Giá thuê xe Yamaha Exciter');

INSERT INTO rentals (account_id, rental_date, return_date, actual_return_date, total_cost, ren_status, discount_id, have_driver) VALUES 
    (1, '2024-09-01', '2024-09-05', '2024-09-05', 2000000, 'Hoàn tất', 1, 1),
    (2, '2024-09-10', '2024-09-15', NULL, 3000000, 'Đang thuê', NULL, 0);

INSERT INTO rental_vehicles (rental_id, car_id, motorbike_id, vehicle_type, driver_id) VALUES 
    (1, 1, NULL, 'Car', 1),
    (2, NULL, 1, 'Motorbike', NULL);

INSERT INTO car_maintenance (car_id, motorbike_id, maintenance_date, description, cost) VALUES 
    (1, NULL, '2024-09-20', 'Thay dầu động cơ và kiểm tra lốp xe', 500000),
    (NULL, 1, '2024-09-22', 'Bảo dưỡng xe định kỳ', 300000);

INSERT INTO payments (rentalid, payment_date, amount, payment_method) VALUES 
    (1, '2024-09-05', 2000000, 'Thẻ'),
    (2, '2024-09-15', 3000000, 'Tiền mặt');

INSERT INTO feedbacks (rentalid, rating, comment, feedback_date) VALUES 
    (1, 5, 'Dịch vụ tốt và xe chất lượng', '2024-09-06'),
    (2, 4, 'Xe ổn nhưng giao xe hơi trễ', '2024-09-16');

INSERT INTO additional_fees (rental_vehicleid, fee_type, amount, description) VALUES 
    (1, 'Phí giao xe ngoài giờ', 50000, 'Giao xe sau 10 giờ tối'),
    (2, 'Phí vệ sinh xe', 100000, 'Xe bẩn sau khi trả lại');

INSERT INTO damages (rental_vehicleid, description, repair_cost, damage_date) VALUES 
    (1, 'Trầy xước phần đầu xe', 500000, '2024-09-05'),
    (2, 'Hỏng gương chiếu hậu', 300000, '2024-09-10');
