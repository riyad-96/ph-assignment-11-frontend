import { getRandomErrorMessage } from '@/helpers/helper';

export default function LoadingErrorSection() {
  return (
    <div className="rounded-xl border border-yellow-400/70 dark:border-yellow-500/30 bg-yellow-400/15 tracking-wide text-sm px-6 py-8">
      <p className="max-w-[400px] text-yellow-900 dark:text-yellow-500">{getRandomErrorMessage()}</p>
    </div>
  );
}
