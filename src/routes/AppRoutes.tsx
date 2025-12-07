import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import ClientLayout from '@/layouts/client/ClientLayout';
import AdminLayout from '@/layouts/admin/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import AuthContext from '@/contexts/AuthContext';
import AuthProtectedWrapper from '@/routes/protected-wrappers/AuthProtectedWrapper';

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
        path: '/',
        element: <ClientLayout />,
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
