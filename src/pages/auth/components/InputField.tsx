import {
  useState,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
} from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

type InputFieldPropsTypes = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  error: string | null | undefined;
};

export default function InputField({
  id,
  label,
  error,
  type,
  ...rest
}: InputFieldPropsTypes) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="grid gap-1.5">
      <label
        className="w-fit pl-1"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={
            type === 'password'
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : type
          }
          className={`hover:border-brand/60 border-brand/20 bg-surface focus:border-brand ring-brand/20 w-full min-w-0 rounded-full border ${type === 'password' ? 'pr-[66px] pl-4' : 'px-4'} py-2 shadow-xs ring-0 transition-[border-color,box-shadow] outline-none focus:ring-3`}
          {...rest}
        />
        {type === 'password' && (
          <button
            onClick={() => {
              setIsPasswordVisible((prev) => !prev);
            }}
            type="button"
            className="pointer-coarse:bg-brand-light pointer-fine:hover:bg-brand-light absolute top-1/2 right-1 grid h-[calc(100%-8px)] w-[50px] -translate-y-1/2 place-items-center rounded-full"
          >
            {isPasswordVisible ? (
              <span className="grid">
                <IoMdEyeOff />
              </span>
            ) : (
              <span className="grid">
                <IoMdEye />
              </span>
            )}
          </button>
        )}
      </div>

      <span
        className={`block overflow-hidden pl-2 text-sm text-red-500 transition-[height] ${error ? 'h-5' : 'h-0'}`}
      >
        {error}
      </span>
    </div>
  );
}
