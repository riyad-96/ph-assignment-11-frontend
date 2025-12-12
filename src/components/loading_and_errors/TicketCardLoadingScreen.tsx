export default function TicketCardLoadingScreen() {
  return (
    <div className="bg-surface overflow-hidden rounded-2xl shadow">
      <div className="aspect-video animate-pulse bg-zinc-500/30" />

      <div className="space-y-5 p-5">
        <div className="space-y-2">
          <div className="h-6 w-3/4 animate-pulse rounded-md bg-zinc-500/30" />
          <div className="h-8 w-1/3 animate-pulse rounded-md bg-zinc-500/30" />
        </div>

        <div className="space-y-2">
          <div className="h-5 w-13 animate-pulse rounded-md bg-zinc-500/30" />
          <div className="h-5 w-3/5 animate-pulse rounded-md bg-zinc-500/30" />
        </div>

        <div className="flex">
          <div className="flex-1 space-y-1">
            <div className="h-5 w-20 animate-pulse rounded-md bg-zinc-500/30" />
            <div className="h-5 w-12 animate-pulse rounded-md bg-zinc-500/30" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-5 w-20 animate-pulse rounded-md bg-zinc-500/30" />
            <div className="h-5 w-17 animate-pulse rounded-md bg-zinc-500/30" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="h-5 w-20 animate-pulse rounded-md bg-zinc-500/30" />
          <div className="h-5 w-25 animate-pulse rounded-md bg-zinc-500/30" />
        </div>

        <div className="space-y-1">
          <div className="h-5 w-12 animate-pulse rounded-md bg-zinc-500/30" />
          <div className="flex gap-2">
            <div className="h-6 w-18 animate-pulse rounded-full bg-zinc-500/30" />
            <div className="h-6 w-18 animate-pulse rounded-full bg-zinc-500/30" />
          </div>
        </div>

        <div className="h-10 w-full animate-pulse rounded-full bg-zinc-500/30" />
      </div>
    </div>
  );
}
