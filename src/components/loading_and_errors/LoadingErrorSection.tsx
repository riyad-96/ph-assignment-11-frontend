import { getRandomErrorMessage } from '@/helpers/helper';

export default function LoadingErrorSection() {
  return (
    <div className="rounded-xl border border-yellow-400/70 bg-yellow-400/15 tracking-wide text-sm px-6 py-8">
      <p className="max-w-[400px] text-yellow-900">{getRandomErrorMessage()}</p>
    </div>
  );
}
