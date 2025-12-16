import type { Ticket } from '@/pages/vendor/types';
import AdSection from './AdSection';
import Banner from './banner/Banner';
import ExtraSections from './ExtraSections';
import LatestTicketSection from './LatestTicketSection';
import { serverAPI } from '@/helpers/server';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type PublicTicketsQueryType = {
  advertised: Ticket[];
  regular: Ticket[];
};

export default function Home() {
  const server = serverAPI();

  // get public tickets
  const {
    data: publicTickets,
    isLoading: publicTicketsLoading,
    error: publicTicketsError,
  } = useQuery<PublicTicketsQueryType, AxiosError>({
    queryKey: ['public-tickets'],
    queryFn: async () => {
      const response =
        await server.get<PublicTicketsQueryType>('/public/tickets');
      return response.data;
    },
  });

  return (
    <div className="mx-auto max-w-[1920px]">
      <Banner />

      <div className="mt-8 px-2 md:px-3">
        <div className="mx-auto max-w-[1300px]">
          <AdSection
            advertisedTickets={publicTickets?.advertised}
            isLoading={publicTicketsLoading}
            error={publicTicketsError}
          />
          <LatestTicketSection
            regularTickets={publicTickets?.regular}
            isLoading={publicTicketsLoading}
            error={publicTicketsError}
          />
          <ExtraSections />
        </div>
      </div>
    </div>
  );
}
