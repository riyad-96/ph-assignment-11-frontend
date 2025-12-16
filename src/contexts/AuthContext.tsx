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

import type {
  RegisterFormFieldTypes,
  LoginFormFieldTypes,
} from '@/pages/auth/auth.types';
import type { ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { AxiosError } from 'axios';
import type { User } from '@/contexts/authContext.type';
import type { FirebaseError } from 'firebase/app';
import uploadImageToImgbb from '@/helpers/imageUpload';
import customToast from '@/helpers/triggerToast';

//! type for context
export type AuthContextType = {
  readonly user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isUserLoading: boolean;
  handleRegistration: (data: RegisterFormFieldTypes) => Promise<void>;
  handleLogin: (data: LoginFormFieldTypes) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
  updateProfileInfo: (name: string, photoFiles: File[]) => Promise<void>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  isLoggingOut: boolean;
  setIsLoggingOut: Dispatch<SetStateAction<boolean>>;
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
          const response = await server.get('/auth/get');
          user = response.data;
        } catch (err) {
          console.error(err);
        }
      }

      setUser(user);
      setIsUserLoading(false);
    });

    return unsub;
  }, [server, isRegistering, isGoogleLoging]);

  // handle registration
  async function handleRegistration(data: RegisterFormFieldTypes) {
    try {
      const photoURL = await uploadImageToImgbb(data.photoFiles);

      const createResponse = await server.post('/auth/create', {
        email: data.email,
        password: data.password,
        name: data.name,
        photoURL,
      });
      await signInWithCustomToken(auth, createResponse.data.customToken);
      const getResponse = await server.get('/auth/get');
      setUser(getResponse.data);
      setIsRegistering(false);
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as {
        code: string;
        message: string;
      };
      if (errorData?.code && errorData.code === 'EMAIL_ALREADY_EXISTS') {
        customToast({
          type: 'error',
          message: 'Email already exists',
          options: { duration: 4000 },
        });
        return;
      }
      customToast({
        type: 'error',
        message: 'Registration failed',
        options: { duration: 4000 },
      });
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

      const response = await server.get('/auth/get');
      setUser(response.data);
    } catch (err) {
      console.error(err);
      const error = err as FirebaseError;
      if (error.code && error.code === 'auth/invalid-credential') {
        return customToast({
          type: 'error',
          message: 'Invalid email or password',
          options: { duration: 4000 },
        });
      }
      customToast({
        type: 'error',
        message: 'Login failed',
        options: { duration: 4000 },
      });
    }
  }

  // hangle google login
  async function handleGoogleLogin() {
    setIsGoogleLoging(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const user = cred.user;

      await user.getIdToken(true);

      const googlePostResponse = await server.post('/auth/sociallogin', {
        name: user.displayName,
        photoURL: user.photoURL,
      });
      setUser(googlePostResponse.data);
    } catch (err) {
      const error = err as FirebaseError;

      console.error(error);
      if (error.code === 'auth/popup-closed-by-user') {
        return customToast({
          type: 'error',
          message: 'Google login failed',
          options: { duration: 4000 },
        });
      }
      customToast({
        type: 'error',
        message: 'Loading failed',
        options: { duration: 4000 },
      });
    } finally {
      setIsGoogleLoging(false);
    }
  }

  // update profile
  async function updateProfileInfo(name: string, photoFiles: File[]) {
    try {
      const photoURL =
        photoFiles.length > 0
          ? await uploadImageToImgbb(photoFiles)
          : user?.photoURL;

      const updatedData = await server.post('/auth/update', {
        name,
        photoURL,
      });

      setUser(updatedData.data);
      customToast({
        type: 'success',
        message: 'Profile was updated',
        options: { duration: 4000 },
      });
    } catch (err) {
      console.error(err);
      customToast({
        type: 'error',
        message: "Couldn't update profile",
        options: { duration: 4000 },
      });
    }
  }

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (isDark ? 'dark' : 'light');
  });

  useEffect(() => {
    function updateTheme() {
      if (localStorage.getItem('theme')) return;
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', updateTheme);
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', updateTheme);
    };
  }, []);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <CreatedAuthContext.Provider
      value={{
        user,
        setUser,
        isUserLoading,
        handleRegistration,
        handleLogin,
        handleGoogleLogin,
        updateProfileInfo,
        theme,
        setTheme,
        isLoggingOut,
        setIsLoggingOut,
      }}
    >
      {children}
    </CreatedAuthContext.Provider>
  );
}

export default AuthContext;
