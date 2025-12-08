import { useAuthContext } from '@/hooks/useAuthContext';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type RoleBasedRouteProtectedWrapperPropsType = {
  requiredRole: 'user' | 'vendor' | 'admin';
  children: ReactNode;
};

export default function RoleBasedRouteProtectedWrapper({
  requiredRole,
  children,
}: RoleBasedRouteProtectedWrapperPropsType) {
  const { user } = useAuthContext();
  const role = user?.role as string;

  if (role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}
