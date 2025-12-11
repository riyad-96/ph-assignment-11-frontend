import type { ReactNode } from 'react';

type InfoPillPropsType = {
  infoTitle: string;
  info: ReactNode;
};

export default function InfoPill({ infoTitle, info }: InfoPillPropsType) {
  return (
    <div className="inset-shadow-surface border-brand-light bg-brand-light flex w-fit cursor-default items-center gap-1 rounded-md border px-2 text-sm font-medium shadow-xs inset-shadow-xs">
      <span>{infoTitle}:</span>
      <span>{info}</span>
    </div>
  );
}
