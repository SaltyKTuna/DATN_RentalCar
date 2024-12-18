import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function Overview() {
  const [data, setData] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/payment');
        const payments = response.data;

        // Tính tổng doanh thu theo ngày
        const dailyRevenue: { [key: string]: number } = {};
        payments.forEach((payment: any) => {
          const paymentDate = new Date(payment.paymentDate);
          const day = paymentDate.getDate();
          const month = paymentDate.getMonth() + 1; // Tháng bắt đầu từ 0
          const year = paymentDate.getFullYear();
          const formattedDate = `${day}/${month}/${year}`; // Định dạng ngày

          dailyRevenue[formattedDate] = (dailyRevenue[formattedDate] || 0) + payment.amount;
        });

        // Tạo dữ liệu cho 30 ngày trong tháng hiện tại
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const chartData = Array.from({ length: 30 }, (_, index) => {
          const day = index + 1;
          const dateKey = `${day}/${currentMonth + 1}/${currentYear}`;
          return {
            name: dateKey,
            total: dailyRevenue[dateKey] || 0, // Nếu không có dữ liệu, đặt là 0
          };
        });

        setData(chartData);
        setTotalAmount(Object.values(dailyRevenue).reduce((acc, amount) => acc + amount, 0));
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu thanh toán:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div> 
      <h2>Tổng số tiền: {totalAmount.toLocaleString('vi-VN')} VND</h2>
      <ResponsiveContainer width='100%' height={450}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" /> {/* Đường phân cách */}
          <XAxis dataKey='name' stroke='#888888' fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke='#888888' fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value.toLocaleString('vi-VN')} VND`} />
          <Tooltip 
            formatter={(value: number) => [`${value.toLocaleString('vi-VN')} VND`, 'Tổng doanh thu']} 
            contentStyle={{ backgroundColor: '#333', color: '#fff' }}
          /> {/* Hiển thị tooltip */}
          <Bar dataKey='total' fill='currentColor' radius={[4, 4, 0, 0]} className='fill-primary' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}