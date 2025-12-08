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
import Dashboard from '@/pages/client/dashboard/Dashboard';
import Profile from '@/pages/profile/Profile';
import ProtectedRouteWrapper from './protected_wrappers/ProtectedRouteWrapper';

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
            element: <ProtectedRouteWrapper children={<Dashboard />} />,
          },
          {
            path: 'profile',
            element: <ProtectedRouteWrapper children={<Profile />} />,
          },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
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
