import type { ReactNode } from 'react';

type ButtonPropsType = {
  content: ReactNode;
  isLoading: boolean;
  onClick?: () => void;
};

export default function Button({
  content,
  isLoading,
  onClick,
}: ButtonPropsType) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`bg-content text-surface grid h-10 w-full place-items-center gap-1 rounded-full tracking-wide ${isLoading ? 'disabled opacity-80' : 'opacity-100'}`}
    >
      {isLoading ? (
        <span className="loading loading-xs loading-spinner"></span>
      ) : (
        <span className="flex items-center justify-center gap-1">
          {content}
        </span>
      )}
    </button>
  );
}
