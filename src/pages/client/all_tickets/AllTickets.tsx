import LoadingErrorSection from '@/components/loading_and_errors/LoadingErrorSection';
import TicketSectionLoadingScreen from '@/components/loading_and_errors/TicketSectionLoadingScreen';
import PublicTicketCard from '@/components/ticket_cards/PublicTicketCard';
import { serverAPI } from '@/helpers/server';
import type { FilteredTicketsResponse } from '@/pages/vendor/types';
import { useQuery } from '@tanstack/react-query';
import NoOffersPlaceholder from '../home/NoOffersPlaceholder';
import SortDropDown from './SortDropDown';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

type PriceSort = 'low-high' | 'high-low' | 'none';

type FilterParams = {
  searchQuery: string;
  transportType: string;
  priceSort: PriceSort;
  page: number;
  limit: number;
};

export default function AllTickets() {
  const server = serverAPI(true);

  const [params, setParams] = useState<FilterParams>({
    searchQuery: '',
    transportType: 'all',
    priceSort: 'none',
    page: 1,
    limit: 6,
  });

  const [searchInput, setSearchInput] = useState('');

  const debouncedSearchQuery = useDebounce(searchInput, 500);
  useEffect(() => {
    (() => {
      setParams((prev) => ({ ...prev, searchQuery: debouncedSearchQuery }));
    })();
  }, [debouncedSearchQuery]);

  const {
    data: filteredTickets,
    isLoading: isFilteredTicketsLoading,
    error: filteredTicketsError,
  } = useQuery<FilteredTicketsResponse>({
    queryKey: ['all-tickets', params],
    queryFn: async () => {
      const response = await server.post('/user/get-all-filtered-tickets', {
        searchQuery: params.searchQuery,
        transportType: params.transportType,
        priceSort: params.priceSort,
        page: params.page,
        limit: params.limit,
      });
      return response.data;
    },
  });

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    (() => {
      if (filteredTickets) {
        setTotalPages(
          Math.ceil(filteredTickets.totalTickets / params.limit) || 1,
        );
      }
    })();
  }, [filteredTickets]);

  const prevPageAvailable = params.page > 1;
  const nextPageAvailable = params.page < totalPages;

  return (
    <div className="px-2 py-12 md:px-3">
      <div className="mx-auto max-w-[1300px]">
        <h1 className="text-brand mb-8 text-xl font-semibold sm:text-2xl lg:text-3xl">
          All Tickets
        </h1>

        <div className="mb-4 max-sm:space-y-4 sm:flex sm:items-end sm:justify-between">
          <div>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="hover:border-brand/60 border-brand/20 bg-surface focus:border-brand ring-brand/20 w-full min-w-0 rounded-full border px-4 py-2 shadow-xs ring-0 transition-[border-color,box-shadow] outline-none focus:ring-3"
              type="text"
              placeholder="Search by location or title..."
            />
          </div>

          <div className="flex gap-4 max-sm:pl-1">
            <div className="flex items-center gap-1">
              <span className="text-sm">Sort by:</span>
              <SortDropDown
                initial={
                  params.transportType === 'all'
                    ? 'Transport'
                    : params.transportType
                }
                data={[
                  { label: 'All', value: 'all' },
                  { label: 'Bus', value: 'bus' },
                  { label: 'Train', value: 'train' },
                  { label: 'Ship', value: 'ship' },
                  { label: 'Plane', value: 'plane' },
                ]}
                onChange={(transport) => {
                  setParams((prev) => ({
                    ...prev,
                    transportType: transport,
                  }));
                }}
              />
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sm">Sort by:</span>
              <SortDropDown
                initial={
                  params.priceSort === 'none' ? 'Price' : params.priceSort
                }
                data={[
                  { label: 'Default', value: 'none' },
                  { label: 'Low-High', value: 'low-high' },
                  { label: 'High-Low', value: 'high-low' },
                ]}
                onChange={(type) => {
                  setParams((prev) => ({
                    ...prev,
                    priceSort: type as PriceSort,
                  }));
                }}
              />
            </div>
          </div>
        </div>

        {isFilteredTicketsLoading && (
          <TicketSectionLoadingScreen cardCount={3} />
        )}
        {filteredTicketsError && <LoadingErrorSection />}
        {!isFilteredTicketsLoading &&
          !filteredTicketsError &&
          filteredTickets &&
          filteredTickets.data.length === 0 && <NoOffersPlaceholder />}

        {!isFilteredTicketsLoading &&
          !filteredTicketsError &&
          filteredTickets && (
            <div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {filteredTickets.data.map((t) => (
                  <PublicTicketCard
                    key={t._id}
                    ticket={t}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8">
                  <div className="border-brand-light bg-surface mx-auto flex max-w-[200px] rounded-full border p-1 shadow">
                    <button
                      className={`bg-brand rounded-full px-3 py-1 text-sm tracking-wider text-white shadow ${prevPageAvailable ? '' : 'cursor-not-allowed! opacity-50'}`}
                      onClick={() => {
                        if (!prevPageAvailable) return;
                        setParams((prev) => ({
                          ...prev,
                          page: prev.page - 1,
                        }));
                      }}
                    >
                      Previous
                    </button>

                    <button
                      className={`bg-brand ml-auto rounded-full px-3 py-1 text-sm tracking-wider text-white shadow ${nextPageAvailable ? '' : 'cursor-not-allowed! opacity-50'}`}
                      onClick={() => {
                        if (!nextPageAvailable) return;
                        setParams((prev) => ({
                          ...prev,
                          page: prev.page + 1,
                        }));
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
