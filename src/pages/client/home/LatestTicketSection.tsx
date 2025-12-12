import PublicTicketCard from '@/components/ticket_cards/PublicTicketCard';
import type { Ticket } from '@/pages/vendor/types';
import type { AxiosError } from 'axios';

type LatestTicketSectionPropsType = {
  regularTickets: Ticket[] | undefined;
  isLoading: boolean;
  error: AxiosError | null;
};

export default function LatestTicketSection({
  regularTickets,
  isLoading,
  error,
}: LatestTicketSectionPropsType) {
  console.log(regularTickets);
  return (
    <div className="py-12">
      <div className="space-y-2">
        <h2 className="text-brand text-xl font-semibold sm:text-2xl lg:text-3xl">
          Latest Tickets
        </h2>
        <p className="text-content-light md:text-lg">
          Discover the newest tickets added to our collection!
        </p>
      </div>

      <div className="mt-10">
        {isLoading && <p>Loading latest tickets...</p>}
        {error && <p>Error loading latest tickets.</p>}
        {!isLoading && !error && regularTickets?.length === 0 && (
          <p>No latest tickets available.</p>
        )}

        {regularTickets && regularTickets.length > 0 && (
          <div className="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularTickets.map((ticket) => (
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
