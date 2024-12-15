import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
  IconLock,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'sidebar.dashboard',
    label:  '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Quản Lí  Xe',
    label: '4',
    href: '/tasks',
    icon: <IconChecklist size={18} />,
    sub: [
      { 
        title: 'Danh Sách Xe O-TO',
        label: '',
        href: '/carManagement',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Danh Sách Xe Máy',
        label: '',
        href: '/motorbikeManagements',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Bảo Quản Và Sửa Chữa',
        label: '',
        href: '/MaintenanceManagement',
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
  {
    title: 'Quản lý đơn thuê xe',
    label: '',
    href: '/chats',
    icon: <IconMessages size={18} />,
    sub: [
      {
        title: 'Danh Sách Đơn thuê',
        label: '',
        href: '/rental-page',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Danh Sách xe cho thuê',
        label: '',
        href: '/rental-vehicle-page',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Lịch Sử Thuê Xe',
        label: '',
        href: '/historyRental',
        icon: <IconHexagonNumber3 size={18} />,
      },
    ],
  },
  {
    title: 'Quản lý khách hàng',
    label: '',
    href: '/apps',
    icon: <IconApps size={18} />,
    sub: [
      {
        title: 'Danh Sách Khách Hàng',
        label: '',
        href: '/account-customer',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Lịch Sử',
        label: '',
        href: '/sign-in-2',
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
  {
    title: 'Quản lý tài chính',
    label: '',
    href: '',
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: 'Hoá đơn, Thanh Toán',
        label: '',
        href: '/payment',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Doanh Thu',
        label: '',
        href: '/sign-in-2',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Báo Cáo',
        label: '',
        href: '/sign-up',
        icon: <IconHexagonNumber3 size={18} />,
      },
    ],
  },
  {
    title: 'Quản lý khuyến mãi',
    label: '10',
    href: '/requests',
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: 'Mã giảm giá',
        label: '',
        href: '/disount-management',
        icon: <IconBoxSeam size={18} />,
      }
    ],
  },
  {
    title: 'Quản lí nhân sự',
    label: '',
    href: '/',
    icon: <IconUsers size={18} />,
    sub: [
      {
        title: 'Danh Sách Nhân Sự',
        label: '9',
        href: '/users',
        icon: <IconTruck size={18} />,
      },
      {
        title: 'Phân Quyền',
        label: '',
        href: '/extra-components',
        icon: <IconBoxSeam size={18} />,
      },
    ],
  },
  {
    title: 'Báo cáo thống kê',
    label: '',
    href: '/analysis',
    icon: <IconChartHistogram size={18} />,
    sub: [
      {
        title: 'Báo cáo hoạt động',
        label: '9',
        href: '/users',
        icon: <IconTruck size={18} />,
      },
      {
        title: 'Phân Tích',
        label: '',
        href: '/cargos',
        icon: <IconBoxSeam size={18} />,
      },
    ],
  },
  {
    title: 'Phản hồi hổ trợ',
    label: '',
    href: '/extra-components',
    icon: <IconComponents size={18} />,
    sub: [
      {
        title: 'Khách hàng',
        label: '9',
        href: '/users',
        icon: <IconTruck size={18} />,
      },
      {
        title: 'Tin Nhắn',
        label: '',
        href: '/cargos',
        icon: <IconBoxSeam size={18} />,
      },
      {
        title: 'Thông Báo',
        label: '',
        href: '/cargos',
        icon: <IconBoxSeam size={18} />,
      },
    ],
  },
  {
    title: 'sidebar.error_pages',
    label: '',
    href: '',
    icon: <IconExclamationCircle size={18} />,
    sub: [
      {
        title: 'sidebar.error_not_found',
        label: '',
        href: '/404',
        icon: <IconError404 size={18} />,
      },
      {
        title: 'sidebar.error_internal_server',
        label: '',
        href: '/500',
        icon: <IconServerOff size={18} />,
      },
      {
        title: 'sidebar.error_maintenance',
        label: '',
        href: '/503',
        icon: <IconBarrierBlock size={18} />,
      },
      {
        title: 'sidebar.error_unauthorised',
        label: '',
        href: '/401',
        icon: <IconLock size={18} />,
      },
    ],
  },
  {
    title: 'sidebar.settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
