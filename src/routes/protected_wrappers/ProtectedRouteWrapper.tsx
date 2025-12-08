import { useAuthContext } from '@/hooks/useAuthContext';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRouteWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={location.pathname}
      />
    );
  }
  return children;
}
