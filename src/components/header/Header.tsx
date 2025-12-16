import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import NavMenu from './NavMenu';
import ThemeToggler from './ThemeToggler';
import { motion } from 'motion/react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-surface/80 border-brand-light sticky top-0 left-0 z-20 flex min-h-[57px] items-center border-b px-2 backdrop-blur-xl md:px-3">
      <motion.div
        layoutId="header-content"
        className={`mx-auto flex flex-1 items-center justify-between ${location.pathname.includes('dashboard') ? 'max-w-[1920px]' : 'max-w-[1300px]'}`}
      >
        <Logo
          onClick={() => {
            if (location.pathname === '/') return window.location.reload();
            navigate('/');
          }}
        />
        <div className="flex items-center gap-2">
          <ThemeToggler />
          <NavMenu />
        </div>
      </motion.div>
    </header>
  );
}
