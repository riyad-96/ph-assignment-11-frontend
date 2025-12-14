import ClientLayout from '@/layouts/client/ClientLayout';
import Home from '@/pages/client/home/Home';
import type { RouteObject } from 'react-router-dom';
import ProtectedRouteWrapper from './protected_wrappers/ProtectedRouteWrapper';
import AllTickets from '@/pages/client/all_tickets/AllTickets';
import RoleBasedRouteProtectedWrapper from './protected_wrappers/RoleBasedRouteProtectedWrapper';
import ClientDashboardLayout from '@/layouts/client/ClientDashboardLayout';
import ClientDashboard from '@/pages/client/dashboard/ClientDashboard';
import ClientProfile from '@/pages/client/dashboard/ClientProfile';
import BookedTickets from '@/pages/client/dashboard/booked_tickets/BookedTickets';
import TransactionHistory from '@/pages/client/dashboard/transaction_history/TransactionHistory';
import TicketDetails from '@/pages/client/all_tickets/ticket_details/TicketDetails';
import PaymentSuccess from '@/pages/client/dashboard/PaymentSuccess';
import PaymentCancelled from '@/pages/client/dashboard/PaymentCancelled';

const clientRoutes: RouteObject = {
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
      path: 'all-tickets/:id',
      element: <ProtectedRouteWrapper children={<TicketDetails />} />,
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
        {
          path: 'booked-tickets',
          element: <BookedTickets />,
        },
        {
          path: 'transactions',
          element: <TransactionHistory />,
        },
        {
          path: 'payment-success',
          element: <PaymentSuccess />,
        },
        {
          path: 'payment-cancelled',
          element: <PaymentCancelled />,
        },
      ],
    },
  ],
};

export default clientRoutes;
