import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Camera, UserCircle2, Edit, Trash2, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import moment from 'moment';

interface Role {
  roleId: number;
  roleName: string;
  description: string;
}

interface Account {
  accountId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  passwordHash?: string;
  roles: Role[];
  address: string | null;
  dateOfBirth: string | null;
  imageUrl: string | null;
  rental: any[];
}

interface ApiResponse {
  content: Account[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

interface UploadResponse {
  imageUrl: string;
}

const API_URL = "http://localhost:8080/api/account";
const UPLOAD_URL = "http://localhost:8080/api/uploadImg";
const BASE_URL = "http://localhost:8080";
const BASE_IMAGE_URL = `${BASE_URL}/assets/images/account/`;

const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page: number) => {
        if (page >= 0 && page < totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center space-x-2 mt-4">
            <Button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 0}>
                Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
                <Button key={index} onClick={() => handlePageClick(index)} variant={index === currentPage ? "solid" : "outline"}>
                    {index + 1}
                </Button>
            ))}
            <Button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                Next
            </Button>
        </div>
    );
};

const AccountSettings: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [formData, setFormData] = useState<Account>({
    accountId: 0,
    fullName: "",
    email: "",
    phoneNumber: "",
    username: "",
    passwordHash: "",
    roles: [],
    address: "",
    dateOfBirth: "",
    imageUrl: "",
    rental: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Account, string>>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof Account, string>> = {};
    if (!formData.fullName.trim()) errors.fullName = "Họ và tên không được để trống";
    if (!formData.email.trim()) errors.email = "Email không được để trống";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Email không hợp lệ";
    if (!formData.username.trim()) errors.username = "Tên đăng nhập không được để trống";
    if (!isEditing && !formData.passwordHash) errors.passwordHash = "Mật khẩu không được để trống";
    if (!formData.roles.length) errors.roles = "Vui lòng chọn vai trò";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fetchAccounts = async (page: number, size: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
      setAccounts(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);
    } catch (error) {
      showNotification(`Lỗi khi tải danh sách tài khoản: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/role");
      setRoles(response.data);
    } catch (error) {
      showNotification(`Lỗi khi tải danh sách vai trò: ${error.message}`, "error");
    }
  };

  const createAccount = async (accountData: Account) => {
    setLoading(true);
    try {
      await axios.post(API_URL, {
        ...accountData,
        imageUrl: accountData.imageUrl ? accountData.imageUrl.split('/').pop() : "user.jpg"
      });
      await fetchAccounts(currentPage, itemsPerPage); //refresh account list after creation.
      showNotification("Thêm mới tài khoản thành công", "success");
      handleClearForm();
    } catch (error) {
      showNotification(`Lỗi khi thêm tài khoản: ${error.response?.data?.message || error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const updateAccount = async (accountData: Account) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/${accountData.accountId}`, {
        ...accountData,
        imageUrl: accountData.imageUrl || "user.jpg"
      });
      await fetchAccounts(currentPage, itemsPerPage); //refresh account list after update.
      showNotification("Cập nhật tài khoản thành công", "success");
      handleClearForm();
    } catch (error) {
      showNotification(`Lỗi khi cập nhật tài khoản: ${error.response?.data?.message || error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (accountId: number) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${accountId}`);
      await fetchAccounts(currentPage, itemsPerPage); //refresh account list after delete.
      showNotification("Xóa tài khoản thành công", "success");
    } catch (error) {
      showNotification(`Lỗi khi xóa tài khoản: ${error.message}`, "error");
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
        formDataImage.append("type", "account");
        const response = await axios.post(UPLOAD_URL, formDataImage, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        finalImageUrl = response.data.imageUrl;
      }

      const accountData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? moment(formData.dateOfBirth).format('YYYY-MM-DD') : null,
        imageUrl: finalImageUrl || "user.jpg"
      };

      if (isEditing) {
        await updateAccount(accountData);
      } else {
        await createAccount(accountData);
      }
      setSelectedImage(null);
    } catch (error) {
      showNotification(
        `Lỗi khi ${isEditing ? "cập nhật" : "thêm"} tài khoản: ${error.response?.data?.message || error.message}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditAccount = (account: Account) => {
    setIsEditing(true);
    setFormData({
      ...account,
      dateOfBirth: account.dateOfBirth ? moment(account.dateOfBirth).format('YYYY-MM-DD') : '',
      imageUrl: account.imageUrl ? `${BASE_IMAGE_URL}${account.imageUrl}` : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAccount = async (accountId: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) return;
    await deleteAccount(accountId);
  };

  const handleClearForm = () => {
    setFormData({
      accountId: 0,
      fullName: "",
      email: "",
      phoneNumber: "",
      username: "",
      passwordHash: "",
      roles: [],
      address: "",
      dateOfBirth: "",
      imageUrl: "",
      rental: [],
    });
    setSelectedImage(null);
    setFormErrors({});
    setIsEditing(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchAccounts(page, itemsPerPage);
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    fetchAccounts(currentPage, itemsPerPage);
    fetchRoles();
  }, [currentPage]);

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
              {isEditing ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={formErrors.username ? "border-red-500" : ""}
                  />
                  {formErrors.username && (
                    <p className="text-red-500 text-sm">{formErrors.username}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordHash">Mật khẩu</Label>
                  <Input
                    id="passwordHash"
                    type="passwordHash"
                    value={formData.passwordHash}
                    onChange={(e) => setFormData({ ...formData, passwordHash: e.target.value })}
                    className={formErrors.passwordHash ? "border-red-500" : ""}
                  />
                  {formErrors.passwordHash && (
                    <p className="text-red-500 text-sm">{formErrors.passwordHash}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth || ""}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Select
                    value={formData.roles[0]?.roleId.toString() || ""}
                    onValueChange={(value) => {
                      const selectedRole = roles.find(role => role.roleId.toString() === value);
                      if (selectedRole) {
                        setFormData({
                          ...formData,
                          roles: [{
                            roleId: selectedRole.roleId,
                            roleName: selectedRole.roleName,
                            description: selectedRole.description
                          }]
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles
                        .filter(role => role.roleName !== "customer")
                        .map((role) => (
                          <SelectItem key={role.roleId} value={role.roleId.toString()}>
                            {role.roleName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {formErrors.roles && (
                    <p className="text-red-500 text-sm">{formErrors.roles}</p>
                  )}
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
            <CardTitle className="text-2xl font-bold">Danh sách tài khoản</CardTitle>
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
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Số điện thoại</th>
                    <th className="py-2 px-4 border">Vai trò</th>
                    <th className="py-2 px-4 border">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    account.roles[0]?.roleName !== "customer" && (
                      <tr key={account.accountId}>
                        <td className="py-2 px-4 border text-center">{account.accountId}</td>
                        <td className="py-2 px-4 border text-center">
                          {account.imageUrl ? (
                            <img
                              src={`${BASE_IMAGE_URL}${account.imageUrl}`}
                              alt={account.fullName}
                              className="w-10 h-10 rounded-full object-cover mx-auto"
                            />
                          ) : (
                            <UserCircle2 className="w-10 h-10 mx-auto" />
                          )}
                        </td>
                        <td className="py-2 px-4 border">{account.fullName}</td>
                        <td className="py-2 px-4 border">{account.email}</td>
                        <td className="py-2 px-4 border">{account.phoneNumber}</td>
                        <td className="py-2 px-4 border">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                            {account.roles[0]?.roleName}
                          </span>
                        </td>
                        <td className="py-2 px-4 border flex justify-center space-x-2">
                          <Button size="sm" onClick={() => handleEditAccount(account)} disabled={loading}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteAccount(account.accountId)} disabled={loading}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;