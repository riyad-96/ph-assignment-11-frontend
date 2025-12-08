import AdminLayout from '@/layouts/admin/AdminLayout';
import type { RouteObject } from 'react-router-dom';
import ProtectedRouteWrapper from './protected_wrappers/ProtectedRouteWrapper';
import RoleBasedRouteProtectedWrapper from './protected_wrappers/RoleBasedRouteProtectedWrapper';
import AdminDashboardLayout from '@/layouts/admin/AdminDashboardLayout';
import AdminDashboard from '@/pages/admin/dashboard/AdminDashboard';
import AdminProfile from '@/pages/admin/dashboard/AdminProfile';
import ManageTickets from '@/pages/admin/dashboard/manage_tickets/ManageTickets';
import ManageUsers from '@/pages/admin/dashboard/manage_users/ManageUsers';
import AdvertiseTickets from '@/pages/admin/dashboard/advertise_tickets/AdvertiseTickets';

const adminRoutes: RouteObject = {
  path: 'admin',
  element: <ProtectedRouteWrapper children={<AdminLayout />} />,
  children: [
    {
      path: 'dashboard',
      element: (
        <RoleBasedRouteProtectedWrapper requiredRole="admin">
          <AdminDashboardLayout />
        </RoleBasedRouteProtectedWrapper>
      ),
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: 'profile',
          element: <AdminProfile />,
        },
        {
          path: 'manage-tickets',
          element: <ManageTickets />,
        },
        {
          path: 'manage-users',
          element: <ManageUsers />,
        },
        {
          path: 'advertise-tickets',
          element: <AdvertiseTickets />,
        },
      ],
    },
  ],
};

export default adminRoutes;