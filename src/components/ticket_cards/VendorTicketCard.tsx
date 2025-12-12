import type { Ticket } from '@/pages/vendor/types';
import { toast, Tooltip } from 'kitzo/react';
import TooltipContent from '../TooltipContent';
import { perks as localPerks } from '@/constants/perksData';
import { format } from 'date-fns';
import Tk from '../Tk';

type VendorTicketCardPropsType = {
  ticket: Ticket;
  actionUpdate: (ticketDetails: Ticket) => void;
  actionDelete: (ticketDetails: {
    ticketTitle: string;
    ticketId: string;
  }) => void;
};

export default function VendorTicketCard({
  ticket,
  actionUpdate,
  actionDelete,
}: VendorTicketCardPropsType) {
  const {
    thumbnail,
    title,
    departure_time,
    from,
    to,
    perks,
    price,
    quantity,
    status,
    transport,
  } = ticket;

  return (
    <div className="bg-surface rounded-xl shadow">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="aspect-video w-full rounded-t-xl object-cover object-center"
        />

        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold shadow-md ${status === 'pending' ? 'bg-amber-400' : status === 'approved' ? 'bg-emerald-400' : 'bg-red-500'}`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-4 p-4">
        <div
          className=""
          style={{ borderColor: 'var(--color-content-light)' }}
        >
          <h3 className="line-clamp-1 text-lg font-semibold">{title}</h3>
          <p
            className="text-xl font-bold whitespace-nowrap"
            style={{ color: 'var(--color-action)' }}
          >
            <Tk />{price}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-content-light text-sm font-medium uppercase">
              Route
            </p>
            <p className="text-lg font-semibold">
              {from} <span style={{ color: 'var(--color-brand)' }}>→</span> {to}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-content-light text-sm font-medium uppercase">
              Transport
            </p>
            <p className="font-semibold capitalize">{transport}</p>
          </div>
          <div>
            <p className="text-content-light text-sm font-medium uppercase">
              Available
            </p>
            <p className="font-medium">{quantity} Seats</p>
          </div>
        </div>

        <div>
          <p className="text-content-light text-sm font-medium uppercase">
            Departure
          </p>
          <p className="font-medium">
            {format(departure_time, 'dd MMM y, hh:mm a')}
          </p>
        </div>

        <div className="">
          <p className="mb-2 text-sm font-medium">Perks:</p>
          <div className="flex flex-wrap items-start gap-2 md:min-h-14">
            {perks.map((perk) => (
              <Tooltip
                key={perk}
                content={
                  <TooltipContent
                    content={localPerks.find((p) => p.value === perk)?.tip}
                  />
                }
                tooltipOptions={{ smartHover: false, offset: 5 }}
              >
                <span
                  className="flex rounded-full px-3 py-1 text-xs font-medium select-none"
                  style={{
                    backgroundColor: 'var(--color-brand-light)',
                    color: 'var(--color-brand)',
                  }}
                >
                  {perk}
                </span>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (ticket.status === 'rejected')
                return toast.error(
                  'Ticket was rejected and cannot be updated.',
                  { duration: 4000 },
                );
              actionUpdate(ticket);
            }}
            className={`bg-brand-light/50 h-10 flex-1 rounded-full text-sm font-medium tracking-wide ${ticket.status === 'rejected' ? 'disabled cursor-not-allowed opacity-50' : 'hover:bg-brand-light'}`}
          >
            Update
          </button>
          <button
            onClick={() => {
              if (ticket.status === 'rejected')
                return toast.error(
                  'Ticket was rejected and cannot be deleted.',
                  { duration: 4000 },
                );
              actionDelete({ ticketTitle: title, ticketId: ticket._id });
            }}
            className={`bg-brand-light/50 h-10 flex-1 rounded-full text-sm font-medium tracking-wide ${ticket.status === 'rejected' ? 'disabled cursor-not-allowed opacity-50' : 'hover:bg-red-500/30'}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
