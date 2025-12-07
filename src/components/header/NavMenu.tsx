import { auth } from '@/configs/firebase.config';
import { useAuthContext } from '@/hooks/useAuthContext';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function NavMenu() {
  const { user } = useAuthContext();
  const to = useNavigate();

  return (
    <nav>
      <div className="flex items-center gap-0.5">
        {user ? (
          <>
            <button
              onClick={() => to('/')}
              children="Home"
            />
            <button
              onClick={() => to('/')}
              children="All tickets"
            />
            <button
              onClick={() => to('/')}
              children="Dashboard"
            />
            <button
              onClick={() => signOut(auth)}
              children="logout"
            />
          </>
        ) : (
          <>
            <button
              onClick={() => to('/auth/login')}
              children="Login"
              className="hover:bg-brand-light hover:text-brand rounded-full px-5 py-1.5 text-sm font-medium tracking-wide"
            />
            <button
              onClick={() => to('/auth/register')}
              children="Register"
              className="bg-brand-light hover:text-brand rounded-full px-5 py-1.5 text-sm font-medium tracking-wide"
            />
          </>
        )}
      </div>
    </nav>
  );
}
