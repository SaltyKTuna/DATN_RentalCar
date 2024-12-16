import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Camera, UserCircle2, Edit, Trash2, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Driver {
    driverId: number;
    fullName: string;
    phoneNumber: string;
    licenseNumber: string;
    experienceYears: number;
    status: string;
    imageUrl: string | null;
    rentalVehicle: any[];
}

const API_URL = "http://localhost:8080/DriverManagement";
const UPLOAD_URL = "http://localhost:8080/api/uploadImg";
const BASE_URL = "http://localhost:8080";
const BASE_IMAGE_URL = `${BASE_URL}/assets/images/others/`;

const DriverManagement: React.FC = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [formData, setFormData] = useState<Driver>({
        driverId: 0,
        fullName: "",
        phoneNumber: "",
        licenseNumber: "",
        experienceYears: 0,
        status: "Sẵn sàng",
        imageUrl: "",
        rentalVehicle: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof Driver, string>>>({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const validateForm = (): boolean => {
        const errors: Partial<Record<keyof Driver, string>> = {};
        if (!formData.fullName.trim()) errors.fullName = "Họ và tên không được để trống";
        if (!formData.phoneNumber.trim()) errors.phoneNumber = "Số điện thoại không được để trống";
        if (!/^[0-9]{10}$/.test(formData.phoneNumber)) errors.phoneNumber = "Số điện thoại không hợp lệ";
        if (!formData.licenseNumber.trim()) errors.licenseNumber = "Số bằng lái không được để trống";
        if (formData.experienceYears < 0) errors.experienceYears = "Số năm kinh nghiệm không hợp lệ";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setDrivers(response.data);
        } catch (error) {
            showNotification(`Lỗi khi tải danh sách tài xế: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const createDriver = async (driverData: Driver) => {
        setLoading(true);
        try {
            await axios.post(API_URL, {
                ...driverData,
                imageUrl: driverData.imageUrl ? driverData.imageUrl.split('/').pop() : "driver.jpg"
            });
            await fetchDrivers();
            showNotification("Thêm mới tài xế thành công", "success");
            handleClearForm();
        } catch (error) {
            showNotification(`Lỗi khi thêm tài xế: ${error.response?.data?.message || error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const updateDriver = async (driverData: Driver) => {
        setLoading(true);
        try {
            await axios.put(`${API_URL}/${driverData.driverId}`, {
                ...driverData,
                imageUrl: driverData.imageUrl || "driver.jpg"
            });
            await fetchDrivers();
            showNotification("Cập nhật tài xế thành công", "success");
            handleClearForm();
        } catch (error) {
            showNotification(`Lỗi khi cập nhật tài xế: ${error.response?.data?.message || error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const deleteDriver = async (driverId: number) => {
        setLoading(true);
        try {
            await axios.delete(`${API_URL}/${driverId}`);
            await fetchDrivers();
            showNotification("Xóa tài xế thành công", "success");
        } catch (error) {
            showNotification(`Lỗi khi xóa tài xế: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            let finalImageUrl = formData.imageUrl;
            if (selectedImage) {
                const formDataImage = new FormData();
                formDataImage.append("file", selectedImage);
                formDataImage.append("type", "driver");
                const response = await axios.post(UPLOAD_URL, formDataImage, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                finalImageUrl = response.data.imageUrl;
            }

            const driverData = {
                ...formData,
                imageUrl: finalImageUrl || "driver.jpg"
            };

            if (isEditing) {
                await updateDriver(driverData);
            } else {
                await createDriver(driverData);
            }
            setSelectedImage(null);
        } catch (error) {
            showNotification(
                `Lỗi khi ${isEditing ? "cập nhật" : "thêm"} tài xế: ${error.response?.data?.message || error.message}`,
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEditDriver = (driver: Driver) => {
        setIsEditing(true);
        setFormData({
            ...driver,
            imageUrl: driver.imageUrl ? `${BASE_IMAGE_URL}${driver.imageUrl}` : ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteDriver = async (driverId: number) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa tài xế này?")) return;
        await deleteDriver(driverId);
    };

    const handleClearForm = () => {
        setFormData({
            driverId: 0,
            fullName: "",
            phoneNumber: "",
            licenseNumber: "",
            experienceYears: 0,
            status: "Sẵn sàng",
            imageUrl: "",
            rentalVehicle: [],
        });
        setSelectedImage(null);
        setFormErrors({});
        setIsEditing(false);
    };

    const showNotification = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setFormData(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
        }
    };

    return (
        <div className="h-screen overflow-y-auto">
            <div className="container mx-auto p-6 space-y-6 max-w-8xl">
                {showAlert && (
                    <Alert variant={alertType === "success" ? "default" : "destructive"}>
                        <AlertTitle>{alertType === "success" ? "Thành công" : "Lỗi"}</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            {isEditing ? "Chỉnh sửa tài xế" : "Thêm mới tài xế"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    {formData.imageUrl ? (
                                        <img
                                            src={selectedImage ? URL.createObjectURL(selectedImage) : `${formData.imageUrl}`}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover"
                                        />
                                    ) : (
                                        <UserCircle2 className="w-32 h-32" />
                                    )}
                                    <label
                                        htmlFor="image-upload"
                                        className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90"
                                    >
                                        <Camera className="w-4 h-4" />
                                        <input
                                            id="image-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Họ và tên</Label>
                                    <Input
                                        id="fullName"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className={formErrors.fullName ? "border-red-500" : ""}
                                    />
                                    {formErrors.fullName && (
                                        <p className="text-red-500 text-sm">{formErrors.fullName}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                                    <Input
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        className={formErrors.phoneNumber ? "border-red-500" : ""}
                                    />
                                    {formErrors.phoneNumber && (
                                        <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="licenseNumber">Số bằng lái</Label>
                                    <Input
                                        id="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                                        className={formErrors.licenseNumber ? "border-red-500" : ""}
                                    />
                                    {formErrors.licenseNumber && (
                                        <p className="text-red-500 text-sm">{formErrors.licenseNumber}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experienceYears">Số năm kinh nghiệm</Label>
                                    <Input
                                        id="experienceYears"
                                        type="number"
                                        value={formData.experienceYears}
                                        onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) })}
                                        className={formErrors.experienceYears ? "border-red-500" : ""}
                                    />
                                    {formErrors.experienceYears && (
                                        <p className="text-red-500 text-sm">{formErrors.experienceYears}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Trạng thái</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn trạng thái" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sẵn sàng">Sẵn sàng</SelectItem>
                                            <SelectItem value="Bận">Bận</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={handleClearForm} disabled={loading}>
                                    Hủy
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : isEditing ? "Lưu thay đổi" : "Thêm mới"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Danh sách tài xế</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading && <div className="flex justify-center p-4"><RefreshCcw className="w-6 h-6 animate-spin" /></div>}
                        <div className="overflow-x-auto relative">
                            <table className="min-w-full border rounded-lg">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border">ID</th>
                                        <th className="py-2 px-4 border">Ảnh</th>
                                        <th className="py-2 px-4 border">Họ và tên</th>
                                        <th className="py-2 px-4 border">Số điện thoại</th>
                                        <th className="py-2 px-4 border">Số bằng lái</th>
                                        <th className="py-2 px-4 border">Kinh nghiệm</th>
                                        <th className="py-2 px-4 border">Trạng thái</th>
                                        <th className="py-2 px-4 border">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {drivers.map((driver) => (
                                        <tr key={driver.driverId}>
                                            <td className="py-2 px-4 border text-center">{driver.driverId}</td>
                                            <td className="py-2 px-4 border text-center">
                                                {driver.imageUrl ? (
                                                    <img
                                                        src={`${BASE_IMAGE_URL}${driver.imageUrl}`}
                                                        alt={driver.fullName}
                                                        className="w-10 h-10 rounded-full object-cover mx-auto"
                                                    />
                                                ) : (
                                                    <UserCircle2 className="w-10 h-10 mx-auto" />
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border">{driver.fullName}</td>
                                            <td className="py-2 px-4 border">{driver.phoneNumber}</td>
                                            <td className="py-2 px-4 border">{driver.licenseNumber}</td>
                                            <td className="py-2 px-4 border">{driver.experienceYears} năm</td>
                                            <td className="py-2 px-4 border">
                                                <span className={`px-2 py-1 ${driver.status === "Sẵn sàng" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"} rounded-full`}>
                                                    {driver.status}
                                                </span>
                                            </td>
                                            <td className="py-2 px-4 border flex justify-center space-x-2">
                                                <Button size="sm" onClick={() => handleEditDriver(driver)} disabled={loading}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDeleteDriver(driver.driverId)} disabled={loading}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DriverManagement;
