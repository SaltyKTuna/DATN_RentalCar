import React, { useState, useEffect, useCallback } from 'react';
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
import { RentalStatusDropdown } from './rentalStatusDropdown';
import { RentalActionMenu } from './rentalActionMenu';
import { RentalDetailsModal } from './rentalDetailsModal';

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
  const [selectedRentalId, setSelectedRentalId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    accountName: '',
    accountPhone: '',
    accountEmail: '',
    sortField: 'rentalId',
    sortDirection: 'desc',
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounce function to delay the search after typing
  const debounceSearch = useCallback(
    (value: string, field: string) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: value,
      }));
    },
    [setFilters]
  );

  useEffect(() => {
    // Setting debounce delay
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 1000);

    return () => clearTimeout(timer);
  }, [filters]);

  const fetchRentalData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/rental', {
        params: {
          page: currentPage - 1,
          size: itemsPerPage,
          accountName: debouncedFilters.accountName,
          accountPhone: debouncedFilters.accountPhone,
          accountEmail: debouncedFilters.accountEmail,
          sort: debouncedFilters.sortField,
          direction: debouncedFilters.sortDirection,
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
      const payload = {
        renStatus: newStatus.toString(), // Chuyển newStatus thành string
        actualReturnDate: new Date().toISOString() // Thời gian hiện tại theo ISO 8601
      };
  
      const response = await axios.put(
        `http://localhost:8080/api/rental/status/${rentalId}`,
        payload
      );
  
      if (response.data) {
        setRentalData((prevData) =>
          prevData.map((rental) =>
            rental.rentalId === rentalId
              ? { 
                  ...rental, 
                  renStatus: response.data.renStatus || newStatus,
                  actualReturnDate: response.data.actualReturnDate || payload.actualReturnDate
                }
              : rental
          )
        );
  
        toast({
          title: 'Cập nhật thành công',
          description: `Trạng thái đã được cập nhật thành "${newStatus}".`,
          variant: 'success',
        });
      } else {
        throw new Error('Không nhận được phản hồi từ server');
      }
    } catch (err: any) {
      console.error('Lỗi khi cập nhật trạng thái:', err);
      toast({
        title: 'Cập nhật thất bại',
        description: err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchRentalData();
  }, [currentPage, debouncedFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value, e.target.name);
  };

  const handleSearchClick = () => {
    setDebouncedFilters(filters);
  };

  const handleSortChange = (field: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortField: field,
      sortDirection: prevFilters.sortField === field && prevFilters.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
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

  const openDetailModal = (rentalId: number) => {
    setSelectedRentalId(rentalId);
    setIsDetailModalOpen(true);
  };

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
          <div className="mb-4 flex gap-4">
            <input
              type="text"
              name="accountName"
              placeholder="Tìm theo tên"
              value={filters.accountName}
              onChange={handleSearchChange}
              className="input"
            />
            <input
              type="text"
              name="accountPhone"
              placeholder="Tìm theo số điện thoại"
              value={filters.accountPhone}
              onChange={handleSearchChange}
              className="input"
            />
            <input
              type="text"
              name="accountEmail"
              placeholder="Tìm theo email"
              value={filters.accountEmail}
              onChange={handleSearchChange}
              className="input"
            />
            {/* <input
              type="date"
              name="rentalDate"
              placeholder="Tìm theo ngày"
              value={filters.rentalDate}
              onChange={handleSearchChange}
              className="input"
            /> */}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSortChange('rentalId')}>
                    Mã Thuê {filters.sortField === 'rentalId' && (filters.sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSortChange('account.fullName')}>
                    Tên Khách Hàng {filters.sortField === 'account.fullName' && (filters.sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSortChange('account.email')}>
                    Email {filters.sortField === 'account.email' && (filters.sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSortChange('rentalDate')}>
                    Ngày Thuê {filters.sortField === 'rentalDate' && (filters.sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSortChange('returnDate')}>
                    Ngày Trả Dự Kiến {filters.sortField === 'returnDate' && (filters.sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead onClick={() => handleSortChange('actualReturnDate')}>
                    Ngày Trả Thực Tế {filters.sortField === 'actualReturnDate' && (filters.sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>
                    Trạng Thái
                  </TableHead>
                  <TableHead>
                    Thao Tác
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rentalData.map((rental) => (
                  <TableRow key={rental.rentalId}>
                    <TableCell>{rental.rentalId}</TableCell>
                    <TableCell>{rental.account.fullName}</TableCell>
                    <TableCell>{rental.account.email}</TableCell>
                    <TableCell>{new Date(rental.rentalDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(rental.returnDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {rental.renStatus === 'Hoàn tất' && rental.actualReturnDate
                        ? new Date(rental.actualReturnDate).toLocaleDateString()
                        : 'Chưa trả'}
                    </TableCell>
                    <TableCell>
                      <RentalStatusDropdown
                        rentalId={rental.rentalId}
                        currentStatus={rental.renStatus}
                        onUpdateStatus={(rentalId, newStatus, actualReturnDate) =>
                          updateRentalStatus(rentalId, newStatus, actualReturnDate)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <RentalActionMenu
                        onViewDetails={() => openDetailModal(rental.rentalId)}
                        onEdit={() => console.log('Chỉnh sửa', rental.rentalId)}
                        onDelete={() => console.log('Xóa', rental.rentalId)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between mt-4">
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

      {selectedRentalId && (
        <RentalDetailsModal
          rentalId={selectedRentalId}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </>
  );
}
