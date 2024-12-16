import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-in-2',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in-2')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },
  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {

        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      //Cài đặt tài khoản
      { path: 'users', lazy: async () => ({ Component: (await import('@/pages/accounts/accountSettings')).default, }), },
      //Quản Lí Xe Ô Tô
      { path: 'carManagement', lazy: async () => ({ Component: (await import('@/pages/vehiclemanage/carManagement')).default, }), },
      //Quản Lú Xe Máy
      { path: 'motorbikeManagements', lazy: async () => ({ Component: (await import('@/pages/vehiclemanage/motorbikeManagements')).default, }), },
      // Bảo quản và sửa chửa
      { path: 'MaintenanceManagement', lazy: async () => ({ Component: (await import('@/pages/maintenance/MaintenanceManagement')).default, }), },
      //rental
      {
        path: '/rental-page',
        lazy: async () => ({
          Component: (await import('@/pages/rental/rentalPage')).default,
        }),
      },
      //history rental
      { path: 'HistoryRental', lazy: async () => ({ Component: (await import('@/pages/historyRental/historyRental')).default, }), },

      //payment
      {
        path: '/payment',
        lazy: async () => ({
          Component: (await import('@/pages/payment/PaymentManagement')).default,
        }),
      },

      //rental vehicle
      {
        path: '/rental-vehicle-page',
        lazy: async () => ({
          Component: (await import('@/pages/rentalVehicle/rentalVehiclePage')).default,
        }),
      },

      //rental vehicle
      {
        path: '/disount-management',
        lazy: async () => ({
          Component: (await import('@/pages/discounts/discountManagement')).default,
        }),
      },

      //account-customer
      {
        path: '/account-customer',
        lazy: async () => ({
          Component: (await import('@/pages/accounts/accountCustomerManagement')).default,
        }),
      },
      //driver
      {
        path: '/driverManagement',
        lazy: async () => ({
          Component: (await import('@/pages/accounts/driverManagement')).default,
        }),
      },
      //driving-license
      {
        path: '/drivingLicense',
        lazy: async () => ({
          Component: (await import('@/pages/accounts/drivingLicense')).default,
        }),
      },
      {
        path: 'tasks',
        lazy: async () => ({
          Component: (await import('@/pages/tasks')).default,
        }),
      },
      {
        path: 'chats',
        lazy: async () => ({
          Component: (await import('@/pages/chats')).default,
        }),
      },
      {
        path: 'apps',
        lazy: async () => ({
          Component: (await import('@/pages/apps')).default,
        }),
      },
      {
        path: 'analysis',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'extra-components',
        lazy: async () => ({
          Component: (await import('@/pages/extra-components/index')).default,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('./pages/settings')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/settings/profile')).default,
            }),
          },
          {
            path: 'account',
            lazy: async () => ({
              Component: (await import('./pages/settings/account')).default,
            }),
          },
          {
            path: 'appearance',
            lazy: async () => ({
              Component: (await import('./pages/settings/appearance')).default,
            }),
          },
          {
            path: 'notifications',
            lazy: async () => ({
              Component: (await import('./pages/settings/notifications'))
                .default,
            }),
          },
          {
            path: 'display',
            lazy: async () => ({
              Component: (await import('./pages/settings/display')).default,
            }),
          },
          {
            path: 'error-example',
            lazy: async () => ({
              Component: (await import('./pages/settings/error-example'))
                .default,
            }),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
      // LIST CAR


    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
