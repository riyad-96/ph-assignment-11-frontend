import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import NavMenu from './NavMenu';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-surface/80 border-brand-light sticky top-0 left-0 z-20 flex items-center min-h-[57px] border-b px-2 backdrop-blur-xl md:px-3">
      <div className="flex-1 mx-auto flex max-w-[1300px] items-center justify-between">
        <Logo
          onClick={() => {
            if (location.pathname === '/') return window.location.reload();
            navigate('/');
          }}
        />
        <div>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
