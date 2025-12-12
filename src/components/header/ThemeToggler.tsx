import { useAuthContext } from '@/hooks/useAuthContext';
import { motion, AnimatePresence } from 'motion/react';
// import { useState } from 'react';
import { FiMoon } from 'react-icons/fi';
import { LuSun } from 'react-icons/lu';

// type ThemeTogglerPropsType = {
//   isDark?: boolean;
//   onClick?: () => void;
// };

export default function ThemeToggler() {
  const { theme, setTheme } = useAuthContext();

  return (
    <button
      type="button"
      className="bg-brand-light border-brand/10 h-[25px] w-[45px] rounded-full border p-0.5 dark:border-slate-600 dark:text-blue-500"
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
    >
      <div
        className={`text-content relative grid h-full w-1/2 place-items-center overflow-hidden rounded-full bg-surface transition-transform duration-300 ${theme === 'dark' ? 'translate-x-1/1' : 'translate-x-0'}`}
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
