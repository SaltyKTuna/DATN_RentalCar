import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { RecentSales } from './components/recent-sales'
import { Overview } from './components/overview'
import { useTranslations } from 'use-intl'
import LanguageSwitch from '@/components/language-switch'
import { RentalDataTable } from '@/pages/dashboard/components/rentalDataTable'

  
export default function Dashboard() {
  const t = useTranslations('dashboard')
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <LanguageSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {t('dashboard')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>{t('download')}</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>{t('overview')}</TabsTrigger>
              <TabsTrigger value='rental_data'>{'Danh sách thuê'}</TabsTrigger>
              <TabsTrigger value='reports'>{t('reports')}</TabsTrigger>
              <TabsTrigger value='notifications'>
                {t('notifications')}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('total_revenue')}
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$45,231.89</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('from_last_month', { amount: '+20.1%' })}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('subscriptions')}
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+2350</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('from_last_month', { amount: '+180.1%' })}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('sales')}
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+12,234</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('from_last_month', { amount: '+19%' })}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('active_now')}
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('since_last_hour', { amount: '+201' })}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>{'Tổng Doanh Thu Trong Tháng Này'}</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>{t('recent_sales')}</CardTitle>
                  <CardDescription>
                    {t('recent_sales_desc', { amount: '265' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* New Analytics Tab Content */}
          <TabsContent value='analytics' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('analytics')}</CardTitle>
                <CardDescription>
                  {t('analytics_desc', { period: 'Last 30 days' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add analytics components or charts here */}
                <p>Detailed analytics and performance metrics</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Reports Tab Content */}
          <TabsContent value='rental_data' className='space-y-4'>
            <RentalDataTable />
          </TabsContent>

          {/* New Notifications Tab Content */}
          <TabsContent value='notifications' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('notifications')}</CardTitle>
                <CardDescription>
                  {t('notifications_desc', { unread: '3' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='border-b pb-2'>
                    <p className='font-medium'>New Order #1234</p>
                    <p className='text-sm text-muted-foreground'>
                      Received 2 hours ago
                    </p>
                  </div>
                  <div className='border-b pb-2'>
                    <p className='font-medium'>Payment Received</p>
                    <p className='text-sm text-muted-foreground'>
                      Confirmed 1 hour ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Customers Tab Content */}
          <TabsContent value='customers' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('customers')}</CardTitle>
                <CardDescription>
                  {t('customers_desc', { total: '1,250' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add customer list or summary */}
                <div className='space-y-2'>
                  <RecentSales />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Products Tab Content */}
          <TabsContent value='products' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('products')}</CardTitle>
                <CardDescription>
                  {t('products_desc', { active: '45' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-2xl font-bold'>120</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Out of Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-2xl font-bold'>5</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

const topNav = [
  {
    title: 'dashboard.overview',
    href: 'dashboard/overview',
    isActive: true,
  },
  {
    title: 'dashboard.customers',
    href: 'dashboard/customers',
    isActive: false,
  },
  {
    title: 'dashboard.products',
    href: 'dashboard/products',
    isActive: false,
  },
  {
    title: 'dashboard.settings',
    href: 'dashboard/settings',
    isActive: false,
  },
]
