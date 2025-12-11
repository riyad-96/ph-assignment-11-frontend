import type { ReactNode } from "react";

type InfoPillPropsType = {
  infoTitle: string;
  info: ReactNode;
};

export default function InfoPill({ infoTitle, info }: InfoPillPropsType) {
  return (
    <div className="w-fit inset-shadow-surface border-brand-light bg-brand-light/60 flex items-center gap-1 rounded-md border px-2 shadow-xs inset-shadow-xs">
      <span>{infoTitle}:</span>
      <span>{info}</span>
    </div>
  );
}
