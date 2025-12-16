import { toast, type ToastOptions } from 'kitzo/react';
import { LuCircleCheckBig, LuCircleX, LuInfo } from 'react-icons/lu';

type ToastType = {
  type?: 'success' | 'error' | 'info';
  message?: string;
  options?: ToastOptions;
};

export default function customToast({ type, message, options }: ToastType) {
  toast.custom(
    () => (
      <div
        className={`rounded-md border px-2.5 py-1.5 shadow-md ${type === 'success' ? 'border-emerald-500/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-400' : type === 'error' ? 'border-red-500/40 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-400' : 'bg-brand-light text-brand border-brand/40'}`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`${type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-brand'}`}
          >
            {type === 'success' ? (
              <LuCircleCheckBig />
            ) : (
              <>{type === 'error' ? <LuCircleX /> : <LuInfo />}</>
            )}
          </div>
          <div className="max-w-[370px]">{message}</div>
        </div>
      </div>
    ),
    { ...options },
  );
}
