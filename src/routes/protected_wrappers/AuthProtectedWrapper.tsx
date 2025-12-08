import { useAuthContext } from '@/hooks/useAuthContext';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthProtectedWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuthContext();

  if (user) return <Navigate to="/" />;

  return children;
}
