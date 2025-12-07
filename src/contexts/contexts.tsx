import type { AuthContextType } from '@/contexts/AuthContext';

import { createContext } from 'react';

export const CreatedAuthContext = createContext<AuthContextType | null>(null);
