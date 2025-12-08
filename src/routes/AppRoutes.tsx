import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import AuthContext from '@/contexts/AuthContext';
import adminRoutes from './AdminRoutes';
import clientRoutes from './ClientRoutes';
import vendorRoutes from './VendorRoutes';
import authRoutes from './AuthRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthContext>
        <App />
      </AuthContext>
    ),
    children: [clientRoutes, vendorRoutes, adminRoutes, authRoutes],
  },
]);

export default router;
