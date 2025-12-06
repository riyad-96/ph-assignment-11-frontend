import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import ClientLayout from '@/layouts/client/ClientLayout';
import AdminLayout from '@/layouts/admin/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        element: <AuthLayout />,
      },
    ],
  },
]);

export default router;
