import type { ReactNode } from "react"

type TooltipContentPropsType = {
  content: ReactNode;
  className?: string;
}

export default function TooltipContent({content,className}: TooltipContentPropsType) {
  return (
    <div
      className={` text-nowrap text-xs tracking-wide text-surface bg-content px-2 py-1 rounded-md ${className}`}
    >{content}</div>
  )
}
