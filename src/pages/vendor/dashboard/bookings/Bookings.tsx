import DashboardH1 from '@/components/DashboardH1';
import { serverAPI } from '@/helpers/server';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  BookedTicket,
  BookedTicketStatusUpdatePayload,
} from '../../types';
import InfoPill from '@/components/InfoPill';
import Table from '@/components/Table';
import { formatPrice } from '@/helpers/helper';
import Tk from '@/components/Tk';
import { toast, Tooltip } from 'kitzo/react';
import TooltipContent from '@/components/TooltipContent';
import { CheckIcon, CloseIcon } from '@/assets/Svgs';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import QuickActionModal from '@/components/modal/QuickActionModal';
import { isPast } from 'date-fns';
import LoadingDataLengthErrors from '@/components/loading_and_errors/LoadingDataLengthErrors';

export default function Bookings() {
  const server = serverAPI(true);
  const queryClient = useQueryClient();

  const {
    data: bookedTickets,
    isLoading: isBookedTicketsLoading,
    error: bookedTicketsError,
  } = useQuery<BookedTicket[]>({
    queryKey: ['vendor-booked-tickets'],
    queryFn: async () => {
      const response = await server.get('vendor/booked-tickets');
      return response.data;
    },
  });

  // update booked ticket status
  const [updateBookedTicketStatusPayload, setUpdateBookedTicketStatusPayload] =
    useState<BookedTicketStatusUpdatePayload | null>(null);
  const {
    mutate: updateBookedTicketStatus,
    isPending: isUpdatingBookedTicketStatus,
  } = useMutation({
    mutationFn: async (data: BookedTicketStatusUpdatePayload) => {
      const response = await server.patch(
        '/vendor/udpate-booked-ticket-status',
        {
          booked_ticket_id: data.booked_ticket_id,
          status: data.new_status,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vendor-booked-tickets'],
      });
      toast.success('Booked ticket status was updated');
      setUpdateBookedTicketStatusPayload(null);
    },
    onError: () => {
      toast.error('Failed to update ticket status');
    },
  });

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="Requested Bookings" />

      <div className="mt-12">
        <LoadingDataLengthErrors
          emptyMessage="No requested bookings were found"
          dataLength={bookedTickets?.length}
          isLoading={isBookedTicketsLoading}
          error={bookedTicketsError}
        />

        {!bookedTicketsError &&
          !isBookedTicketsLoading &&
          bookedTickets &&
          bookedTickets.length > 0 && (
            <>
              <div className="flex flex-wrap items-center gap-1">
                <InfoPill
                  infoTitle="Total Bookings"
                  info={bookedTickets.length}
                />
                <InfoPill
                  infoTitle="Pending"
                  info={
                    bookedTickets.filter((b) => b.status === 'pending').length
                  }
                />
                <InfoPill
                  infoTitle="Accepted"
                  info={
                    bookedTickets.filter((b) => b.status === 'accepted').length
                  }
                />
                <InfoPill
                  infoTitle="Rejected"
                  info={
                    bookedTickets.filter((b) => b.status === 'rejected').length
                  }
                />
                <InfoPill
                  infoTitle="Paid"
                  info={bookedTickets.filter((b) => b.status === 'paid').length}
                />
              </div>

              <Table>
                <Table.head>
                  <Table.tr>
                    <Table.th>Consumer</Table.th>
                    <Table.th>Ticket title</Table.th>
                    <Table.th className="text-center!">Quantity</Table.th>
                    <Table.th className="text-center!">Total price</Table.th>
                    <Table.th className="text-center!">Action</Table.th>
                  </Table.tr>
                </Table.head>
                <Table.body>
                  {bookedTickets.map((b) => (
                    <Table.tr key={b._id}>
                      <Table.td>
                        <div className="">
                          <h5 className="text-sm leading-4 font-medium">
                            {b.user_name}
                          </h5>
                          <p className="text-content-light text-sm leading-4">
                            {b.user_email}
                          </p>
                        </div>
                      </Table.td>

                      <Table.td>{b.title}</Table.td>

                      <Table.td className="text-center!">{b.quantity}</Table.td>

                      <Table.td className="text-center!">
                        <Tk />
                        {formatPrice(b.total_price)}
                      </Table.td>

                      <Table.td className="text-center!">
                        {isPast(b.departure_time) && (
                          <span className="bg-content-light text-surface mr-1 rounded-full px-3 py-1 text-xs tracking-wider">
                            Expired
                          </span>
                        )}
                        {b.status === 'paid' ? (
                          <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-medium tracking-wider text-green-900 dark:bg-green-800 dark:text-green-200">
                            Paid
                          </span>
                        ) : (
                          <>
                            {!isPast(b.departure_time) && (
                              <div className="flex items-center justify-center gap-4 py-1">
                                <Tooltip
                                  content={
                                    <TooltipContent
                                      content={
                                        b.status === 'accepted'
                                          ? 'Accepted'
                                          : 'Accept ticket'
                                      }
                                    />
                                  }
                                  tooltipOptions={{
                                    smartHover: false,
                                  }}
                                >
                                  <button
                                    onClick={() => {
                                      if (isUpdatingBookedTicketStatus) return;
                                      if (b.status === 'accepted') return;
                                      setUpdateBookedTicketStatusPayload({
                                        booked_ticket_id: b._id,
                                        new_status: 'accepted',
                                        ticket_title: b.title,
                                      });
                                    }}
                                    className={`relative grid place-items-center ${b.status !== 'accepted' ? 'text-emerald-500' : 'text-content-light'}`}
                                  >
                                    <span className="absolute -inset-1"></span>
                                    <CheckIcon size="24" />
                                  </button>
                                </Tooltip>

                                <Tooltip
                                  content={
                                    <TooltipContent
                                      content={
                                        b.status === 'rejected'
                                          ? 'Rejected'
                                          : 'Reject ticket'
                                      }
                                    />
                                  }
                                  tooltipOptions={{
                                    smartHover: false,
                                  }}
                                >
                                  <button
                                    onClick={() => {
                                      if (isUpdatingBookedTicketStatus) return;
                                      if (b.status === 'rejected') return;
                                      setUpdateBookedTicketStatusPayload({
                                        booked_ticket_id: b._id,
                                        new_status: 'rejected',
                                        ticket_title: b.title,
                                      });
                                    }}
                                    className={`relative grid place-items-center ${b.status !== 'rejected' ? 'text-red-500' : 'text-content-light'}`}
                                  >
                                    <span className="absolute -inset-1"></span>
                                    <CloseIcon size="24" />
                                  </button>
                                </Tooltip>
                              </div>
                            )}
                          </>
                        )}
                      </Table.td>
                    </Table.tr>
                  ))}
                </Table.body>
              </Table>
            </>
          )}
      </div>

      <AnimatePresence>
        {updateBookedTicketStatusPayload && (
          <QuickActionModal
            title="Update booking status!"
            description={
              <span>
                Update booking status of '
                <strong>{updateBookedTicketStatusPayload?.ticket_title}</strong>
                ' to '
                <strong>{updateBookedTicketStatusPayload?.new_status}</strong>'
              </span>
            }
            actionBtnText="Update"
            closeBtnText="Cancel"
            actionBtnFn={() =>
              updateBookedTicketStatus(updateBookedTicketStatusPayload)
            }
            closeFn={() => setUpdateBookedTicketStatusPayload(null)}
            isProcessing={isUpdatingBookedTicketStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
