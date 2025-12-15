import type { ReactNode } from 'react';

type SubmitButtonPropsType = {
  isSubmitting: boolean;
  content: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

export default function SubmitButton({
  isSubmitting,
  content,
  className,
  type,
  onClick,
}: SubmitButtonPropsType) {
  return (
    <button
      type={type ? type : 'submit'}
      className={`bg-brand text-white h-10 rounded-full ${className ? className : 'w-[100px]'}`}
      onClick={onClick}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <span className="drop-shadow-xs drop-shadow-black/50">{content}</span>
      )}
    </button>
  );
}
