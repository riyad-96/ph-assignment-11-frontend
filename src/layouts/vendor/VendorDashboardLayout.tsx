import VendorSidebar from '@/pages/vendor/dashboard/VendorSidebar';
import { Outlet } from 'react-router-dom';

export default function VendorDashboardLayout() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-57px)] max-w-[1920px] grid-cols-[auto_1fr]">
      <VendorSidebar />

      <Outlet />
    </div>
  );
}
