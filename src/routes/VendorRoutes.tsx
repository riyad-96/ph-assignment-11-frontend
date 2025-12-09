import type { RouteObject } from 'react-router-dom';
import ProtectedRouteWrapper from './protected_wrappers/ProtectedRouteWrapper';
import VendorLayout from '@/layouts/vendor/VendorLayout';
import RoleBasedRouteProtectedWrapper from './protected_wrappers/RoleBasedRouteProtectedWrapper';
import VendorDashboardLayout from '@/layouts/vendor/VendorDashboardLayout';
import VendorDashboard from '@/pages/vendor/dashboard/VendorDashboard';
import VendorProfile from '@/pages/vendor/dashboard/VendorProfile';
import AddTickets from '@/pages/vendor/dashboard/add_tickets/AddTickets';
import Bookings from '@/pages/vendor/dashboard/bookings/Bookings';
import MyTickets from '@/pages/vendor/dashboard/my_tickets/MyTickets';
import RevenueOverview from '@/pages/vendor/dashboard/revenue_overview/RevenueOverview';

const vendorRoutes: RouteObject = {
  path: 'vendor',
  element: <ProtectedRouteWrapper children={<VendorLayout />} />,
  children: [
    {
      path: 'dashboard',
      element: (
        <RoleBasedRouteProtectedWrapper
          requiredRole="vendor"
          children={<VendorDashboardLayout />}
        />
      ),
      children: [
        {
          index: true,
          element: <VendorDashboard />,
        },
        {
          path: 'profile',
          element: <VendorProfile />,
        },
        {
          path: 'add-tickets',
          element: <AddTickets />,
        },
        {
          path: 'my-tickets',
          element: <MyTickets />,
        },
        {
          path: 'bookings',
          element: <Bookings />,
        },
        {
          path: 'revenue-overview',
          element: <RevenueOverview />,
        },
      ],
    },
  ],
};

export default vendorRoutes;
