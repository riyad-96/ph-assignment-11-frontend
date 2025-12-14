import DashboardH1 from '@/components/DashboardH1';
import { serverAPI } from '@/helpers/server';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import InfoPill from '@/components/InfoPill';
import VendorTicketCard from '@/components/ticket_cards/VendorTicketCard';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { toast } from 'kitzo/react';
import type {
  Ticket,
  TicketDeletePayloadType,
  TicketFormFieldType,
} from '../../types';
import uploadImageToImgbb from '@/helpers/imageUpload';
import TicketUpdateModal from './TicketUpdateModal';
import TicketDeleteModal from './TicketDeleteModal';
import LoadingDataLengthErrors from '@/components/loading_and_errors/LoadingDataLengthErrors';

const server = serverAPI(true);

export default function MyTickets() {
  const queryClient = useQueryClient();

  const {
    data: tickets,
    isLoading: isTicketsLoading,
    error: ticketError,
  } = useQuery<Ticket[]>({
    queryKey: ['vendor-tickets'],
    queryFn: async () => {
      const response = await server.get('/vendor/tickets');
      return response.data;
    },
  });

  // update ticket info
  const [updateTicketDetails, setUpdateTicketDetails] = useState<Ticket | null>(
    null,
  );

  const { mutate: updateTicket, isPending: isUpdatingTicket } = useMutation({
    mutationFn: async (data: TicketFormFieldType) => {
      const updatedTicketDetails: Omit<
        Ticket,
        'isOnAd' | 'status' | 'created_at' | 'updated_at'
      > = {
        _id: updateTicketDetails?._id as string,
        from: data.from,
        to: data.to,
        price: parseFloat(data.price),
        quantity: Math.floor(parseFloat(data.quantity)),
        departure_time: data.departure_time,
        perks: data.perks,
        thumbnail:
          data.image_files.length > 0
            ? await uploadImageToImgbb(data.image_files)
            : (updateTicketDetails?.thumbnail as string),
        title: data.title,
        transport: data.transport,
        vendor_name: updateTicketDetails?.vendor_name as string,
        vendor_email: updateTicketDetails?.vendor_email as string,
      };

      const response = await server.patch(
        '/vendor/update-ticket',
        updatedTicketDetails,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-tickets'] });
      setUpdateTicketDetails(null);
      toast.success('Ticket details updated');
    },
    onError: () => {
      toast.error('Error while updating ticket details', { duration: 3500 });
    },
  });

  // delete ticket
  const [deleteTicketDetails, setDeleteTicketDetails] =
    useState<TicketDeletePayloadType | null>(null);

  const { mutate: deleteTicket, isPending: isDeletingTicket } = useMutation({
    mutationFn: async (data: TicketDeletePayloadType) => {
      const response = await server.delete(
        `/vendor/delete-ticket/${data.ticketId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-tickets'] });
      toast.success('Ticket deleted successfully');
      setDeleteTicketDetails(null);
    },
    onError: () => {
      toast.error('Error deleting ticket', { duration: 3500 });
    },
  });

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="My Tickets" />

      <LoadingDataLengthErrors
        isLoading={isTicketsLoading}
        error={ticketError}
        dataLength={tickets?.length}
        emptyMessage="You have not created any tickets yet."
      />

      {tickets && tickets.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex gap-2">
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((t) => (
              <VendorTicketCard
                key={t._id}
                ticket={t}
                actionUpdate={(ticketDetails) =>
                  setUpdateTicketDetails(ticketDetails)
                }
                actionDelete={(ticketDetails) =>
                  setDeleteTicketDetails(ticketDetails)
                }
              />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {!!updateTicketDetails && (
          <TicketUpdateModal
            ticket={updateTicketDetails}
            closeFn={() => setUpdateTicketDetails(null)}
            isUpdatingTicket={isUpdatingTicket}
            updateTicket={(data) => updateTicket(data)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!!deleteTicketDetails && (
          <TicketDeleteModal
            ticketDetails={deleteTicketDetails}
            closeFn={() => setDeleteTicketDetails(null)}
            isDeletingTicket={isDeletingTicket}
            deleteTicket={(data) => deleteTicket(data)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
