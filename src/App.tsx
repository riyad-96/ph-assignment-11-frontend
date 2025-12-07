import { ToastContainer } from 'kitzo/react';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import AppLoadingScreen from './components/AppLoadingScreen';

export default function App() {
  const { isUserLoading } = useAuthContext();

  return (
    <div className="text-content bg-canvas">
      {isUserLoading ? <AppLoadingScreen /> : <Outlet />}
      <ToastContainer position="top-right" />
    </div>
  );
}
