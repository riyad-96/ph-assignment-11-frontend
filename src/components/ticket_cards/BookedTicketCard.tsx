import type { BookedTicket } from '@/pages/client/dashboard/types';
import Tk from '../Tk';
import { format, intervalToDuration, isPast, type Duration } from 'date-fns';
import { formatPrice } from '@/helpers/helper';
import BookingStatus from '../BookingStatus';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { serverAPI } from '@/helpers/server';
import customToast from '@/helpers/triggerToast';

type BookedTicketCard = {
  b: BookedTicket;
};

export default function BookedTicketCard({ b }: BookedTicketCard) {
  const {
    _id,
    departure_time,
    from,
    to,
    price,
    quantity,
    total_price,
    thumbnail,
    title,
    status,
  } = b;

  const server = serverAPI(true);

  const [timeLeft, setTimeLeft] = useState<Duration | null>(null);
  const [isExpired, setIsExpired] = useState(() => isPast(departure_time));

  useEffect(() => {
    if (!b) return;

    const timer = setInterval(() => {
      const now = new Date();

      if (isPast(b.departure_time)) {
        setIsExpired(true);
        clearInterval(timer);
        return;
      }

      const duration = intervalToDuration({
        start: now,
        end: b.departure_time,
      });

      setTimeLeft(duration);
    }, 1000);

    return () => clearInterval(timer);
  }, [b]);

  // pay ticket price
  const { mutate: payTicketPrice, isPending: isCreating } = useMutation({
    mutationFn: async (booking_id: string) => {
      const response = await server.post('/user/create-checkout-session', {
        booking_id,
      });
      return response.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: () => {
      customToast({
        type: 'error',
        message: 'Error while creating checkout session',
        options: { duration: 3500 },
      });
    },
  });

  return (
    <div className="bg-surface overflow-hidden rounded-2xl shadow">
      <div className="relative">
        <img
          className="h-40 w-full object-cover"
          src={thumbnail}
          alt={title}
        />

        <div className="absolute top-4 left-4">
          <BookingStatus status={status} />
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-content pr-2 text-lg leading-tight font-medium">
            {title}
          </h3>

          <p className="text-brand text-2xl font-semibold">
            <Tk />
            {formatPrice(total_price)}
          </p>
        </div>

        <hr className="my-3 border-gray-100 dark:border-gray-700" />

        <div className="space-y-2 text-sm">
          <div className="text-content-light flex items-center">
            <svg
              className="text-brand mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 2a8 8 0 100 16A8 8 0 0010 2zm1 11h2v-2h-2v2zm-4-2h2v-2H7v2z"
                clipRule="evenodd"
              ></path>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 01-1-1v-4zM13 9a1 1 0 00-1-1h-2a1 1 0 00-1 1v4a1 1 0 001 1h2a1 1 0 001-1V9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-content font-medium">{from}</span>
            <span className="text-content mx-2">→</span>
            <span className="text-content font-medium">{to}</span>
          </div>

          <div className="text-content-light flex items-center">
            <svg
              className="text-brand mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="font-medium">
              {format(departure_time, 'dd MMM y, hh:mm a')}
            </span>
          </div>

          <div className="text-content-light flex items-center">
            <svg
              className="text-brand mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2v2m0 0v2m-3-2h6M5 12h2m10 0h2M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              ></path>
            </svg>
            <span className="font-medium">Quantity: {quantity}</span>
            <span className="ml-4 text-gray-500">
              (<Tk />
              {price} / unit)
            </span>
          </div>
        </div>

        <hr className="dark:border-content-light/20 my-5 border-gray-100" />

        <div className="flex h-10 items-center justify-between">
          {isExpired ? (
            <p className="text-content-light text-sm font-medium">Expired</p>
          ) : (
            <p className="text-content flex gap-1 text-sm font-medium">
              <span>{timeLeft?.days ?? 0}d :</span>
              <span>{timeLeft?.hours ?? 0}h :</span>
              <span>{timeLeft?.minutes ?? 0}m :</span>
              <span>{timeLeft?.seconds ?? 0}s</span>
            </p>
          )}

          {status === 'accepted' && !isExpired && (
            <button
              onClick={() => payTicketPrice(_id)}
              className="bg-brand h-9 w-[85px] rounded-full text-sm font-medium tracking-wide text-nowrap text-white"
            >
              {isCreating ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <span className="text-shadow-xs">Pay Now</span>
              )}
            </button>
          )}
          {status === 'paid' && (
            <div className="bg-content-light text-surface rounded-full px-3 py-1 text-sm tracking-wider">
              PAID
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
