import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import axios from 'axios'

// Định nghĩa kiểu dữ liệu cho các đối tượng
interface Account {
  accountId: number
  fullName: string
  email: string
  imageUrl: string
}

interface Rental {
  rentalId: number
  account: Account
  totalCost: number
  renStatus: string
}

interface Payment {
  paymentId: number
  rental: Rental
  amount: number
  paymentDate: string // Định dạng ISO: "2024-06-12T12:30:00Z"
}

export function RecentSales() {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [, , paymentResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/rental'),
          axios.get('http://localhost:8080/api/rental-vehicle'),
          axios.get('http://localhost:8080/api/payment'),
        ])

        // Sắp xếp giảm dần theo ID và lấy 10 giao dịch gần nhất
        const sortedPayments = paymentResponse.data
          .sort((a: Payment, b: Payment) => b.paymentId - a.paymentId)
          .slice(0, 10)

        setPayments(sortedPayments)
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error)
      }
    }

    fetchData()
  }, [])

  // Hàm tạo fallback avatar từ tên
  const getAvatarFallback = (fullName: string) => {
    const initials = fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
    return initials.slice(0, 2)
  }

  // Hàm định dạng ngày giờ chi tiết
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes} ${day}/${month}/${year}`
  }

  return (
    <div className='space-y-4 h-screen overflow-y-auto'>
      {payments.map(payment => (
        <div key={payment.paymentId} className='flex items-center gap-4'>
          <Avatar className='h-9 w-9'>
            <AvatarImage
              src={payment.rental.account.imageUrl || '/avatars/default.png'}
              alt={payment.rental.account.fullName}
            />
            <AvatarFallback>
              {getAvatarFallback(payment.rental.account.fullName)}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-1 flex-wrap items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {payment.rental.account.fullName}
              </p>
              <p className='text-sm text-muted-foreground'>
                {payment.rental.account.email}
              </p>
            </div>
            <div className='font-medium text-right'>
              <p>+{payment.amount.toLocaleString()}đ</p>
              <p className='text-xs text-muted-foreground'>
                {formatDateTime(payment.paymentDate)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}