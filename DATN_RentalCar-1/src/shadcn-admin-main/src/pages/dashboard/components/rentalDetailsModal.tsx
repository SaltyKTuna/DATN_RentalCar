import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

// Detailed Interfaces for Type Safety
interface Account {
  accountId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  username?: string;
}

interface Car {
  carId: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  condition: string;
  vehicleLocation: string;
  imageUrl: string;
}

interface Motorbike {
  motobikeId: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  condition: string;
  vehicleLocation: string;
  imageUrl: string;
}

interface Payment {
  paymentId?: number;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  idQrCode?: string;
}

interface RentalDetails {
  rentalId: number;
  account: Account;
  rentalDate: string;
  returnDate: string;
  actualReturnDate: string | null;
  totalCost: number;
  renStatus: string;
  haveDriver: boolean;
  rentalLocations: string;
  notes?: string;
  rentalVehicle: RentalVehicle[]; // Updated to handle multiple vehicles
}

interface RentalVehicle {
  rentalVehicleId: number;
  vehicleType: 'car' | 'motorbike';
  car?: Car;
  motorbike?: Motorbike;
  driver?: Driver;
}

interface Driver {
  driverId: number;
  fullName: string;
  phoneNumber: string;
  licenseNumber: string;
  experienceYears: number;
  status: string;
  imageUrl?: string;
}

interface RentalDetailsModalProps {
  rentalId?: number | null;
  isOpen: boolean;
  onClose: () => void;
}

// Status Color Mapping
const STATUS_COLORS: Record<string, string> = {
  'Chờ xác nhận': 'warning',
  'Đang tới': 'info',
  'Đang thuê': 'success',
  'Hoàn tất': 'secondary',
  'Đã Hủy': 'destructive',
};

// Phân trang cho Thông Tin Phương Tiện
const ITEMS_PER_PAGE = 1; // Số phương tiện hiển thị mỗi trang

