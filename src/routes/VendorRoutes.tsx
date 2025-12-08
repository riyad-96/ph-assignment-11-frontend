import type { RouteObject } from 'react-router-dom';
import ProtectedRouteWrapper from './protected_wrappers/ProtectedRouteWrapper';
import VendorLayout from '@/layouts/vendor/VendorLayout';
import RoleBasedRouteProtectedWrapper from './protected_wrappers/RoleBasedRouteProtectedWrapper';
import VendorDashboardLayout from '@/layouts/vendor/VendorDashboardLayout';
import VendorDashboard from '@/pages/vendor/dashboard/VendorDashboard';
import VendorProfile from '@/pages/vendor/dashboard/VendorProfile';

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
      ],
    },
  ],
};

export default vendorRoutes;