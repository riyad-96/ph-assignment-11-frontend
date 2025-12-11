import Modal from '@/components/Modal';
import type { TicketDeletePayloadType } from '../../types';
import WarningButton from '@/components/buttons/WarningButton';
import CancelButton from '@/components/buttons/CancelButton';

type TicketDeleteModalPropsType = {
  ticketDetails: TicketDeletePayloadType;
  closeFn: () => void;
  isDeletingTicket: boolean;
  deleteTicket: (ticketDetails: TicketDeletePayloadType) => void;
};

export default function TicketDeleteModal({
  ticketDetails,
  closeFn,
  isDeletingTicket,
  deleteTicket,
}: TicketDeleteModalPropsType) {
  return (
    <Modal
      closeFn={closeFn}
      className="max-w-[450px]"
    >
      <div className="bg-canvas rounded-2xl p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Delete ticket!</h2>
        <p className="mb-6">
          This ticket titled "<strong>{ticketDetails.ticketTitle}</strong>" will
          be permanently deleted. Are you sure you want to proceed?
        </p>
        <div className="flex justify-end gap-2">
          <CancelButton
            closeFn={closeFn}
            content="Cancel"
          />
          <WarningButton
            onClick={() => {
              if (isDeletingTicket) return;
              deleteTicket(ticketDetails);
            }}
            content="Delete"
            isProcessing={isDeletingTicket}
          />
        </div>
      </div>
    </Modal>
  );
}
