import { auth, googleProvider } from '@/configs/firebase.config';
import {
  onIdTokenChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { CreatedAuthContext } from '@/contexts/contexts';
import { serverAPI } from '@/helpers/server';
import { toast } from 'kitzo/react';

import type {
  RegisterFormFieldTypes,
  LoginFormFieldTypes,
} from '@/pages/auth/auth.types';
import type { ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { AxiosError } from 'axios';
import type { User } from '@/contexts/authContext.type';
import type { FirebaseError } from 'firebase/app';

//! type for context
export type AuthContextType = {
  readonly user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isUserLoading: boolean;
  handleRegistration: (data: RegisterFormFieldTypes) => Promise<void>;
  handleLogin: (data: LoginFormFieldTypes) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
};

//! context wrapper component
function AuthContext({ children }: { children: ReactNode }) {
  const [isUserLoading, setIsUserLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isGoogleLoging, setIsGoogleLoging] = useState(false);

  const server = serverAPI(true);

  // Listener for id token change
  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (firebaseUser) => {
      if (isRegistering || isGoogleLoging) return;

      let user = null;
      if (firebaseUser) {
        try {
          const response = await server.get('/user/get');
          user = response.data;
        } catch (err) {
          console.log(err);
        }
      }

      setUser(user);
      setIsUserLoading(false);
    });

    return unsub;
  }, [server, isRegistering, isGoogleLoging]);

  useEffect(() => {
    if (isUserLoading) return;
    console.log(user);
  }, [user, isUserLoading]);

  // handle registration
  async function handleRegistration(data: RegisterFormFieldTypes) {
    try {
      const createResponse = await server.post('/user/create', {
        email: data.email,
        password: data.password,
        name: data.name,
        photoURL: data.photoURL,
      });
      await signInWithCustomToken(auth, createResponse.data.customToken);
      const getResponse = await server.get('/user/get');
      setUser(getResponse.data);
      setIsRegistering(false);
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as {
        code: string;
        message: string;
      };
      if (errorData?.code && errorData.code === 'EMAIL_ALREADY_EXISTS') {
        toast.error('Email already exists');
        return;
      }
      toast.error('Registration failed');
    }
  }

  // handle login
  async function handleLogin(data: LoginFormFieldTypes) {
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await cred.user.getIdToken(true);

      const response = await server.get('/user/get');
      setUser(response.data);
    } catch (err) {
      console.error(err);
      const error = err as FirebaseError;
      if (error.code && error.code === 'auth/invalid-credential') {
        return toast.error('Invalid email or password');
      }
      toast.error('Login failed');
    }
  }

  // hangle google login
  async function handleGoogleLogin() {
    setIsGoogleLoging(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const user = cred.user;

      await user.getIdToken(true);

      const googlePostResponse = await server.post('/user/sociallogin', {
        name: user.displayName,
        photoURL: user.photoURL,
      });
      setUser(googlePostResponse.data);
    } catch (err) {
      const error = err as FirebaseError;

      console.error(error);
      if (error.code === 'auth/popup-closed-by-user') {
        return toast.error('Google login cancelled');
      }
      toast.error('Loading failed');
    } finally {
      setIsGoogleLoging(false);
    }
  }

  return (
    <CreatedAuthContext.Provider
      value={{
        user,
        setUser,
        isUserLoading,
        handleRegistration,
        handleLogin,
        handleGoogleLogin,
      }}
    >
      {children}
    </CreatedAuthContext.Provider>
  );
}

export default AuthContext;