export function RentalDetailsModal({
  rentalId,
  isOpen,
  onClose,
}: RentalDetailsModalProps) {
  const [details, setDetails] = useState<{
    rental?: RentalDetails;
    rentalVehicle?: RentalVehicle[];
    payment?: Payment;
  }>({});
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  const totalPages = details.rentalVehicle
    ? Math.ceil(details.rentalVehicle.length / ITEMS_PER_PAGE)
    : 1;

  const paginatedVehicles = details.rentalVehicle
    ? details.rentalVehicle.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : [];

  // Điều khiển trang
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const { toast } = useToast();

  // Utility Functions
  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  const formatCurrency = (amount?: number): string => {
    return amount 
      ? new Intl.NumberFormat('vi-VN', { 
          style: 'currency', 
          currency: 'VND' 
        }).format(amount)
      : 'N/A';
  };

  // Data Fetching
  useEffect(() => {
    const fetchRentalDetails = async () => {
      if (!isOpen || !rentalId) return;
  
      setLoading(true);
      setError(null);
  
      try {
        const [rentalRes, rentalVehicleRes, paymentRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/rental/${rentalId}`),
          axios.get(`http://localhost:8080/api/rental-vehicle/by-rental/${rentalId}`),
          axios.get(`http://localhost:8080/api/payment/by-rental/${rentalId}`)
        ]);
  
        setDetails({
          rental: rentalRes.data,
          rentalVehicle: rentalVehicleRes.data,  // Lưu toàn bộ mảng
          payment: paymentRes.data[0] || undefined,
        });
  
        // Log the fetched data to the console
        console.log('Fetched Rental Data:', rentalRes.data);
        console.log('Fetched Vehicle Data:', rentalVehicleRes.data);
        console.log('Fetched Payment Data:', paymentRes.data);
        
      } catch (err: any) {
        const errorMsg = err.response?.data?.message || 'Lỗi tải dữ liệu';
        setError(errorMsg);
        toast({
          title: 'Lỗi',
          description: errorMsg,
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchRentalDetails();
  }, [rentalId, isOpen, toast]);

  // Render Helpers
  const renderStatusBadge = (status?: string) => (
    status ? <Badge variant={STATUS_COLORS[status] || 'default'}>{status}</Badge> : null
  );

  const renderVehicleInfo = (vehicle: RentalVehicle) => {
    const info = vehicle.vehicleType === 'car' ? vehicle.car : vehicle.motorbike;
    const imageUrls = info?.imageUrl ? info.imageUrl.split(',') : []; // Tách chuỗi hình ảnh
    const imagePath = vehicle.vehicleType === 'car' 
        ? 'http://localhost:8080/assets/images/car/' 
        : 'http://localhost:8080/assets/images/motorbike/'; // Đường dẫn hình ảnh theo loại xe

    return (
      <div key={vehicle.rentalVehicleId} className="border-b pb-4 mb-4">
        <p><strong>Hình ảnh:</strong></p>
        <div className="overflow-x-auto whitespace-nowrap">
          {imageUrls.map((url, index) => (
            <img key={index} src={`${imagePath}${url.trim()}`} alt={`Vehicle Image ${index + 1}`} className="h-32 object-cover inline-block" />
          ))}
        </div>
        <p><strong>Loại:</strong> {vehicle.vehicleType === 'car' ? 'Ô Tô' : 'Xe Máy'}</p>
        <p><strong>Tên xe:</strong> {info?.make || 'N/A'} {info?.model || 'N/A'} {info?.year || 'N/A'}</p>
        <p><strong>Biển Số:</strong> {info?.licensePlate || 'N/A'}</p>
        <p><strong>Màu:</strong> {info?.color || 'N/A'}</p>
        <p><strong>Vị Trí:</strong> {info?.vehicleLocation || 'N/A'}</p>
        {vehicle.driver && (
          <>
            <p><strong>Tài Xế:</strong> {vehicle.driver.fullName}</p>
            <p><strong>SĐT Tài Xế:</strong> {vehicle.driver.phoneNumber}</p>
          </>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {loading
              ? 'Đang tải chi tiết thuê xe...'
              : `Chi Tiết Thuê Xe - Mã Thuê #${details.rental?.rentalId || rentalId}`}
          </DialogTitle>
          <DialogDescription>Thông tin chi tiết về đơn thuê xe</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {/* Thông Tin Khách Hàng */}
            <Card>
              <CardHeader><CardTitle>Thông Tin Khách Hàng</CardTitle></CardHeader>
              <CardContent>
                <p><strong>Tên:</strong> {details.rental?.account?.fullName || 'N/A'}</p>
                <p><strong>Email:</strong> {details.rental?.account?.email || 'N/A'}</p>
                <p><strong>SĐT:</strong> {details.rental?.account?.phoneNumber || 'N/A'}</p>
              </CardContent>
            </Card>

            {/* Chi Tiết Thuê Xe */}
            <Card>
              <CardHeader><CardTitle>Chi Tiết Thuê Xe</CardTitle></CardHeader>
              <CardContent>
                <p><strong>Ngày Thuê:</strong> {formatDate(details.rental?.rentalDate)}</p>
                <p><strong>Trạng Thái:</strong> {renderStatusBadge(details.rental?.renStatus)}</p>
                <p><strong>Ngày Trả Dự Kiến:</strong> {formatDate(details.rental?.returnDate)}</p>
                <p><strong>Ngày Trả Thực Tế:</strong> {formatDate(details.rental?.actualReturnDate)}</p>
                <p><strong>Tổng Chi Phí:</strong> {formatCurrency(details.rental?.totalCost)}</p>
                <p><strong>Có Tài Xế:</strong> {details.rental?.haveDriver ? 'Có' : 'Không'}</p>
              </CardContent>
            </Card>

            {/* Thông Tin Phương Tiện */}
            <Card>
              <CardHeader><CardTitle>Thông Tin Phương Tiện</CardTitle></CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center h-16">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : details.rentalVehicle && details.rentalVehicle.length > 0 ? (
                  <>
                    {paginatedVehicles.map((vehicle) => renderVehicleInfo(vehicle))}

                    {/* Điều hướng phân trang */}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-sm font-semibold text-blue-500 disabled:text-gray-400"
                      >
                        ← Trang trước
                      </button>
                      <span className="text-sm">
                        Trang {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="text-sm font-semibold text-blue-500 disabled:text-gray-400"
                      >
                        Trang sau →
                      </button>
                    </div>
                  </>
                ) : (
                  <p>Không có thông tin phương tiện</p>
                )}
              </CardContent>
            </Card>

            {/* Thông Tin Thanh Toán */}
            <Card>
              <CardHeader><CardTitle>Thông Tin Thanh Toán</CardTitle></CardHeader>
              <CardContent>
                {details.payment ? (
                  <>
                    <p><strong>Số Tiền:</strong> {formatCurrency(details.payment.amount)}</p>
                    <p><strong>Phương Thức:</strong> {details.payment.paymentMethod}</p>
                    <p><strong>Ngày Thanh Toán:</strong> {formatDate(details.payment.paymentDate)}</p>
                    <p><strong>Mã Thanh Toán:</strong> {details.payment.idQrCode}</p>
                  </>
                ) : (
                  <p>Chưa có thông tin thanh toán</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}