import type { ReactNode } from 'react';

type SubmitButtonPropsType = {
  isSubmitting: boolean;
  content: ReactNode;
  className?: string;
};

export default function SubmitButton({
  isSubmitting,
  content,
  className,
}: SubmitButtonPropsType) {
  return (
    <button
      type="submit"
      className={`bg-brand text-surface h-10 rounded-full ${className ? className : 'w-[100px]'}`}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <span className="drop-shadow-xs drop-shadow-black/50">{content}</span>
      )}
    </button>
  );
}
