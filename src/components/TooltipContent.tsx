import type { ReactNode } from 'react';

type TooltipContentPropsType = {
  content: ReactNode;
  className?: string;
};

export default function TooltipContent({
  content,
  className,
}: TooltipContentPropsType) {
  return (
    <div
      className={`text-surface bg-content rounded-md px-2 py-1 text-xs tracking-wide text-nowrap ${className}`}
    >
      {content}
    </div>
  );
}
