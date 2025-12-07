import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';

export default function ClientLayout() {
  return (
    <div className="h-screen overflow-y-auto">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
