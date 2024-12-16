import React, { useState, useEffect } from "react";
import axios from "axios";
import { Camera, Edit, Trash2, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DrivingLicense {
    licenseId: number;
    licenseNumber: string;
    dateOfBirth: string;
    imageUrl: string | null;
    licenseStatus: "ACTIVE" | "INACTIVE" | "EXPIRED";
    account?: Account;
}

interface Account {
    accountId: number;
    fullName: string;
    email: string;
    drivingLicense: DrivingLicense | null;
}

const API_URL = "http://localhost:8080/api/driving-liscense";
const UPLOAD_URL = "http://localhost:8080/api/uploadImg";
const BASE_IMAGE_URL = "http://localhost:8080/assets/images/licenses/";

const initialFormState: DrivingLicense = {
    licenseId: 0,
    licenseNumber: "",
    dateOfBirth: "",
    imageUrl: null,
    licenseStatus: "ACTIVE",
    account: undefined
};

const DrivingLicenseManagement: React.FC = () => {
    const [licenses, setLicenses] = useState<DrivingLicense[]>([]);
    const [formData, setFormData] = useState<DrivingLicense>(initialFormState);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof DrivingLicense, string>>>({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);

    // Validate form
    const validateForm = (): boolean => {
        const errors: Partial<Record<keyof DrivingLicense, string>> = {};
        if (!formData.licenseNumber.trim()) errors.licenseNumber = "License number is required.";
        if (!formData.dateOfBirth.trim()) errors.dateOfBirth = "Date of birth is required.";
        if (!formData.licenseStatus.trim()) errors.licenseStatus = "License status is required.";
        if (!formData.account) errors.account = "Account selection is required.";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Fetch licenses and accounts together
    const fetchLicenses = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            const licenseData = response.data;

            // Fetch all accounts
            const accountsResponse = await axios.get("http://localhost:8080/api/account");
            // Đảm bảo accounts là một mảng
            const accounts = Array.isArray(accountsResponse.data) 
                ? accountsResponse.data 
                : accountsResponse.data.content || [];

            // Map licenses với accounts
            const licensesWithAccounts = licenseData.map((license: DrivingLicense) => {
                // Tìm account có drivingLicense.licenseId trùng với license.licenseId
                const matchingAccount = accounts.find(
                    (account: Account) => 
                        account.drivingLicense && 
                        account.drivingLicense.licenseId === license.licenseId
                );

                return {
                    ...license,
                    account: matchingAccount || null
                };
            });

            console.log('Accounts:', accounts); // Debug accounts data
            console.log('Licenses with accounts:', licensesWithAccounts);
            setLicenses(licensesWithAccounts);
        } catch (error) {
            console.error('Error details:', error); // Log chi tiết lỗi
            showNotification(`Failed to load licenses: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    // Create or update license
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            let finalImageUrl = formData.imageUrl;
            if (selectedImage) {
                const formDataImage = new FormData();
                formDataImage.append("file", selectedImage);
                formDataImage.append("type", "license");
                const response = await axios.post(UPLOAD_URL, formDataImage, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                finalImageUrl = response.data.imageUrl;
            }

            const licenseData = {
                ...formData,
                imageUrl: finalImageUrl || "default-license.jpg",
                accountId: formData.account?.accountId
            };

            if (isEditing) {
                await axios.put(`${API_URL}/${licenseData.licenseId}`, licenseData);
                showNotification("License updated successfully.", "success");
            } else {
                await axios.post(API_URL, licenseData);
                showNotification("License added successfully.", "success");
            }

            setSelectedImage(null);
            handleClearForm();
            await Promise.all([fetchLicenses(), fetchAccounts()]);
        } catch (error) {
            showNotification(`Failed to ${isEditing ? "update" : "add"} license: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    // Delete license
    const handleDeleteLicense = async (licenseId: number) => {
        if (!window.confirm("Are you sure you want to delete this license?")) return;

        setLoading(true);
        try {
            await axios.delete(`${API_URL}/${licenseId}`);
            showNotification("License deleted successfully.", "success");
            await fetchLicenses();
        } catch (error) {
            showNotification(`Failed to delete license: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    // Handle form clear
    const handleClearForm = () => {
        setFormData(initialFormState);
        setSelectedImage(null);
        setFormErrors({});
        setIsEditing(false);
    };

    // Handle editing
    const handleEditLicense = (license: DrivingLicense) => {
        setIsEditing(true);
        setFormData({
            ...license,
            imageUrl: license.imageUrl ? `${BASE_IMAGE_URL}${license.imageUrl}` : "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Notifications
    const showNotification = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    // Handle image change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setFormData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
        }
    };

    // Fetch accounts
    const fetchAccounts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/account");
            const accountsData = Array.isArray(response.data) 
                ? response.data 
                : response.data.content || [];
            setAccounts(accountsData);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    useEffect(() => {
        fetchLicenses();
        fetchAccounts();
    }, []);

    return (
        <div className="h-screen overflow-y-auto">
            <div className="container mx-auto p-6 space-y-6 max-w-8xl">
                {showAlert && (
                    <Alert variant={alertType === "success" ? "default" : "destructive"}>
                        <AlertTitle>{alertType === "success" ? "Success" : "Error"}</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                )}

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            {isEditing ? "Edit License" : "Add New License"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="licenseNumber">License Number</Label>
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
                                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                        className={formErrors.dateOfBirth ? "border-red-500" : ""}
                                    />
                                    {formErrors.dateOfBirth && (
                                        <p className="text-red-500 text-sm">{formErrors.dateOfBirth}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="licenseStatus">Status</Label>
                                    <select
                                        id="licenseStatus"
                                        value={formData.licenseStatus}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            licenseStatus: e.target.value as "ACTIVE" | "INACTIVE" | "EXPIRED"
                                        })}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                        <option value="EXPIRED">Expired</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="imageUpload">License Image</Label>
                                    <Input
                                        id="imageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="accountId">Select Account</Label>
                                    <select
                                        id="accountId"
                                        value={formData.account?.accountId || ""}
                                        onChange={(e) => {
                                            const selectedAccount = accounts.find(
                                                acc => acc.accountId === Number(e.target.value)
                                            );
                                            setFormData({
                                                ...formData,
                                                account: selectedAccount || undefined
                                            });
                                        }}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">Select an account</option>
                                        {accounts
                                            .filter(account => !account.drivingLicense || 
                                                (isEditing && account.drivingLicense?.licenseId === formData.licenseId))
                                            .map(account => (
                                                <option 
                                                    key={account.accountId} 
                                                    value={account.accountId}
                                                >
                                                    {account.fullName} ({account.email})
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {formErrors.account && (
                                        <p className="text-red-500 text-sm">{formErrors.account}</p>
                                    )}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4">
                                <Button type="button" variant="outline" onClick={handleClearForm} disabled={loading}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : isEditing ? "Save Changes" : "Add License"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* License List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">License List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading && (
                            <div className="flex justify-center p-4">
                                <RefreshCcw className="w-6 h-6 animate-spin" />
                            </div>
                        )}
                        <div className="overflow-x-auto relative">
                            <table className="min-w-full text-left text-sm text-gray-600">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">License ID</th>
                                        <th className="px-4 py-2">Account ID</th>
                                        <th className="px-4 py-2">Full Name</th>
                                        <th className="px-4 py-2">License Number</th>
                                        <th className="px-4 py-2">Date of Birth</th>
                                        <th className="px-4 py-2">License Status</th>
                                        <th className="px-4 py-2">License Image</th>
                                        <th className="px-4 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {licenses.map((license, index) => (
                                        <tr key={license.licenseId} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                            <td className="px-4 py-2">{license.licenseId}</td>
                                            <td className="px-4 py-2">{license.account?.accountId || "N/A"}</td>
                                            <td className="px-4 py-2">{license.account?.fullName || "N/A"}</td>
                                            <td className="px-4 py-2">{license.licenseNumber}</td>
                                            <td className="px-4 py-2">{new Date(license.dateOfBirth).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    license.licenseStatus === "ACTIVE"
                                                        ? "bg-green-100 text-green-800"
                                                        : license.licenseStatus === "INACTIVE"
                                                        ? "bg-gray-100 text-gray-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}>
                                                    {license.licenseStatus}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {license.imageUrl ? (
                                                    <img
                                                        src={`${BASE_IMAGE_URL}${license.imageUrl}`}
                                                        alt="License"
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                ) : (
                                                    <Camera className="w-6 h-6 text-gray-400" />
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-right space-x-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleEditLicense(license)}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDeleteLicense(license.licenseId)}>
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {licenses.length === 0 && (
                                <p className="text-center text-gray-500 py-4">No licenses found.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DrivingLicenseManagement;
