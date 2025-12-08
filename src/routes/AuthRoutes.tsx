import type { RouteObject } from 'react-router-dom';
import AuthProtectedWrapper from './protected_wrappers/AuthProtectedWrapper';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import RegisterAccount from '@/pages/auth/Register';

const authRoutes: RouteObject = {
  path: 'auth',
  element: <AuthProtectedWrapper children={<AuthLayout />} />,
  children: [
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <RegisterAccount />,
    },
  ],
};

export default authRoutes;
