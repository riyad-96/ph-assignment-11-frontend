import { useAuthContext } from '@/hooks/useAuthContext';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Tooltip } from 'kitzo/react';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth } from '@/configs/firebase.config';

export default function NavMenu() {
  const { user } = useAuthContext();
  const [dropdownShowing, setIsDropdownShowing] = useState(false);
  const [isMenuShowing, setIsMenuShowing] = useState(false);

  useEffect(() => {
    function closeDropdown(e: MouseEvent | TouchEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('.profile-dropdown')) return;
      if (target.closest('.dropdown-open-btn')) return;

      if (target.closest('.nav-menu')) return;
      if (target.closest('.nav-menu-open-btn')) return;
      setIsDropdownShowing(false);
      setIsMenuShowing(false);
    }

    document.addEventListener('click', closeDropdown);
    document.addEventListener('mousedown', closeDropdown);
    document.addEventListener('touchstart', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
      document.removeEventListener('mousedown', closeDropdown);
      document.removeEventListener('touchstart', closeDropdown);
    };
  }, []);

  return (
    <nav className="flex items-center gap-1">
      <div className="flex items-center gap-0.5 max-sm:hidden">
        {user ? (
          <>
            <NavLink
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm ${isActive ? 'bg-brand text-surface' : 'hover:bg-brand-light'}`
              }
              children="Home"
              to="/"
            />

            <NavLink
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm ${isActive ? 'bg-brand text-surface' : 'hover:bg-brand-light'}`
              }
              children="All tickets"
              to="/all-tockets"
            />

            <NavLink
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm ${isActive ? 'bg-brand text-surface' : 'hover:bg-brand-light'}`
              }
              children="Dashboard"
              to="/dashboard"
            />
          </>
        ) : (
          <>
            <Link
              to="/auth/login"
              children="Login"
              className="hover:bg-brand-light hover:text-brand rounded-full px-5 py-1.5 text-sm font-medium tracking-wide"
            />
            <Link
              to="/auth/register"
              children="Register"
              className="bg-brand-light hover:text-brand rounded-full px-5 py-1.5 text-sm font-medium tracking-wide"
            />
          </>
        )}
      </div>

      {user && (
        <div className="relative max-sm:hidden">
          <div className="relative">
            <button
              onClick={() => setIsDropdownShowing((prev) => !prev)}
              className="dropdown-open-btn absolute inset-0 rounded-full"
            ></button>
            <div className="size-10 overflow-hidden rounded-full">
              <img
                className="size-full object-cover object-center"
                src={user?.photoURL}
                alt={`${user?.name} profile image`}
              />
            </div>
          </div>

          <AnimatePresence>
            {dropdownShowing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
                className="profile-dropdown absolute top-[calc(100%+10px)] right-0 max-w-[200px] min-w-[150px] origin-top-right"
              >
                <div className="bg-surface overflow-hidden rounded-lg shadow">
                  <div className="grid">
                    <button className="hover:bg-brand-light/70 flex px-6 py-2 text-sm">
                      Profile
                    </button>
                    <button
                      onClick={() => signOut(auth)}
                      className="hover:bg-brand-light/70 flex px-6 py-2 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                  <p className="border-brand-light bg-brand-light/30 border-t px-3 py-2.5 text-center text-xs">
                    {user.email}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="sm:hidden">
        <div className="relative">
          <Tooltip
            content="Menu"
            isHidden={isMenuShowing}
            tooltipOptions={{
              smartHover: true,
              position: 'bottom-end',
            }}
          >
            <button
              onClick={() => setIsMenuShowing((prev) => !prev)}
              className={`nav-menu-open-btn grid size-10 place-items-center rounded-full ${isMenuShowing ? 'text-brand bg-brand-light' : 'hover:bg-brand-light'}`}
            >
              <GiHamburgerMenu size="24" />
            </button>
          </Tooltip>

          <AnimatePresence>
            {isMenuShowing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
                className="nav-menu bg-surface absolute top-[calc(100%+10px)] right-0 min-w-[200px] origin-top-right overflow-hidden rounded-xl shadow"
              >
                {user && (
                  <div className="space-y-2 py-4">
                    <div className="mx-auto size-20 overflow-hidden rounded-full">
                      <img
                        className="size-full object-cover object-center"
                        src={user?.photoURL}
                        alt={`${user?.name} profile image`}
                      />
                    </div>
                    <div>
                      <h5 className="text-center font-medium">{user.name}</h5>
                      <p className="text-center text-xs">{user.email}</p>
                    </div>
                  </div>
                )}

                <div className="grid">
                  {user && (
                    <Link
                      className="bg-brand-light/40 hover:bg-brand-light px-4 py-2 text-sm"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  )}

                  <NavLink
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm ${isActive ? 'bg-brand text-surface' : 'hover:bg-brand-light'}`
                    }
                    children="Home"
                    to="/"
                  />

                  <NavLink
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm ${isActive ? 'bg-brand text-surface' : 'hover:bg-brand-light'}`
                    }
                    children="All tickets"
                    to="/all-tockets"
                  />

                  <NavLink
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm ${isActive ? 'bg-brand text-surface' : 'hover:bg-brand-light'}`
                    }
                    children="Dashboard"
                    to="/dashboard"
                  />
                  {user ? (
                    <>
                      <button
                        onClick={() => signOut(auth)}
                        className="bg-brand-light/40 hover:bg-brand-light mt-px flex items-center justify-center gap-1 py-1.5 text-sm"
                      >
                        <span>
                          <FiLogOut />
                        </span>
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <div className="mt-px flex gap-px">
                      <Link
                        to="/auth/login"
                        className="hover:bg-brand-light hover:text-brand flex flex-1 items-center justify-center px-5 py-1.5 text-sm font-medium tracking-wide"
                      >
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/auth/register"
                        className="bg-brand-light hover:text-brand flex flex-1 items-center justify-center px-5 py-1.5 text-sm font-medium tracking-wide"
                      >
                        <span>Register</span>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
