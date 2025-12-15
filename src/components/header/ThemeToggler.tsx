import { useAuthContext } from '@/hooks/useAuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { FiMoon } from 'react-icons/fi';
import { LuSun } from 'react-icons/lu';

export default function ThemeToggler() {
  const { theme, setTheme } = useAuthContext();

  function changeTheme() {
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <button
      type="button"
      className="bg-brand-light border-brand/10 h-[25px] w-[45px] rounded-full border p-0.5 dark:border-slate-600 dark:text-blue-500"
      onClick={changeTheme}
    >
      <div
        className={`text-content bg-surface relative grid h-full w-1/2 place-items-center overflow-hidden rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-1/1' : 'translate-x-0'}`}
      >
        <AnimatePresence>
          {theme === 'light' && (
            <motion.div
              className="absolute grid size-full place-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <LuSun size="12" />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {theme === 'dark' && (
            <motion.div
              className="absolute grid size-full place-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FiMoon size="12" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
