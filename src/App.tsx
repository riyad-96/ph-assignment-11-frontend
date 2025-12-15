import { ToastContainer } from 'kitzo/react';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import AppLoadingScreen from './components/AppLoadingScreen';
import LogoutPopup from './components/LogoutPopup';

export default function App() {
  const { isUserLoading, theme } = useAuthContext();

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} text-content bg-canvas`}>
      {isUserLoading ? <AppLoadingScreen /> : <Outlet />}

      <ToastContainer position="top-right" />

      <LogoutPopup />
    </div>
  );
}
