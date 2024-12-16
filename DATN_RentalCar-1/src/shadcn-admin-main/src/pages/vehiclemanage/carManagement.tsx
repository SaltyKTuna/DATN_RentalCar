import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface Car {
  carId: number;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  fuelConsumption: number;
  dailyRate: number;
  status: string;
  imageUrl: string;
  condition: string;
  licensePlate: string;
  facilities: string;
  detailCar: string;
  engineCapacity: number;
  seats: number;
  vehicleLocation: string;
  percentDiscount: number;
}

const CarManagement: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { toast } = useToast();

  const [newCar, setNewCar] = useState<Car>({
    carId: 0,
    make: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    mileage: 0,
    transmission: "Tự động",
    fuelType: "Xăng",
    fuelConsumption: 0,
    dailyRate: 0,
    status: "Sẵn sàng",
    imageUrl: "",
    condition: "",
    licensePlate: "",
    facilities: "",
    detailCar: "",
    engineCapacity: 0,
    seats: 0,
    vehicleLocation: "",
    percentDiscount: 0,
  });

  useEffect(() => {
    fetchCars();
    return () => {
      imagePreviews.forEach(URL.revokeObjectURL);
    };
  }, [uploadedImages]);

  const fetchCars = () => {
    axios
      .get("http://localhost:8080/api/car")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => console.error("Error fetching cars:", error));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (imagePreviews.length + files.length > 5) {
      toast({
        title: "Error",
        description: "Chỉ được phép tải lên tối đa 5 ảnh",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadedFilesAndUrls = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "car");

        const response = await axios.post(`http://localhost:8080/api/uploadImg`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const relativeUrl = response.data.imageUrl.startsWith("http")
          ? response.data.imageUrl.split('http://localhost:8080')[1]
          : response.data.imageUrl;

        uploadedFilesAndUrls.push({ file, url: relativeUrl });
      }

      const uploadedUrls = uploadedFilesAndUrls.map(item => item.url);
      setUploadedImages(prev => [...prev, ...uploadedUrls]);

      const newPreviews = uploadedFilesAndUrls.map(item => URL.createObjectURL(item.file));
      setImagePreviews(prev => [...prev, ...newPreviews]);

    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        title: "Error",
        description: "Lỗi khi tải ảnh lên",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);

    setImagePreviews(newImagePreviews);

    const newUploadedImages = [...uploadedImages];
    newUploadedImages.splice(index, 1);

    setUploadedImages(newUploadedImages);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [id]:
        value === ""
          ? ""
          : id === "year" || id === "mileage" || id === "dailyRate" || id === "fuelConsumption"
            ? Number(value)
            : value,
    }));
  };

  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setNewCar((prevCar) => {
      let updatedFacilities = prevCar.facilities;
      if (checked) {
        updatedFacilities = updatedFacilities.length === 0 ? value : updatedFacilities + ", " + value;
      } else {
        updatedFacilities = updatedFacilities.replace(new RegExp(`\\b${value}\\b,?\\s*`), '');
      }
      return {
        ...prevCar,
        facilities: updatedFacilities,
      };
    });
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const addMaintenance = (car: Car) => {
    const maintenanceData = {
      maintenanceDate: new Date().toISOString(),
      description: `Bảo dưỡng cho xe ${car.make} ${car.model} (${car.year})`,
      cost: 0,
      carId: car.carId,
    };

    axios
      .post("http://localhost:8080/api/car-maintenance", maintenanceData)
      .then(() => {
        console.log("Maintenance record added successfully");
      })
      .catch((error) => console.error("Error adding maintenance:", error));
  };

  const validateCar = (): boolean => {
    if (!newCar.make.trim()) {
      toast({
        title: "Error",
        description: "Hãng xe không được để trống.",
        variant: "destructive",
      });
      return false;
    }
    if (!newCar.model.trim()) {
      toast({
        title: "Error",
        description: "Mẫu xe không được để trống.",
        variant: "destructive",
      });
      return false;
    }
    if (!newCar.transmission) {
      toast({
        title: "Error",
        description: "Vui lòng chọn loại hộp số.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleAddCar = async () => {
    if (!validateCar()) return;

    const carDataToSend = {
      ...newCar,
      imageUrl: uploadedImages.join(",")
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/car/${newCar.carId}`, carDataToSend);

        if (newCar.status === "Bảo dưỡng") {
          await addMaintenance(newCar);
        } else {
          await deleteMaintenanceByCarId(newCar.carId);
        }

        toast({
          title: "Success",
          description: "Cập nhật thông tin xe thành công",
        });
      } else {
        await axios.post("http://localhost:8080/api/car", carDataToSend);

        if (newCar.status === "Bảo dưỡng") {
          await addMaintenance(newCar);
        }

        toast({
          title: "Success",
          description: "Thêm xe thành công",
        });
      }

      fetchCars();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing ? "Cập nhật thông tin xe thất bại" : "Thêm xe thất bại",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCar = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa xe này?")) {
      try {
        const carToDelete = cars.find(car => car.carId === id);

        if (carToDelete) {
          carToDelete.imageUrl.split(',').forEach(url => {
            const index = imagePreviews.findIndex(preview => preview.includes(url));
            if (index > -1) {
              URL.revokeObjectURL(imagePreviews[index]);
            }
          });
        }

        await axios.delete(`http://localhost:8080/api/car/${id}`);
        toast({
          title: "Success",
          description: "Xóa xe thành công",
        });
        fetchCars();
        resetForm();
      } catch (error) {
        toast({
          title: "Error",
          description: "Xóa xe thất bại",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditCar = (car: Car) => {
    setIsEditing(true);
    setNewCar(car);

    const imageUrls = car.imageUrl.split(',').filter(Boolean);
    setUploadedImages(imageUrls);

    setImagePreviews(imageUrls.map(url => `http://localhost:8080/assets/images/car/${url}`));

    toast({
      title: "Info",
      description: "Đang chỉnh sửa thông tin xe",
    });
  };

  const deleteMaintenanceByCarId = (carId: number) => {
    axios
      .delete(`http://localhost:8080/api/car-maintenance/${carId}`)
      .then(() => {
        console.log(`Đã xóa bảo dưỡng của xe có ID ${carId}`);
      })
      .catch((error) => console.error("Lỗi khi xóa bảo dưỡng:", error));
  };

  const resetForm = () => {
    setNewCar({
      carId: 0,
      make: "",
      model: "",
      year: new Date().getFullYear(),
      color: "",
      mileage: 0,
      transmission: "Tự động",
      fuelType: "Xăng",
      fuelConsumption: 0,
      dailyRate: 0,
      status: "Sẵn sàng",
      imageUrl: "",
      condition: "",
      licensePlate: "",
      facilities: "",
      detailCar: "",
      engineCapacity: 0,
      seats: 0,
      vehicleLocation: "",
      percentDiscount: 0,
    });
    setUploadedImages([]);
    setImagePreviews([]);
    setIsEditing(false);
  };

  return (
    <div className="h-screen overflow-auto">
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Quản Lí Xe Hơi</h2>

        <div className="p-6 border border-gray-300 shadow-md rounded-lg">
          <div className="grid grid-cols-3 gap-6">

            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Tải lên ảnh của xe</h3>

              <div className="border-dashed border-2 border-gray-400 rounded-lg h-48 flex items-center justify-center text-gray-500 mb-4 relative group overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="opacity-0 absolute h-full w-full cursor-pointer"
                  multiple
                />

                {isUploading && (
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                  </div>
                )}

                {imagePreviews[0] ? (
                  <img
                    src={imagePreviews[0]}
                    alt="Ảnh Toàn Xe"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <>
                    <p className="font-medium text-center">Ảnh Toàn Xe</p>
                  </>
                )}

                {imagePreviews[0] && (
                  <button
                    onClick={() => handleDeleteImage(0)}
                    className="absolute top-0 right-0 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:outline-none"
                  >
                    &times;
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {["Ảnh Đầu Xe", "Ảnh Đuôi Xe", "Ảnh Đồng Hồ", "Ảnh Phụ"].map((label, index) => (
                  <div
                    key={index}
                    className="border-dashed border-2 border-gray-400 rounded-lg h-24 flex items-center justify-center text-gray-500 relative group overflow-hidden"
                  >
                    {imagePreviews[index + 1] ? (
                      <div className="relative group-hover:block">
                        <img
                          src={imagePreviews[index + 1]}
                          alt={label}
                          className="object-cover h-full w-full rounded-lg"
                        />
                        <button
                          onClick={() => handleDeleteImage(index + 1)}
                          className="absolute top-0 right-0 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:outline-none"
                        >
                          &times;
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-gray-400">
                        <p className="font-medium">{label}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>



            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Thông Tin Xe</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="make" className="block font-medium">Hãng xe</label>
                  <input type="text" id="make" value={newCar.make} onChange={handleFormChange} className="w-full p-2 bg-muted border rounded" />
                </div>
                <div>
                  <label htmlFor="model" className="block font-medium">Mẫu xe</label>
                  <input type="text" id="model" value={newCar.model} onChange={handleFormChange} className="w-full p-2 bg-muted  border rounded" />
                </div>
                <div>
                  <label htmlFor="year" className="block font-medium">Năm sản xuất</label>
                  <input type="number" id="year" value={newCar.year} onChange={handleFormChange} className="w-full p-2 bg-muted  border rounded" />
                </div>
                <div>
                  <label htmlFor="color" className="block font-medium">Màu sắc</label>
                  <input type="text" id="color" value={newCar.color} onChange={handleFormChange} className="w-full p-2 bg-muted  border rounded" />
                </div>
                <div>
                  <label htmlFor="mileage" className="block font-medium">Số Km</label>
                  <input type="number" id="mileage" value={newCar.mileage} onChange={handleFormChange} className="w-full p-2 bg-muted  border rounded" />
                </div>
                <div>
                  <label htmlFor="fuelConsumption" className="block font-medium">Tiêu thụ (L/100km)</label>
                  <input type="number" id="fuelConsumption" value={newCar.fuelConsumption} onChange={handleFormChange} className="w-full p-2 bg-muted  border rounded" />
                </div>
                <div>
                  <label htmlFor="licensePlate" className="block font-medium">Biển số xe</label>
                  <input type="text" id="licensePlate" value={newCar.licensePlate} onChange={handleFormChange} className="w-full p-2 bg-muted  border rounded" />
                </div>
                <div>
                  <label htmlFor="detailCar" className="block font-medium">Chi tiết</label>
                  <input type="text" id="detailCar" value={newCar.detailCar} onChange={handleFormChange} className="w-full p-2 bg-muted  border rounded" />
                </div>
                <div>
                  <label htmlFor="vehicleLocation" className="block font-medium">Địa điểm</label>
                  <input type="text" id="vehicleLocation" value={newCar.vehicleLocation} onChange={handleFormChange} className="w-full p-2 bg-muted border rounded" />
                </div>
              </form>

            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Thông Tin Bổ Sung</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="transmission" className="block font-medium">Hộp số</label>
                  <select id="transmission" value={newCar.transmission} onChange={handleFormChange} className="w-full p-2 bg-muted border rounded">
                    <option value="Tự động">Tự động</option>
                    <option value="Số tay">Số tay</option>
                    <option value="Bán tự động">Bán tự động</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fuelType" className="block font-medium">Loại Nhiên Liệu</label>
                  <select id="fuelType" value={newCar.fuelType} onChange={handleFormChange} className="w-full p-2 bg-muted border rounded">
                    <option value="Xăng">Xăng</option>
                    <option value="Dầu">Dầu</option>
                    <option value="Điện">Điện</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dailyRate" className="block font-medium">Giá thuê mỗi ngày (VND)</label>
                  <input type="number" id="dailyRate" value={newCar.dailyRate} onChange={handleFormChange} className="w-full p-2 bg-muted border rounded" />
                </div>
                <div>
                  <label htmlFor="engineCapacity" className="block font-medium">Mã lực</label>
                  <input type="number" id="engineCapacity" value={newCar.engineCapacity} onChange={handleFormChange} className="w-full p-2 bg-muted border rounded" />
                </div>
                <div>
                  <label htmlFor="status" className="block font-medium">Trạng thái</label>
                  <select id="status" value={newCar.status} onChange={handleFormChange} className="w-full p-2 bg-muted border rounded">
                    <option value="Sẵn sàng">Sẵn sàng</option>
                    <option value="Đang thuê">Đang thuê</option>
                    <option value="Bảo dưỡng">Bảo dưỡng</option>
                    <option value="Không khả dụng">Không khả dụng</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="condition" className="block font-medium">Tình trạng</label>
                  <input type="text" id="condition" value={newCar.condition} onChange={handleFormChange} className="w-full p-2 bg-muted border rounded" />
                </div>
                <div className="relative">
                  <label htmlFor="facilities" className="block font-medium">Nội thất</label>
                  <div
                    className="w-full p-2 border  rounded cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {newCar.facilities ? newCar.facilities : "Chọn nội thất"}
                  </div>

                  {dropdownOpen && (
                    <div className="absolute top-12 left-0 w-full bg-muted  shadow-lg rounded border mt-2">
                      <div className="p-4">
                        <div className="space-y-2">
                          {["Ghế da", "Ghế chỉnh điện", "Điều hòa", "Màn hình cảm ứng", "Camera lùi"].map((facility) => (
                            <div key={facility} className="flex items-center">
                              <input
                                type="checkbox"
                                id={facility}
                                value={facility}
                                checked={newCar.facilities.includes(facility)}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                              />
                              <label htmlFor={facility}>{facility}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="seats" className="block font-medium">Số ghế</label>
                  <input type="number" id="seats" value={newCar.seats} onChange={handleFormChange} className="w-full p-2 bg-muted  border rounded" />
                </div>


              </form>

              <div className="flex justify-start space-x-4 mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleAddCar}
                >
                  {isEditing ? "Cập Nhật" : "Thêm"}
                </button>

                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={resetForm}
                >
                  Làm Mới
                </button>

              </div>

            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4  text-center">Tìm Kiếm Xe</h3>
          <input
            type="text"
            placeholder="Tìm kiếm theo hãng xe, mẫu xe hoặc màu sắc..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border bg-muted  rounded"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4  text-center">Danh sách xe</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr >
                  <th className="p-3 text-left  font-medium">ID</th>
                  <th className="p-3 text-left font-medium">Hãng Xe</th>
                  <th className="p-3 text-left font-medium">Mẫu Xe</th>
                  <th className="p-3 text-left font-medium">Năm Sản Xuất</th>
                  <th className="p-3 text-left font-medium">Màu Sắc</th>
                  <th className="p-3 text-left font-medium">Số Km</th>
                  <th className="p-3 text-left font-medium">Hộp Số</th>
                  <th className="p-3 text-left font-medium">Loại Nhiên Liệu</th>
                  <th className="p-3 text-left font-medium">Tiêu Thụ (L/100km)</th>
                  <th className="p-3 text-left font-medium">Giá Thuê (VND)</th>
                  <th className="p-3 text-left font-medium">Trạng Thái</th>
                  <th className="p-3 text-left font-medium">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((car) => (
                  <tr key={car.carId} className="border-t hover:bg-muted/50">
                    <td className="p-3">{car.carId}</td>
                    <td className="p-3">{car.make}</td>
                    <td className="p-3">{car.model}</td>
                    <td className="p-3">{car.year}</td>
                    <td className="p-3">{car.color}</td>
                    <td className="p-3">{car.mileage.toLocaleString()} km</td>
                    <td className="p-3">{car.transmission}</td>
                    <td className="p-3">{car.fuelType}</td>
                    <td className="p-3">{car.fuelConsumption.toFixed(1)}</td>
                    <td className="p-3">{car.dailyRate.toLocaleString()} VND</td>
                    <td className="p-3">{car.status}</td>
                    <td className="p-3 flex space-x-2">
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-lg hover:bg-gray-800"
                        onClick={() => handleEditCar(car)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => handleDeleteCar(car.carId)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarManagement;
