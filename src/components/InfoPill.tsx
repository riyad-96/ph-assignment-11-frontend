import type { ReactNode } from 'react';

type InfoPillPropsType = {
  infoTitle: string;
  info: ReactNode;
};

export default function InfoPill({ infoTitle, info }: InfoPillPropsType) {
  return (
    <div className="border-brand-light bg-brand-light flex w-fit cursor-default items-center gap-1 rounded-md border px-2 text-sm shadow-xs inset-shadow-white/50 dark:inset-shadow-white/15 inset-shadow-xs">
      <span>{infoTitle}:</span>
      <span className="font-medium">{info}</span>
    </div>
  );
}
