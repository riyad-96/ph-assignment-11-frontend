import type { Ticket } from '@/pages/vendor/types';
import DashboardH1 from '@/components/DashboardH1';
import LoadingDataLengthErrors from '@/components/loading_and_errors/LoadingDataLengthErrors';
import { useQuery } from '@tanstack/react-query';
import { serverAPI } from '@/helpers/server';
import InfoPill from '@/components/InfoPill';
import { CheckIcon, CloseIcon } from '@/assets/Svgs';
import { Tooltip } from 'kitzo/react';
import TooltipContent from '@/components/TooltipContent';
import QuickActionModal from '@/components/modal/QuickActionModal';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Table from '@/components/Table';
import TransportIcon from '@/components/TransportIcon';
import { formatPrice } from '@/helpers/helper';
import Tk from '@/components/Tk';
import customToast from '@/helpers/triggerToast';

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
        customToast({
          type: 'success',
          message: 'Ticket status updated',
          options: { duration: 4000 },
        });
      },
      onError: () => {
        customToast({
          type: 'error',
          message: 'Failed to update ticket status. Please try again.',
          options: { duration: 4500 },
        });
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

      {!isTicketsLoading && tickets && tickets.length > 0 && (
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

          <Table>
            <Table.head>
              <Table.tr>
                <Table.th>Ticket title</Table.th>
                <Table.th>Transport</Table.th>
                <Table.th>Price</Table.th>
                <Table.th>Vendor</Table.th>
                <Table.th>Status</Table.th>
                <Table.th>Actions</Table.th>
              </Table.tr>
            </Table.head>
            <Table.body>
              {tickets.map((t) => (
                <Table.tr key={t._id}>
                  <Table.td>
                    <div className="grid">
                      <h5 className="line-clamp-1 text-sm font-semibold">
                        {t.title}
                      </h5>
                      <span className="text-xs">
                        <span className="bg-brand-light rounded-md px-1">
                          {t.from}
                        </span>{' '}
                        to{' '}
                        <span className="bg-brand-light rounded-md px-1">
                          {t.to}
                        </span>
                      </span>
                    </div>
                  </Table.td>

                  <Table.td>
                    <div className="flex items-center gap-1 text-sm font-medium tracking-wide capitalize">
                      <span>
                        <TransportIcon transport={t.transport} />
                      </span>
                      <span>{t.transport}</span>
                    </div>
                  </Table.td>

                  <Table.td>
                    <span className="text-sm font-semibold">
                      <Tk /> {formatPrice(t.price)}
                    </span>
                  </Table.td>

                  <Table.td>
                    <div className="">
                      <h4 className="block text-sm leading-4 font-semibold">
                        {t.vendor_name}
                      </h4>
                      <span className="block text-sm leading-4">
                        {t.vendor_email}
                      </span>
                    </div>
                  </Table.td>

                  <Table.td>
                    <div className="text-center capitalize">
                      <Tooltip
                        tooltipOptions={{ hideOnTouch: false }}
                        content={
                          <TooltipContent
                            content={`Updated on: ${format(t.updated_at, 'dd MMM y, hh:mm a')}`}
                          />
                        }
                      >
                        <span
                          className={`text-surface block w-fit rounded-full px-3 py-1 text-xs font-light tracking-wide shadow ${t.status === 'pending' ? 'bg-amber-500' : t.status === 'approved' ? 'bg-emerald-500' : 'bg-red-500'}`}
                        >
                          {t.status}
                        </span>
                      </Tooltip>
                    </div>
                  </Table.td>

                  <Table.td>
                    <div className="flex items-center justify-center gap-4 py-1">
                      <Tooltip
                        content={
                          <TooltipContent
                            content={
                              t.status === 'approved'
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
                            if (t.status === 'approved') return;
                            setUpdateTicketStatusPayload({
                              ticket_id: t._id,
                              new_status: 'approved',
                              ticket_title: t.title,
                            });
                          }}
                          className={`relative grid place-items-center ${t.status !== 'approved' ? 'text-emerald-500' : 'text-content-light'}`}
                        >
                          <span className="absolute -inset-1"></span>
                          <CheckIcon size="24" />
                        </button>
                      </Tooltip>

                      <Tooltip
                        content={
                          <TooltipContent
                            content={
                              t.status === 'rejected'
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
                            if (t.status === 'rejected') return;
                            setUpdateTicketStatusPayload({
                              ticket_id: t._id,
                              new_status: 'rejected',
                              ticket_title: t.title,
                            });
                          }}
                          className={`relative grid place-items-center ${t.status !== 'rejected' ? 'text-red-500' : 'text-content-light'}`}
                        >
                          <span className="absolute -inset-1"></span>
                          <CloseIcon size="24" />
                        </button>
                      </Tooltip>
                    </div>
                  </Table.td>
                </Table.tr>
              ))}
            </Table.body>
          </Table>
        </div>
      )}

      <AnimatePresence>
        {updateTicketStatusPayload &&
          updateTicketStatusPayload.new_status === 'approved' && (
            <QuickActionModal
              title="Approve Ticket!"
              description="Are you sure you want to approve this ticket? This ticket will be marked as approved."
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
              description="Are you sure you want to reject this ticket? This ticket will be marked as rejected."
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
