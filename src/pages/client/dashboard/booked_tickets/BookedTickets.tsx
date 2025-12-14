import DashboardH1 from '@/components/DashboardH1';
import BookedTicketCard from '@/components/ticket_cards/BookedTicketCard';
import { serverAPI } from '@/helpers/server';
import { useQuery } from '@tanstack/react-query';
import type { BookedTicket } from '../types';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import LoadingDataLengthErrors from '@/components/loading_and_errors/LoadingDataLengthErrors';

export default function BookedTickets() {
  const server = serverAPI(true);
  const location = useLocation();

  const wasPayment = location.pathname.includes('payment');

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
        <LoadingDataLengthErrors
          emptyMessage="No booked tickets were found"
          dataLength={bookedTickets?.length}
          isLoading={isBookedTicketsLoading}
          error={bookedTicketsError}
        />

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
      <AnimatePresence>{wasPayment && <Outlet />}</AnimatePresence>
    </div>
  );
}
