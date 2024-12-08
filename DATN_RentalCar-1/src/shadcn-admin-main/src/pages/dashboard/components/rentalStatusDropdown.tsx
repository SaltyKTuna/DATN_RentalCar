import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/custom/button';

interface RentalStatusDropdownProps {
  rentalId: number;
  currentStatus: string;
  onUpdateStatus: (rentalId: number, newStatus: string, actualReturnDate: string | null) => void;
}

export function RentalStatusDropdown({
  rentalId,
  currentStatus,
  onUpdateStatus,
}: RentalStatusDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-32 p-0 border border-gray-300 rounded-md flex items-center justify-between text-gray-800">
          <span className="text-sm font-semibold">{currentStatus.toLowerCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Chờ xác nhận', null)}
          className="text-yellow-500"
        >
          Chờ xác nhận
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Đang tới', null)}
          className="text-blue-500"
        >
          Đang tới
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Đang thuê', null)}
          className="text-green-500"
        >
          Đang thuê
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Hoàn tất', new Date().toISOString())}
          className="text-gray-500"
        >
          Hoàn tất
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Đã Hủy', null)}
          className="text-red-500"
        >
          Đã Hủy
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
