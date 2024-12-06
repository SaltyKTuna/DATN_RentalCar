import { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const API_URL = 'http://localhost:8080/api/rental'

const RENTAL_STATUS = {
  PENDING: 'Chờ xác nhận',
  ARRIVING: 'Đang tới',
  RENTING: 'Đang thuê',
  COMPLETED: 'Hoàn tất',
  CANCELLED: 'Đã hủy',
} as const

const RENTAL_STATUS_REVERSE = Object.entries(RENTAL_STATUS).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

// Schema validation
const rentalSchema = z.object({
  accountId: z.number(),
  rentalDate: z.date(),
  returnDate: z.date(),
  actualReturnDate: z.date().nullable().optional(),
  totalCost: z.number(),
  renStatus: z.string(),
  discountId: z.number().nullable(),
  haveDriver: z.boolean(),
  rentalLocations: z.string(),
  notes: z.string().optional(),
})

// Thêm interface để type safety
interface Rental {
  rentalId: number
  account: {
    accountId: number
    fullName: string
  }
  rentalDate: string
  returnDate: string
  actualReturnDate: string | null
  totalCost: number
  renStatus: string
  discount: {
    discountId: number | null
  } | null
  haveDriver: boolean
  rentalLocations: string
  notes: string | null
}

// Thêm hàm helper để xử lý datetime
const combineDateAndTime = (date: Date, timeString: string): Date => {
  const [hours, minutes] = timeString.split(':').map(Number)
  const newDate = new Date(date)
  newDate.setHours(hours, minutes)
  return newDate
}

export default function RentalPage() {
  const [rentals, setRentals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRental, setSelectedRental] = useState<any>(null)
  const { toast } = useToast()
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const PAGE_SIZE = 5
  const [sortField, setSortField] = useState<'rentalDate' | 'returnDate'>('rentalDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [searchCustomerName, setSearchCustomerName] = useState('');

  const filteredRentals = searchCustomerName.trim() === ''
    ? rentals
    : rentals.filter(rental => rental.account.fullName.toLowerCase().includes(searchCustomerName.toLowerCase()));

  const form = useForm({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      accountId: 0,
      rentalDate: new Date(),
      returnDate: new Date(),
      actualReturnDate: undefined,
      totalCost: 0,
      renStatus: RENTAL_STATUS.PENDING,
      discountId: 0,
      haveDriver: false,
      rentalLocations: '',
      notes: '',
    },
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return moment(date).format('DD/MM/YYYY HH:mm')
  }

  const fetchRentals = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${API_URL}?page=${page}&size=${PAGE_SIZE}&sort=${sortField},${sortDirection}`
      )
      setRentals(response.data.content || [])
      setTotalPages(response.data.totalPages)
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể tải dữ liệu',
        variant: 'destructive',
      })
      setRentals([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRentals()
  }, [page, sortField, sortDirection])

  const resetForm = () => {
    form.reset({
      accountId: 0,
      rentalDate: new Date(),
      returnDate: new Date(),
      actualReturnDate: undefined,
      totalCost: 0,
      renStatus: RENTAL_STATUS.PENDING,
      discountId: 0,
      haveDriver: false,
      rentalLocations: '',
      notes: '',
    })
    setSelectedRental(null)
  }

  const onSubmit = async (data: z.infer<typeof rentalSchema>) => {
    try {
      setLoading(true)
      const payload: any = {
        ...data,
        account: { accountId: data.accountId },
        renStatus: RENTAL_STATUS[data.renStatus as keyof typeof RENTAL_STATUS]
      }

      if (data.discountId) {
        payload.discount = { discountId: data.discountId };
      }

      if (selectedRental) {
        await axios.put(`${API_URL}/${selectedRental.rentalId}`, payload)
        toast({
          title: 'Thành công',
          description: 'Đã cập nhật thông tin thuê xe',
        })
      } else {
        await axios.post(API_URL, payload)
        toast({
          title: 'Thành công',
          description: 'Đã thêm thông tin thuê xe mới',
        })
      }
      resetForm()
      fetchRentals()
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.response?.data || 'Thao tác thất bại',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (rental: Rental) => {
    setSelectedRental(rental)
    form.reset({
      accountId: rental.account.accountId,
      rentalDate: new Date(rental.rentalDate),
      returnDate: new Date(rental.returnDate),
      actualReturnDate: rental.actualReturnDate ? new Date(rental.actualReturnDate) : undefined,
      totalCost: rental.totalCost,
      renStatus: RENTAL_STATUS_REVERSE[rental.renStatus] || 'PENDING',
      discountId: rental.discount?.discountId || 0,
      haveDriver: rental.haveDriver,
      rentalLocations: rental.rentalLocations,
      notes: rental.notes || '',
    })
  }

  const handleDelete = async (id: number) => {
    try {
      setLoading(true)
      const response = await axios.delete(`${API_URL}/${id}`)
      toast({
        title: 'Thành công',
        description: response.data.message || 'Đã xóa thông tin thuê xe',
      })
      fetchRentals()
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.response?.data || 'Thao tác thất bại',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field: 'rentalDate' | 'returnDate') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className='container mx-auto p-6'>
        <h1 className='mb-6 text-2xl font-bold'>
          {selectedRental ? 'Edit Rental' : 'Create Rental'}
        </h1>

        {/* Form */}
        <div className='mb-6 rounded-lg p-6 shadow-md'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='accountId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã khách hàng</FormLabel>
                      <FormControl>
                        <Input type='number' {...field} placeholder='Nhập mã khách hàng' />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='rentalDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày thuê</FormLabel>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  moment(field.value).format('DD/MM/YYYY')
                                ) : (
                                  <span>Chọn ngày thuê</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) {
                                  const currentTime = field.value ? moment(field.value).format('HH:mm') : '00:00'
                                  field.onChange(combineDateAndTime(date, currentTime))
                                }
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormControl>
                          <Input
                            type="time"
                            className="w-[120px]"
                            value={moment(field.value).format('HH:mm')}
                            onChange={(e) => {
                              if (field.value) {
                                field.onChange(combineDateAndTime(field.value, e.target.value))
                              }
                            }}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='returnDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày trả dự kiến</FormLabel>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  moment(field.value).format('DD/MM/YYYY')
                                ) : (
                                  <span>Ch���n ngày trả</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) {
                                  const currentTime = field.value ? moment(field.value).format('HH:mm') : '00:00'
                                  field.onChange(combineDateAndTime(date, currentTime))
                                }
                              }}
                              disabled={(date) =>
                                moment(date).isBefore(moment(form.getValues('rentalDate')).startOf('day'))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormControl>
                          <Input
                            type="time"
                            className="w-[120px]"
                            value={moment(field.value).format('HH:mm')}
                            onChange={(e) => {
                              if (field.value) {
                                field.onChange(combineDateAndTime(field.value, e.target.value))
                              }
                            }}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='actualReturnDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày trả thực tế</FormLabel>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[240px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  moment(field.value).format('DD/MM/YYYY')
                                ) : (
                                  <span>Chọn ngày trả thực tế</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value || undefined}
                              onSelect={(date) => {
                                if (date) {
                                  const currentTime = field.value ? moment(field.value).format('HH:mm') : '00:00'
                                  field.onChange(combineDateAndTime(date, currentTime))
                                }
                              }}
                              disabled={(date) =>
                                moment(date).isBefore(moment(form.getValues('rentalDate')).startOf('day'))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormControl>
                          <Input
                            type="time"
                            className="w-[120px]"
                            value={field.value ? moment(field.value).format('HH:mm') : ''}
                            onChange={(e) => {
                              if (field.value) {
                                field.onChange(combineDateAndTime(field.value, e.target.value))
                              }
                            }}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='totalCost'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tổng tiền (VNĐ)</FormLabel>
                      <FormControl>
                        <Input 
                          type='number' 
                          {...field} 
                          placeholder='Nhập tổng tiền'
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='renStatus'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn tr���ng thái'>
                              {RENTAL_STATUS[field.value as keyof typeof RENTAL_STATUS]}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(RENTAL_STATUS).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='discountId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã giảm giá</FormLabel>
                      <FormControl>
                        <Input 
                          type='number' 
                          {...field} 
                          placeholder='Nhập mã giảm giá'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='haveDriver'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Có tài xế</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='rentalLocations'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa điểm thuê</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Nhập địa điểm thuê xe' />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormLabel>Ghi chú</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder='Nhập ghi chú nếu có'
                          className='resize-none'
                          rows={3}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex justify-end space-x-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={resetForm}
                >
                  Làm trống
                </Button>
                {selectedRental && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={resetForm}
                  >
                    Hủy
                  </Button>
                )}
                <Button type='submit' disabled={loading}>
                  {loading ? 'Đang xử lý...' : selectedRental ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <Input 
            type="text" 
            placeholder="Tìm kiếm theo tên khách hàng" 
            value={searchCustomerName}
            onChange={(e) => setSearchCustomerName(e.target.value)} 
          />
        </div>

        <div className='rounded-lg shadow-md'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('rentalDate')}
                >
                  Ngày thuê {sortField === 'rentalDate' && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('returnDate')}
                >
                  Ngày trả {sortField === 'returnDate' && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead>Ngày trả thực tế</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : filteredRentals.length === 0 ? ( // Use filteredRentals here 
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Không tìm thấy dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                filteredRentals.map((rental) => (
                  <TableRow key={rental.rentalId}>
                    <TableCell>{rental.rentalId}</TableCell>
                    <TableCell>{rental.account.fullName}</TableCell>
                    <TableCell>{formatDate(rental.rentalDate)}</TableCell>
                    <TableCell>{formatDate(rental.returnDate)}</TableCell>
                    <TableCell>
                      {rental.actualReturnDate 
                        ? formatDate(rental.actualReturnDate)
                        : '-'}
                    </TableCell>
                    <TableCell>{rental.rentalLocations}</TableCell>
                    <TableCell>{rental.renStatus}</TableCell>
                    <TableCell>{formatCurrency(rental.totalCost)}</TableCell>
                    <TableCell>
                      <div className='flex space-x-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEdit(rental)}
                          disabled={loading}
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant='destructive'
                              size='sm'
                              disabled={loading}
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the rental.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(rental.rentalId)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 p-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0 || loading}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1 || loading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
