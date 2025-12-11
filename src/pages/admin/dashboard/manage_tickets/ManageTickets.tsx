import type { Ticket } from '@/pages/vendor/types';
import DashboardH1 from '@/components/DashboardH1';
import LoadingDataLengthErrors from '@/components/loading_and_errors/LoadingDataLengthErrors';
import { useQuery } from '@tanstack/react-query';
import { serverAPI } from '@/helpers/server';
import InfoPill from '@/components/InfoPill';
import { CheckIcon, CloseIcon } from '@/assets/Svgs';
import { toast, Tooltip } from 'kitzo/react';
import TooltipContent from '@/components/TooltipContent';
import QuickActionModal from '@/components/ticket_cards/modal/QuickActionModal';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

type TicketStatusUpdatePayload = {
  ticket_title: string;
  ticket_id: string;
  new_status: 'approved' | 'rejected';
};

export default function ManageTickets() {
  const server = serverAPI(true);
  const queryClient = useQueryClient();

  // fetch tickets
  const {
    data: tickets,
    isLoading: isTicketsLoading,
    error: ticketError,
  } = useQuery<Ticket[]>({
    queryKey: ['admin-tickets'],
    queryFn: async () => {
      const response = await server.get('/admin/tickets');
      return response.data;
    },
  });

  // update ticket status
  const [updateTicketStatusPayload, setUpdateTicketStatusPayload] =
    useState<TicketStatusUpdatePayload | null>(null);

  const { mutate: updateTicketStatus, isPending: isUpdatingTicketStatus } =
    useMutation({
      mutationFn: async (payload: TicketStatusUpdatePayload) => {
        const response = await server.patch(
          `/admin/update-ticket-status`,
          payload,
        );
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin-tickets'] });
        setUpdateTicketStatusPayload(null);
        toast.success('Ticket status updated successfully.');
      },
      onError: () => {
        toast.error('Failed to update ticket status. Please try again.');
      },
    });

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="Manage Tickets" />

      <LoadingDataLengthErrors
        isLoading={isTicketsLoading}
        error={ticketError}
        dataLength={tickets?.length}
        emptyMessage="No tickets found."
      />

      {tickets && tickets.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex flex-wrap gap-2">
            <InfoPill
              infoTitle="Total tickets"
              info={tickets.length}
            />
            <InfoPill
              infoTitle="Pending tickets"
              info={
                tickets.filter((ticket) => ticket.status === 'pending').length
              }
            />
            <InfoPill
              infoTitle="Resolved tickets"
              info={
                tickets.filter((ticket) => ticket.status === 'approved').length
              }
            />
            <InfoPill
              infoTitle="Rejected tickets"
              info={
                tickets.filter((ticket) => ticket.status === 'rejected').length
              }
            />
          </div>

          <div className="mt-4 w-[clamp(14.75rem,-5.25rem+100vw,42.6875rem)] overflow-x-auto md:w-[clamp(34.625rem,-13.375rem+100vw,67.875rem)]">
            <div className="border-brand-light bg-surface min-w-[850px] overflow-hidden rounded-xl border">
              <table
                border={1}
                className="w-full cursor-default"
              >
                <thead>
                  <tr className="divide-x">
                    <th className="border-brand-light bg-brand-light border-b px-4 py-2 text-start font-semibold">
                      Ticket title
                    </th>
                    <th className="border-brand-light bg-brand-light border-b px-4 py-2 text-start font-semibold">
                      Vendor
                    </th>
                    <th className="border-brand-light bg-brand-light border-b px-4 py-2 text-center font-semibold">
                      Status
                    </th>
                    <th className="border-brand-light bg-brand-light border-b px-4 py-2 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="group hover:bg-brand-light/50 divide-x"
                    >
                      <td className="border-brand-light relative border-t py-2">
                        <div className="grid px-4">
                          <span className="line-clamp-1 font-semibold text-sm">
                            {ticket.title}
                          </span>
                          <span className="text-xs">
                            <span className="bg-brand-light px-1 rounded-md">{ticket.from}</span> to <span className="bg-brand-light px-1 rounded-md">{ticket.to}</span>
                          </span>
                        </div>
                      </td>

                      <td className="border-brand-light relative border-t py-2">
                        <div className="px-4">
                          <h4 className="block text-sm leading-4 font-semibold">
                            {ticket.vendor_name}
                          </h4>
                          <span className="block text-sm leading-4">
                            {ticket.vendor_email}
                          </span>
                        </div>
                      </td>

                      <td className="border-brand-light relative border-t py-2">
                        <div className="px-4 text-center capitalize">
                          <Tooltip
                            tooltipOptions={{ hideOnTouch: false }}
                            content={
                              <TooltipContent
                                content={`Updated on: ${format(ticket.updated_at, 'MMM dd, yyyy hh:mm a')}`}
                              />
                            }
                          >
                            <span
                              className={`text-surface block w-fit rounded-full px-3 py-1 text-xs font-light tracking-wide shadow ${ticket.status === 'pending' ? 'bg-amber-500' : ticket.status === 'approved' ? 'bg-emerald-500' : 'bg-red-500'}`}
                            >
                              {ticket.status}
                            </span>
                          </Tooltip>
                        </div>
                      </td>

                      <td className="border-brand-light relative border-t py-2">
                        <div className="flex items-center justify-center gap-4 px-4 py-1">
                          <Tooltip
                            content={
                              <TooltipContent
                                content={
                                  ticket.status === 'approved'
                                    ? 'Approved'
                                    : 'Approve ticket'
                                }
                              />
                            }
                            tooltipOptions={{
                              smartHover: false,
                            }}
                          >
                            <button
                              onClick={() => {
                                if (ticket.status === 'approved') return;
                                setUpdateTicketStatusPayload({
                                  ticket_id: ticket._id,
                                  new_status: 'approved',
                                  ticket_title: ticket.title,
                                });
                              }}
                              className={`relative grid place-items-center ${ticket.status !== 'approved' ? 'text-emerald-500' : 'text-content-light'}`}
                            >
                              <span className="absolute -inset-1"></span>
                              <CheckIcon size="24" />
                            </button>
                          </Tooltip>

                          <Tooltip
                            content={
                              <TooltipContent
                                content={
                                  ticket.status === 'rejected'
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
                                if (ticket.status === 'rejected') return;
                                setUpdateTicketStatusPayload({
                                  ticket_id: ticket._id,
                                  new_status: 'rejected',
                                  ticket_title: ticket.title,
                                });
                              }}
                              className={`relative grid place-items-center ${ticket.status !== 'rejected' ? 'text-red-500' : 'text-content-light'}`}
                            >
                              <span className="absolute -inset-1"></span>
                              <CloseIcon size="24" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {updateTicketStatusPayload &&
          updateTicketStatusPayload.new_status === 'approved' && (
            <QuickActionModal
              title="Approve Ticket!"
              description="Are you sure you want to approve this ticket? This action cannot be undone."
              closeBtnText="Cancel"
              actionBtnText="Approve"
              closeFn={() => setUpdateTicketStatusPayload(null)}
              actionBtnFn={() => updateTicketStatus(updateTicketStatusPayload)}
              isProcessing={isUpdatingTicketStatus}
            />
          )}
      </AnimatePresence>

      <AnimatePresence>
        {updateTicketStatusPayload &&
          updateTicketStatusPayload.new_status === 'rejected' && (
            <QuickActionModal
              title="Reject Ticket!"
              description="Are you sure you want to reject this ticket? This action cannot be undone."
              closeBtnText="Cancel"
              actionBtnText="Reject"
              closeFn={() => setUpdateTicketStatusPayload(null)}
              actionBtnFn={() => updateTicketStatus(updateTicketStatusPayload)}
              isProcessing={isUpdatingTicketStatus}
            />
          )}
      </AnimatePresence>
    </div>
  );
}
