import PublicTicketCard from '@/components/ticket_cards/PublicTicketCard';
import type { Ticket } from '@/pages/vendor/types';
import type { AxiosError } from 'axios';

type AdSectionPropsType = {
  advertisedTickets: Ticket[] | undefined;
  isLoading: boolean;
  error: AxiosError | null;
};

export default function AdSection({
  advertisedTickets,
  isLoading,
  error,
}: AdSectionPropsType) {
  console.log(advertisedTickets);
  return (
    <div className="py-12">
      <div className="space-y-2">
        <h2 className="text-brand text-xl font-semibold sm:text-2xl lg:text-3xl">
          Exclusive offers
        </h2>
        <p className="text-content-light md:text-lg">
          Check out the best deals on tickets available right now!
        </p>
      </div>

      <div className="mt-10">
        {isLoading && <p>Loading advertised tickets...</p>}
        {error && <p>Error loading advertised tickets.</p>}
        {!isLoading && !error && advertisedTickets?.length === 0 && (
          <p>No advertised tickets available.</p>
        )}

        {advertisedTickets && advertisedTickets.length > 0 && (
          <div className="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advertisedTickets.map((ticket) => (
              <PublicTicketCard
                key={ticket._id}
                ticket={ticket}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
