import TicketCardLoadingScreen from './TicketCardLoadingScreen';

export default function TicketSectionLoadingScreen({cardCount}: {cardCount: number}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {[...Array(cardCount)].map((_, index) => (
        <TicketCardLoadingScreen key={index}></TicketCardLoadingScreen>
      ))}
    </div>
  );
}
