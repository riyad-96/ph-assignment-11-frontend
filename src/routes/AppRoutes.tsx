import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import ClientLayout from '@/layouts/client/ClientLayout';
import AdminLayout from '@/layouts/admin/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import AuthContext from '@/contexts/AuthContext';
import AuthProtectedWrapper from '@/routes/protected_wrappers/AuthProtectedWrapper';
import Home from '@/pages/client/home/Home';
import AllTickets from '@/pages/client/all_tickets/AllTickets';
import ProtectedRouteWrapper from './protected_wrappers/ProtectedRouteWrapper';
import VendorLayout from '@/layouts/vendor/VendorLayout';
import AdminDashboard from '@/pages/admin/dashboard/AdminDashboard';
import RoleBasedRouteProtectedWrapper from './protected_wrappers/RoleBasedRouteProtectedWrapper';
import VendorDashboard from '@/pages/vendor/dashboard/VendorDashboard';
import AdminProfile from '@/pages/admin/dashboard/AdminProfile';
import VendorProfile from '@/pages/vendor/dashboard/VendorProfile';
import AdminDashboardLayout from '@/layouts/admin/AdminDashboardLayout';
import VendorDashboardLayout from '@/layouts/vendor/VendorDashboardLayout';
import ClientDashboardLayout from '@/layouts/client/ClientDashboardLayout';
import ClientDashboard from '@/pages/client/dashboard/ClientDashboard';
import ClientProfile from '@/pages/client/dashboard/ClientProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthContext>
        <App />
      </AuthContext>
    ),
    children: [
      {
        path: '',
        element: <ClientLayout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'all-tickets',
            element: <ProtectedRouteWrapper children={<AllTickets />} />,
          },
          {
            path: 'dashboard',
            element: (
              <ProtectedRouteWrapper
                children={
                  <RoleBasedRouteProtectedWrapper
                    requiredRole="user"
                    children={<ClientDashboardLayout />}
                  />
                }
              />
            ),
            children: [
              {
                index: true,
                element: <ClientDashboard />,
              },
              {
                path: 'profile',
                element: <ClientProfile />,
              },
            ],
          },
        ],
      },
      {
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
      },
      {
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
            ],
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthProtectedWrapper children={<AuthLayout />} />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export default router;
