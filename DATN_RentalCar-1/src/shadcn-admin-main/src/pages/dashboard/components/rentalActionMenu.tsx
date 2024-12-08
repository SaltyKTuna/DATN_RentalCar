import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/custom/button';
import { MoreHorizontal } from 'lucide-react';

interface RentalActionMenuProps {
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function RentalActionMenu({ onViewDetails, onEdit, onDelete }: RentalActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Mở menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onViewDetails}>Xem Chi Tiết</DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>Chỉnh Sửa</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>Xóa</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
