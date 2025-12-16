import AdminSidebar from '@/pages/admin/dashboard/AdminSidebar';
import { Outlet } from 'react-router-dom';

export default function AdminDashboardLayout() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-57px)] max-w-[1920px] grid-cols-[auto_1fr]">
      <AdminSidebar />

      <Outlet />
    </div>
  );
}
