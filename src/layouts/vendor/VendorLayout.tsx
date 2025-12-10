import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';

export default function VendorLayout() {
  return (
    <div className="overflow-x-hidden main-scroller grid h-screen grid-rows-[auto_1fr_auto] overflow-y-auto">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
