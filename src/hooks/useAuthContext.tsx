import { CreatedAuthContext } from '@/contexts/contexts';
import { useContext } from 'react';

//! use context hook
export function useAuthContext() {
  const context = useContext(CreatedAuthContext);

  if (context === null) {
    throw new Error('useAuthContext must be used within a context Provider');
  }

  return context;
}
