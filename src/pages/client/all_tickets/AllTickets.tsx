import LoadingErrorSection from '@/components/loading_and_errors/LoadingErrorSection';
import TicketSectionLoadingScreen from '@/components/loading_and_errors/TicketSectionLoadingScreen';
import PublicTicketCard from '@/components/ticket_cards/PublicTicketCard';
import { serverAPI } from '@/helpers/server';
import type { Ticket } from '@/pages/vendor/types';
import { useQuery } from '@tanstack/react-query';

export default function AllTickets() {
  const server = serverAPI(true);

  const {
    data: allTickets,
    isLoading: isLoadingAllTickets,
    error: allTicketsError,
  } = useQuery<Ticket[]>({
    queryKey: ['all-tickets'],
    queryFn: async () => {
      const response = await server.get('/user/get-approved-tickets');
      return response.data;
    },
  });

  return (
    <div className="px-2 py-12 md:px-3">
      <div className="mx-auto max-w-[1300px]">
        <h1 className="text-brand mb-8 text-xl font-semibold sm:text-2xl lg:text-3xl">
          All Tickets
        </h1>

        {isLoadingAllTickets && <TicketSectionLoadingScreen cardCount={3} />}
        {allTicketsError && <LoadingErrorSection />}
        {!isLoadingAllTickets && !allTicketsError && allTickets && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {allTickets.map((t) => (
              <PublicTicketCard
                key={t._id}
                ticket={t}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
