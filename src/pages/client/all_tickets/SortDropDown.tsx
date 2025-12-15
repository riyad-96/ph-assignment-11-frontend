import useClosePopup from '@/hooks/useClosePopup';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

type DataType = {
  label: string;
  value: string;
};

type SortDropDownPropsType = {
  initial: string;
  data: DataType[];
  onChange: (transport: string) => void;
};

const dropdownVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: {
    duration: 0.1,
  },
};

export default function SortDropDown({
  initial,
  data,
  onChange,
}: SortDropDownPropsType) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useClosePopup({
    isOpen,
    ignoredSelectors: [`.drop-down-open-btn-${initial}`],
    onClose: () => setIsOpen(false),
  });

  return (
    <div className="relative">
      <button
        className={`drop-down-open-btn-${initial} bg-brand-light border-brand/10 rounded-md border px-2 py-0.5 text-sm font-medium tracking-wide`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="capitalize">{initial}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={dropdownVariants.transition}
            ref={dropdownRef}
            className="bg-brand-light border-brand/10 absolute top-[calc(100%+5px)] right-0 z-5 grid origin-top-right overflow-hidden rounded-lg border py-1"
          >
            {data.map(({ label, value }) => (
              <button
                key={label + value}
                className="px-4 py-1 text-start text-sm font-medium tracking-wide text-nowrap hover:bg-white/60 dark:hover:bg-white/10"
                onClick={() => {
                  onChange(value);
                  setTimeout(() => setIsOpen(false), 50);
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
