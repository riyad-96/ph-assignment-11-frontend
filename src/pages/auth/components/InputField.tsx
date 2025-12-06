import type { InputHTMLAttributes } from 'react';

type InputFieldPropsTypes = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error: string | null | undefined;
};

export default function InputField({
  id,
  label,
  error,
  ...rest
}: InputFieldPropsTypes) {
  return (
    <div className="grid gap-1.5">
      <label
        className="w-fit pl-1"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="hover:border-brand/60 border-brand/20 bg-surface focus:border-brand ring-brand/50 w-full min-w-0 rounded-full border px-4 py-2 shadow-xs ring-0 transition-[border-color,box-shadow] outline-none focus:ring-3"
        id={id}
        {...rest}
      />

      <span
        className={`block overflow-hidden pl-2 text-sm text-red-500 transition-[height] ${error ? 'h-5' : 'h-0'}`}
      >
        {error}
      </span>
    </div>
  );
}
