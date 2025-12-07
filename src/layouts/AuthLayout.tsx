import { GoogleIcon } from '@/assets/Svgs';
import Button from '@/pages/auth/components/Button';
import Logo from '@/components/Logo';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthLayout() {
  const navigate = useNavigate();
  const { handleGoogleLogin } = useAuthContext();
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function tryGoogleLogin() {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await handleGoogleLogin();
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <div className="bg-canvas grid h-screen place-items-center overflow-y-auto px-4 pt-16 pb-26">
      <div className="fixed top-4 left-4">
        <Logo onClick={() => navigate('/')} />
      </div>
      <div className="w-full max-w-[350px]">
        <Outlet />

        <div className="mt-4"></div>
        <Button
          onClick={tryGoogleLogin}
          isLoading={isSigningIn}
          content={
            <>
              <span>{<GoogleIcon />}</span>
              <span>Google</span>
            </>
          }
        />
      </div>
    </div>
  );
}
