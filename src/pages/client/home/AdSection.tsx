import LoadingErrorSection from '@/components/loading_and_errors/LoadingErrorSection';
import TicketSectionLoadingScreen from '@/components/loading_and_errors/TicketSectionLoadingScreen';
import PublicTicketCard from '@/components/ticket_cards/PublicTicketCard';
import type { Ticket } from '@/pages/vendor/types';
import type { AxiosError } from 'axios';
import NoOffersPlaceholder from './NoOffersPlaceholder';

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
        {isLoading && <TicketSectionLoadingScreen cardCount={3} />}
        {error && <LoadingErrorSection />}

        {!error && advertisedTickets && advertisedTickets.length === 0 && (
          <NoOffersPlaceholder />
        )}

        {!error && advertisedTickets && advertisedTickets.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
