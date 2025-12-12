export default function TicketDetailsPageLoadingScreen() {
  return (
    <div className="py-12">
      <div className="mb-8 h-64 animate-pulse rounded-3xl bg-zinc-500/30 md:h-96"></div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="grid gap-y-6 lg:col-span-2">
          <div className="h-[243px] animate-pulse rounded-2xl bg-zinc-500/30"></div>
          <div className="h-[132px] animate-pulse rounded-2xl bg-zinc-500/30"></div>
        </div>
        <div className="h-100 animate-pulse rounded-3xl bg-zinc-500/30"></div>
      </div>

      <div className="mt-12 h-[82px] animate-pulse rounded-2xl bg-zinc-500/30"></div>
    </div>
  );
}
