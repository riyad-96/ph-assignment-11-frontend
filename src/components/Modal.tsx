import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

type ModalPropsType = PropsWithChildren & {
  closeFn: () => void;
  className: string;
};

export default function Modal({
  closeFn,
  children,
  className,
}: ModalPropsType) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={closeFn}
      className="fixed inset-0 z-50 p-4 grid place-items-center overflow-y-auto bg-black/30"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onMouseDown={(e) => e.stopPropagation()}
        className={className}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
