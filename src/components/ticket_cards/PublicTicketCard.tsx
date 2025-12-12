import type { Ticket } from '@/pages/vendor/types';
import { Tooltip } from 'kitzo/react';
import TooltipContent from '../TooltipContent';
import { perks as localPerks } from '@/constants/perksData';
import { format } from 'date-fns';

type PublicTicketCardPropsType = {
  ticket: Ticket;
};

export default function PublicTicketCard({
  ticket,
}: PublicTicketCardPropsType) {
  const {
    thumbnail,
    title,
    departure_time,
    from,
    to,
    perks,
    price,
    quantity,
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
      </div>

      <div className="space-y-4 p-4">
        <div
          className=""
          style={{ borderColor: 'var(--color-content-light)' }}
        >
          <h3 className="line-clamp-1 text-lg font-semibold">{title}</h3>
          <p
            className="text-xl font-extrabold whitespace-nowrap"
            style={{ color: 'var(--color-action)' }}
          >
            ৳{price}
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
            {format(departure_time, 'MMM dd, hh:mm a')}
          </p>
        </div>

        <div className="">
          <p className="mb-2 text-sm font-medium">Perks:</p>
          <div className="flex flex-wrap items-start gap-2 sm:min-h-14">
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

        <div className="grid">
          <button
            className={`bg-brand-light/50 h-10 flex-1 rounded-full text-sm font-medium tracking-wide`}
          >
            See details
          </button>
        </div>
      </div>
    </div>
  );
}
