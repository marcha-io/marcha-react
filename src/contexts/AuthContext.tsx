// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { supabase } from '../lib/supabase';

interface IAuthContext {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (val: boolean) => void;
}

const AuthContext = createContext<IAuthContext>({
  isUserLoggedIn: false,
  setIsUserLoggedIn: () =>
    console.error('AuthContext has not been initialised'),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsUserLoggedIn(!!session);
    });

    // Listen for auth state changes (e.g. token refresh, sign-out from another tab)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsUserLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({ isUserLoggedIn, setIsUserLoggedIn }),
    [isUserLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
