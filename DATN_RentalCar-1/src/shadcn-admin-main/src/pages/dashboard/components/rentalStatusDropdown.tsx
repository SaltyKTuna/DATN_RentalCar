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
        <Button
          variant="outline"
          className="h-8 w-36 p-0 border border-gray-300 rounded-md flex items-center justify-center text-gray-800 font-semibold"
        >
          <span className="capitalize">{currentStatus}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 rounded-md shadow-md bg-white">
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Chờ xác nhận', null)}
          className="text-yellow-500 hover:bg-yellow-100 cursor-pointer transition-all duration-150 px-4 py-2 rounded-sm"
        >
          Chờ xác nhận
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Đang tới', null)}
          className="text-blue-500 hover:bg-blue-100 cursor-pointer transition-all duration-150 px-4 py-2 rounded-sm"
        >
          Đang tới
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Đang thuê', null)}
          className="text-green-500 hover:bg-green-100 cursor-pointer transition-all duration-150 px-4 py-2 rounded-sm"
        >
          Đang thuê
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Hoàn tất', new Date().toISOString())}
          className="text-gray-500 hover:bg-gray-100 cursor-pointer transition-all duration-150 px-4 py-2 rounded-sm"
        >
          Hoàn tất
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onUpdateStatus(rentalId, 'Đã Hủy', null)}
          className="text-red-500 hover:bg-red-100 cursor-pointer transition-all duration-150 px-4 py-2 rounded-sm"
        >
          Đã Hủy
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  );
}
