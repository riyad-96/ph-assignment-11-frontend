import ClientSidebar from '@/pages/client/dashboard/ClientSidebar';
import { Outlet } from 'react-router-dom';

export default function ClientDashboardLayout() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-57px)] max-w-[1920px] grid-cols-[auto_1fr]">
      <ClientSidebar />

      <Outlet />
    </div>
  );
}
