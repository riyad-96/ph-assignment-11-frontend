import DashboardH1 from '@/components/DashboardH1';
import BookedTicketCard from '@/components/ticket_cards/BookedTicketCard';
import { serverAPI } from '@/helpers/server';
import { useQuery } from '@tanstack/react-query';
import type { BookedTicket } from '../types';
import LoadingErrorSection from '@/components/loading_and_errors/LoadingErrorSection';

export default function BookedTickets() {
  const server = serverAPI(true);

  const {
    data: bookedTickets,
    isLoading: isBookedTicketsLoading,
    error: bookedTicketsError,
  } = useQuery<BookedTicket[]>({
    queryKey: ['booked-tickets'],
    queryFn: async () => {
      const response = await server.get('user/booked-tickets');
      return response.data;
    },
  });

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="Booked Tickets" />

      <div className="mt-12">
        {isBookedTicketsLoading && <div>Loading...</div>}
        {bookedTicketsError && <LoadingErrorSection />}
        {!bookedTicketsError &&
          !isBookedTicketsLoading &&
          bookedTickets &&
          bookedTickets.length === 0 && (
            <div className="text-content-light mt-8 text-center font-medium">
              No booked tickets were found
            </div>
          )}
        {!bookedTicketsError && bookedTickets && (
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {bookedTickets.map((b) => (
              <BookedTicketCard
                key={b._id}
                b={b}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
