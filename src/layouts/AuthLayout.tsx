import { GoogleIcon } from '@/assets/Svgs';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="bg-canvas overflow-y-auto grid h-screen place-items-center px-4 pb-26 pt-16">
      <div className="w-full max-w-[350px]">
        <Outlet />

        <button className="bg-content text-surface mt-4 flex h-10 w-full items-center justify-center gap-1 rounded-full tracking-wide">
          <span>{<GoogleIcon />}</span>
          <span>Google</span>
        </button>
      </div>
    </div>
  );
}
