import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";

interface Motorbike {
  gearBox: string | null;
  motorbikeId: number;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  fuelType: string;
  fuelConsumption: number;
  dailyRate: number;
  status: string;
  imageUrl: string;
  condition: string;
  facilities: string;
  engineCapacity: number;
  vehicleLocation: string;
  percentDiscount: number;
  licensePlate: string;
  detailBike: string;
}


const MotorbikeManagement: React.FC = () => {
  const [motorbikes, setMotorbikes] = useState<Motorbike[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);



  const [newMotorbike, setNewMotorbike] = useState<Motorbike>({
    gearBox: null,
    motorbikeId: 0,
    make: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    mileage: 0,
    fuelType: "Petrol",
    fuelConsumption: 0,
    dailyRate: 0,
    status: "Sẵn sàng",
    imageUrl: "",
    condition: "Good",
    facilities: "",
    engineCapacity: 0,
    vehicleLocation: "",
    percentDiscount: 0,
    licensePlate: "",
    detailBike: "",
  });

  useEffect(() => {
    fetchMotorbikes();
  }, []);

  const fetchMotorbikes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/motorbikes");
      const data = response.data;
      // Đảm bảo data là mảng, nếu không thì gán mảng rỗng
      setMotorbikes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching motorbikes:", error);
      setMotorbikes([]); // Gán mảng rỗng khi gặp lỗi
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Kiểm tra xem số ảnh đã tải lên + ảnh mới chọn có vượt quá 5 ảnh không
    if (imagePreviews.length + files.length > 5) {
      alert("Chỉ được phép tải lên tối đa 5 ảnh");
      return;
    }

    setIsUploading(true);

    try {
      const uploadedFilesAndUrls = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "motorbike");

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

      // Cập nhật danh sách ảnh tạm thời và thêm ảnh mới vào ảnh đã có
      const uploadedUrls = uploadedFilesAndUrls.map(item => item.url);
      setUploadedImages(prev => [...prev, ...uploadedUrls]); // Thêm ảnh mới vào ảnh đã có

      // Tạo preview ảnh và thêm ảnh mới vào ảnh đã có
      const newPreviews = uploadedFilesAndUrls.map(item => URL.createObjectURL(item.file));
      setImagePreviews(prev => [...prev, ...newPreviews]); // Thêm preview ảnh mới

    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Lỗi khi tải ảnh lên");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = (index: number) => {
    // Xóa ảnh khỏi mảng imagePreviews
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);

    // Cập nhật lại mảng imagePreviews
    setImagePreviews(newImagePreviews);

    // Nếu bạn cũng muốn xóa ảnh khỏi uploadedImages, làm tương tự
    const newUploadedImages = [...uploadedImages];
    newUploadedImages.splice(index, 1);

    // Cập nhật lại mảng uploadedImages
    setUploadedImages(newUploadedImages);
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addMaintenance = (motorbike: Motorbike) => {
    const maintenanceData = {
      maintenanceDate: new Date().toISOString(),
      description: `Bảo dưỡng cho xe ${motorbike.make} ${motorbike.model} (${motorbike.year})`,
      cost: 0,
      motorbikeId: motorbike.motorbikeId,
    };

    axios
      .post("http://localhost:8080/api/car-maintenance", maintenanceData)
      .then(() => {
        console.log("Maintenance record added successfully");
      })
      .catch((error) => console.error("Error adding maintenance:", error));
  };

  const deleteMaintenanceByMotorbikeId = (motorbikeId: number) => {
    axios
      .delete(`http://localhost:8080/api/car-maintenance/${motorbikeId}`)
      .then(() => {
        console.log(`Đã xóa bảo dưỡng của xe có ID ${motorbikeId}`);
      })
      .catch((error) => console.error("Lỗi khi xóa bảo dưỡng:", error));
  };

  const validateMotorbike = (): boolean => {
    if (!newMotorbike.make.trim()) {
      alert("Hãng xe không được để trống.");
      return false;
    }
    if (!newMotorbike.model.trim()) {
      alert("Mẫu xe không được để trống.");
      return false;
    }
    if (!newMotorbike.gearBox) {
      alert("Vui lòng chọn loại hộp số.");
      return false;
    }
    return true;
  };

  const handleAddMotorbike = () => {
    if (!validateMotorbike()) return;

    const motorbikeDataToSend = {
      ...newMotorbike,
      imageUrl: uploadedImages.join(",") // Chỉ lưu ảnh đã được tải lên
    };

    if (isEditing) {
      // Cập nhật xe hiện tại
      axios
        .put(`http://localhost:8080/api/motorbikes/${newMotorbike.motorbikeId}`, motorbikeDataToSend)
        .then(() => {
          if (newMotorbike.status === "Bảo dưỡng") {
            addMaintenance(newMotorbike);
          } else {
            deleteMaintenanceByMotorbikeId(newMotorbike.motorbikeId);
          }
          fetchMotorbikes();
          resetForm();
        })
        .catch((error) => console.error("Lỗi khi cập nhật xe:", error));
    } else {
      // Thêm mới xe
      axios
        .post("http://localhost:8080/api/motorbikes", motorbikeDataToSend)
        .then(() => {
          if (newMotorbike.status === "Bảo dưỡng") {
            addMaintenance(newMotorbike);
          }
          fetchMotorbikes();
          resetForm();
        })
        .catch((error) => console.error("Lỗi khi thêm xe:", error));
    }
  };

  const handleEditMotorbike = (motorbike: Motorbike) => {
    setIsEditing(true);
    setNewMotorbike(motorbike);

    const imageUrls = motorbike.imageUrl.split(',').filter(Boolean);
    setUploadedImages(imageUrls);

    setImagePreviews(imageUrls.map(url => `http://localhost:8080/assets/images/motorbike/${url}`));

  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa xe này?")) {
      const motorbikeToDelete = motorbikes.find(motorbike => motorbike.motorbikeId === id);

      if (motorbikeToDelete) {
        motorbikeToDelete.imageUrl.split(',').forEach(url => {
          const index = imagePreviews.findIndex(preview => preview.includes(url));
          if (index > -1) {
            URL.revokeObjectURL(imagePreviews[index]);
          }
        });
      }
      axios
        .delete(`http://localhost:8080/api/motorbikes/${id}`)
        .then(() => fetchMotorbikes())
        .catch((error) => console.error("Error deleting motorbike:", error));
      resetForm();
    }
  };


  const resetForm = () => {
    setNewMotorbike({
      gearBox: "Xe Số",
      motorbikeId: 0,
      make: "",
      model: "",
      year: new Date().getFullYear(),
      color: "",
      mileage: 0,
      fuelType: "Petrol",
      fuelConsumption: 0,
      dailyRate: 0,
      status: "Sẵn sàng",
      imageUrl: "",
      condition: "Good",
      facilities: "",
      engineCapacity: 0,
      vehicleLocation: "",
      percentDiscount: 0,
      licensePlate: "",
      detailBike: "",
    });
    setUploadedImages([]);
    setImagePreviews([]);
    setIsEditing(false);
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setNewMotorbike({ ...newMotorbike, [id]: value });
  };

  const filteredMotorbikes = Array.isArray(motorbikes)
    ? motorbikes.filter((motorbike) =>
      [motorbike.make, motorbike.model, motorbike.color]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    : [];


  return (
    <div className="h-screen overflow-auto">
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Quản Lý Xe Máy</h2>

        {/* Form Section */}
        <div className="p-6 border border-gray-300 shadow-md rounded-lg ">
          <div className="grid grid-cols-3 gap-6">
            {/* Upload Image Section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Tải lên ảnh của xe</h3>

              {/* Ảnh Toàn Xe */}
              <div className="border-dashed border-2 border-gray-400 rounded-lg h-48 w-full flex flex-col items-center justify-center text-gray-500 mb-4 relative group overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="opacity-0 absolute h-full w-full cursor-pointer"
                  multiple // Cho phép chọn nhiều ảnh
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
                    <p className="font-medium">Ảnh Toàn Xe</p>
                    <p className="text-sm text-gray-400">Kích thước: 1200 x 600 px • JPG, PNG</p>
                    <p className="text-sm text-gray-400">Dung lượng tối đa: 5 MB</p>
                  </>
                )}

                {/* Hover button for delete */}
                {imagePreviews[0] && (
                  <button
                    onClick={() => handleDeleteImage(0)} // Xóa ảnh "Ảnh Toàn Xe"
                    className="absolute top-0 right-0 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:outline-none"
                  >
                    &times;
                  </button>
                )}
              </div>

              {/* Display uploaded images */}
              <div className="grid grid-cols-2 gap-4">
                {["Ảnh Đầu Xe", "Ảnh Đuôi Xe", "Ảnh Đồng Hồ", "Ảnh Phụ"].map((label, index) => (
                  <div
                    key={index}
                    className="border-dashed border-2 border-gray-400 rounded-lg h-24 w-full flex items-center justify-center text-gray-500 relative group overflow-hidden"
                  >
                    {imagePreviews[index + 1] ? (
                      <div className="relative">
                        <img
                          src={imagePreviews[index + 1]}
                          alt={label}
                          className="object-cover w-full h-full rounded-lg"
                        />
                        <button
                          onClick={() => handleDeleteImage(index + 1)} // Xóa ảnh theo index
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


            {/* Thông Tin Xe */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Thông Tin Xe</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="make" className="block font-medium">
                    Hãng xe
                  </label>
                  <input
                    type="text"
                    id="make"
                    value={newMotorbike.make}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted border rounded"
                  />
                </div>

                <div>
                  <label htmlFor="gearBox" className="block font-medium">Loại hộp số</label>
                  <select
                    id="gearBox"
                    value={newMotorbike.gearBox || ""}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted border rounded"
                  >
                    <option value="">-- Chọn loại hộp số --</option>
                    <option value="Xe Số">Xe số</option>
                    <option value="Xe Côn">Xe côn</option>
                    <option value="Xe ga">Xe ga</option>
                  </select>
                </div>



                <div>
                  <label htmlFor="model" className="block font-medium">
                    Mẫu xe
                  </label>
                  <input
                    type="text"
                    id="model"
                    value={newMotorbike.model}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted  border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block font-medium">
                    Năm sản xuất
                  </label>
                  <input
                    type="number"
                    id="year"
                    value={newMotorbike.year}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted  border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="color" className="block font-medium">
                    Màu sắc
                  </label>
                  <input
                    type="text"
                    id="color"
                    value={newMotorbike.color}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted  border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="licensePlate" className="block font-medium">
                    Biển số xe
                  </label>
                  <input
                    type="text"
                    id="licensePlate"
                    value={newMotorbike.licensePlate}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted  border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="detailBike" className="block font-medium">
                    Chi tiết xe
                  </label>
                  <input
                    type="text"
                    id="detailBike"
                    value={newMotorbike.detailBike}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted  border rounded"
                  />
                </div>
              </form>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Thông Tin Bổ Sung</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="fuelType" className="block font-medium">
                    Loại Nhiên Liệu
                  </label>
                  <select
                    id="fuelType"
                    value={newMotorbike.fuelType}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted  border rounded"
                  >
                    <option value="Petrol">Xăng</option>
                    <option value="Electric">Điện</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="engineCapacity" className="block font-medium">
                    Dung tích động cơ (cc)
                  </label>
                  <input
                    type="number"
                    id="engineCapacity"
                    value={newMotorbike.engineCapacity}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="fuelConsumption" className="block font-medium">
                    Lượng tiêu thụ nhiên liệu (L/100km)
                  </label>
                  <input
                    type="number"
                    id="fuelConsumption"
                    value={newMotorbike.fuelConsumption}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="dailyRate" className="block font-medium">
                    Giá thuê mỗi ngày (VND)
                  </label>
                  <input
                    type="number"
                    id="dailyRate"
                    value={newMotorbike.dailyRate}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="vehicleLocation" className="block font-medium">
                    Vị trí xe
                  </label>
                  <input
                    type="text"
                    id="vehicleLocation"
                    value={newMotorbike.vehicleLocation}
                    onChange={handleChange}
                    className="w-full p-2 bg-muted border rounded"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block font-medium">Trạng thái</label>
                  <select id="status" value={newMotorbike.status} onChange={handleChange} className="w-full p-2 bg-muted border rounded">
                    <option value="Sẵn sàng">Sẵn sàng</option>
                    <option value="Đang thuê">Đang thuê</option>
                    <option value="Bảo dưỡng">Bảo dưỡng</option>
                    <option value="Không khả dụng">Không khả dụng</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Đặt lại
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleAddMotorbike}
            >
              {isEditing ? "Cập Nhật" : "Thêm"}
            </button>
          </div>
        </div>

        {/* Search and List Section */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Tìm kiếm xe..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded mb-6"
          />
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2">Hãng</th>
                <th className="border border-gray-200 p-2">Mẫu</th>
                <th className="border border-gray-200 p-2">Năm</th>
                <th className="border border-gray-200 p-2">Màu</th>
                <th className="border border-gray-200 p-2">Hộp số</th>
                <th className="border border-gray-200 p-2">Trạng thái</th>
                <th className="border border-gray-200 p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredMotorbikes.map((motorbike) => (
                <tr key={motorbike.motorbikeId} className="text-center">
                  <td className="border border-gray-200 p-2">{motorbike.make}</td>
                  <td className="border border-gray-200 p-2">{motorbike.model}</td>
                  <td className="border border-gray-200 p-2">{motorbike.year}</td>
                  <td className="border border-gray-200 p-2">{motorbike.color}</td>
                  <td className="border border-gray-200 p-2">{motorbike.gearBox || "N/A"}</td>
                  <td className="border border-gray-200 p-2">{motorbike.status}</td>
                  <td className="border border-gray-200 p-2 flex justify-center items-center space-x-2">
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-lg hover:bg-gray-800"
                      onClick={() => handleEditMotorbike(motorbike)}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(motorbike.motorbikeId)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>

                </tr>
              ))}
              {filteredMotorbikes.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-4 text-gray-500"
                  >
                    Không tìm thấy xe nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MotorbikeManagement;
