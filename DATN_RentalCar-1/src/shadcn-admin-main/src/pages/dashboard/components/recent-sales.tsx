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
  paymentDate: string
}

export function RecentSales() {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    // Hàm fetch dữ liệu từ các API
    const fetchData = async () => {
      try {
        const [rentalResponse, rentalVehicleResponse, paymentResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/rental'),
          axios.get('http://localhost:8080/api/rental-vehicle'),
          axios.get('http://localhost:8080/api/payment')
        ])

        // Giả sử API trả về mảng các payment
        setPayments(paymentResponse.data)
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
            <div className='font-medium'>
              +{payment.amount.toLocaleString()}đ
              <p className='text-xs text-muted-foreground'>
                {payment.paymentDate}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}