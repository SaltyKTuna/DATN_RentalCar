import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/custom/button';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

interface RentalData {
  rentalId: number;
  account: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  rentalDate: string;
  returnDate: string;
  actualReturnDate: string | null;
  totalCost: number;
  renStatus: string;
  haveDriver: boolean;
  rentalLocations: string;
}

export function RentalDataTable() {
  const [rentalData, setRentalData] = useState<RentalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;
  const { toast } = useToast();

  const fetchRentalData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/rental', {
        params: {
          page: currentPage - 1,
          size: itemsPerPage,
        },
      });
      const data = response.data;

      if (data && Array.isArray(data.content)) {
        setRentalData(data.content);
        setTotalPages(data.totalPages);
      } else {
        setError('Dữ liệu trả về không hợp lệ.');
      }
    } catch (err: any) {
      console.error('Lỗi khi gọi API:', err);
      setError('Không thể tải dữ liệu thuê xe.');
    } finally {
      setLoading(false);
    }
  };

  const updateRentalStatus = async (
    rentalId: number,
    newStatus: string,
    actualReturnDate: string | null
  ) => {
    try {
      await axios.put(`http://localhost:8080/api/rental/status/${rentalId}`, {
        renStatus: newStatus,
        actualReturnDate,
      });
      setRentalData((prevData) =>
        prevData.map((rental) =>
          rental.rentalId === rentalId
            ? { ...rental, renStatus: newStatus, actualReturnDate }
            : rental
        )
      );
      toast({
        title: 'Cập nhật thành công',
        description: `Trạng thái đã được cập nhật thành "${newStatus}".`,
        variant: 'success',
      });
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái:', err);
      toast({
        title: 'Cập nhật thất bại',
        description: 'Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại.',
        variant: 'destructive',
      });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchRentalData();
  }, [currentPage]);

  if (loading) return <div>Đang tải dữ liệu, vui lòng đợi...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Dữ Liệu Thuê Xe</CardTitle>
              <CardDescription>
                Tổng số lượng thuê: {rentalData.length}
              </CardDescription>
            </div>
            <Button variant="outline">Xuất Excel</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã Thuê</TableHead>
                  <TableHead>Tên Khách Hàng</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Số Điện Thoại</TableHead>
                  <TableHead>Ngày Thuê</TableHead>
                  <TableHead>Ngày Trả</TableHead>
                  <TableHead>Ngày Trả Thực Tế</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead>Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentalData.map((rental) => (
                  <TableRow key={rental.rentalId}>
                    <TableCell>{rental.rentalId}</TableCell>
                    <TableCell>{rental.account.fullName}</TableCell>
                    <TableCell>{rental.account.email}</TableCell>
                    <TableCell>{rental.account.phoneNumber}</TableCell>
                    <TableCell>
                      {new Date(rental.rentalDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(rental.returnDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {rental.actualReturnDate
                        ? new Date(rental.actualReturnDate).toLocaleDateString()
                        : 'Chưa trả'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="h-8 w-32 p-0 border border-gray-300 rounded-md flex items-center justify-between text-gray-800">
                            <span className="text-sm font-semibold">{rental.renStatus.toLowerCase()}</span> 
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              updateRentalStatus(
                                rental.rentalId,
                                'Chờ xác nhận',
                                null
                              )
                            }
                            className="text-yellow-500"
                          >
                            Chờ xác nhận
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateRentalStatus(
                                rental.rentalId,
                                'Đang tới',
                                null
                              )
                            }
                            className="text-blue-500"
                          >
                            Đang tới
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateRentalStatus(
                                rental.rentalId,
                                'Đang thuê',
                                null
                              )
                            }
                            className="text-green-500"
                          >
                            Đang thuê
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateRentalStatus(
                                rental.rentalId,
                                'Hoàn tất',
                                new Date().toISOString()
                              )
                            }
                            className="text-gray-500"
                          >
                            Hoàn tất
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateRentalStatus(
                                rental.rentalId,
                                'Đã Hủy',
                                null
                              )
                            }
                            className="text-red-500"
                          >
                            Đã Hủy
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Xem Chi Tiết</DropdownMenuItem>
                          <DropdownMenuItem>Chỉnh Sửa</DropdownMenuItem>
                          <DropdownMenuItem>Xóa</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Thanh chuyển trang */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Trang trước
            </Button>
            <span>
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Trang sau
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
