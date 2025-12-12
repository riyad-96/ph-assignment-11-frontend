import DashboardH1 from '@/components/DashboardH1';
import LoadingDataLengthErrors from '@/components/loading_and_errors/LoadingDataLengthErrors';
import Table from '@/components/Table';
import { formatPrice } from '@/helpers/helper';
import { serverAPI } from '@/helpers/server';
import type { Ticket } from '@/pages/vendor/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'kitzo/react';
import { useEffect, useState } from 'react';

export default function AdvertiseTickets() {
  const server = serverAPI(true);
  const queryClient = useQueryClient();

  const {
    isLoading: isTicketsLoading,
    data: tickets,
    error: ticketError,
  } = useQuery<Ticket[]>({
    queryKey: ['approved-tickets'],
    queryFn: async () => {
      const response = await server.get('/admin/approved-tickets');
      return response.data;
    },
  });

  const oldAdvertisedTickets = tickets
    ? tickets.filter((t) => t.isOnAd).map((t) => t._id)
    : [];

  const [ticketsOnAd, setTicketsOnAd] = useState<string[]>([]);

  const isChangedAdvertisedTickets =
    JSON.stringify(oldAdvertisedTickets.sort()) !==
    JSON.stringify(ticketsOnAd.sort());

  useEffect(() => {
    if (!tickets) return;
    (() => {
      const onAd = tickets.filter((t) => t.isOnAd).map((t) => t._id);
      setTicketsOnAd(onAd);
    })();
  }, [tickets]);

  const {
    mutate: updateAdvertiseTickets,
    isPending: isUpdatingAdvertiseTickets,
  } = useMutation({
    mutationFn: async () => {
      await server.patch('/admin/advertise-tickets', {
        ticket_ids: ticketsOnAd,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approved-tickets'] });
      toast.success('Advertised tickets updated successfully.');
    },
    onError: () => {
      toast.error('Failed to update advertised tickets. Please try again.', {
        duration: 4000,
      });
    },
  });

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="Advertise Tickets" />

      <LoadingDataLengthErrors
        isLoading={isTicketsLoading}
        error={ticketError}
        dataLength={tickets?.length}
        emptyMessage="No tickets found."
      />

      {tickets && tickets.length > 0 && (
        <Table>
          <Table.head>
            <Table.tr>
              <Table.th>
                <div className="flex min-w-[70px] justify-center">
                  {isChangedAdvertisedTickets && ticketsOnAd.length > 0 ? (
                    <>
                      {isUpdatingAdvertiseTickets ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <button
                          onClick={() => updateAdvertiseTickets()}
                          className="bg-surface rounded-full px-2 py-1 text-xs tracking-wider shadow-xs"
                        >
                          Update
                        </button>
                      )}
                    </>
                  ) : (
                    <span>On ad!</span>
                  )}
                </div>
              </Table.th>
              <Table.th>Ticket</Table.th>
              <Table.th>Departure Time</Table.th>
              <Table.th>Price</Table.th>
              <Table.th>Vendor</Table.th>
            </Table.tr>
          </Table.head>
          <Table.body>
            {tickets.map((t) => (
              <Table.tr key={t._id}>
                <Table.td>
                  <div className="relative flex justify-center">
                    <label
                      htmlFor={t._id}
                      className={`absolute -inset-3 z-1 ${ticketsOnAd.length >= 6 && !ticketsOnAd.includes(t._id) ? 'cursor-not-allowed' : 'pointer-fine:cursor-pointer'}`}
                    />
                    <input
                      id={t._id}
                      type="checkbox"
                      className={`checkbox checkbox-sm accent-brand ${ticketsOnAd.length >= 6 && !ticketsOnAd.includes(t._id) ? 'cursor-not-allowed opacity-20' : 'opacity-100'}`}
                      onChange={() => {
                        if (
                          ticketsOnAd.length >= 6 &&
                          !ticketsOnAd.includes(t._id)
                        ) {
                          toast.error(
                            'You can advertise a maximum of 6 tickets at a time.',
                            { duration: 4000 },
                          );
                          return;
                        }
                        setTicketsOnAd((prev) => {
                          if (prev.includes(t._id))
                            return prev.filter((id) => id !== t._id);
                          else return [t._id, ...prev];
                        });
                      }}
                      checked={ticketsOnAd.includes(t._id) ? true : false}
                    />
                  </div>
                </Table.td>

                <Table.td>
                  <div>
                    <h5 className="text-sm font-semibold">{t.title}</h5>
                    <div>
                      <div className="flex gap-0.5 text-xs">
                        <span className="bg-brand-light rounded-md px-1 capitalize">
                          {t.from}
                        </span>
                        <span>to</span>
                        <span className="bg-brand-light rounded-md px-1 capitalize">
                          {t.to}
                        </span>
                        <span>by</span>
                        <span className="bg-brand-light rounded-md px-1 capitalize">
                          {t.transport}
                        </span>
                      </div>
                    </div>
                  </div>
                </Table.td>

                <Table.td>
                  <div className="text-sm">
                    {format(t.departure_time, 'dd MMM y, hh:mm a')}
                  </div>
                </Table.td>

                <Table.td>
                  <span className="text-sm font-medium">
                    TK: {formatPrice(t.price)}
                  </span>
                </Table.td>

                <Table.td>
                  <div className="grid">
                    <h5 className="text-sm leading-4 font-semibold">
                      {t.vendor_name}
                    </h5>
                    <span className="text-sm leading-4">{t.vendor_email}</span>
                  </div>
                </Table.td>
              </Table.tr>
            ))}
          </Table.body>
        </Table>
      )}
    </div>
  );
}
