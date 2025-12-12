import type { Ticket } from '@/pages/vendor/types';
import { Tooltip } from 'kitzo/react';
import TooltipContent from '../TooltipContent';
import { perks as localPerks } from '@/constants/perksData';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tk from '../Tk';

type PublicTicketCardPropsType = {
  ticket: Ticket;
};

export default function PublicTicketCard({
  ticket,
}: PublicTicketCardPropsType) {
  const navigate = useNavigate();

  const {
    _id,
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

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <div className="bg-surface rounded-xl shadow">
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        {!isImgLoaded && (
          <div className="absolute inset-0 z-2 animate-pulse bg-zinc-500/30" />
        )}
        <img
          onLoad={() => setIsImgLoaded(true)}
          onError={() => setIsImgLoaded(true)}
          src={thumbnail}
          alt={title}
          className={`z-1 size-full object-cover object-center ${isImgLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-400`}
        />
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
            <Tk />
            {price}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-content-light text-sm font-medium uppercase">
              Route
            </p>
            <p className="text-lg font-semibold">
              {from} <span className="text-brand">→</span> {to}
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
            onClick={() => navigate(`/all-tickets/${_id}`)}
            className={`pointer-fine:bg-brand-light/50 pointer-fine:hover:bg-brand-light h-10 flex-1 rounded-full text-sm font-medium tracking-wide`}
          >
            See details
          </button>
        </div>
      </div>
    </div>
  );
}
