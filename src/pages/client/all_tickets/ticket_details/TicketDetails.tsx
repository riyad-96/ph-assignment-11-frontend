import CancelButton from '@/components/buttons/CancelButton';
import InputField from '@/components/form/InputField';
import TicketDetailsPageLoadingScreen from '@/components/loading_and_errors/TicketDetailsPageLoadingScreen';
import Modal from '@/components/modal/Modal';
import Tk from '@/components/Tk';
import TransportIcon from '@/components/TransportIcon';
import { serverAPI } from '@/helpers/server';
import type { Ticket } from '@/pages/vendor/types';
import { useQuery } from '@tanstack/react-query';
import { format, intervalToDuration, isBefore, type Duration } from 'date-fns';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TicketDetails() {
  const server = serverAPI(true);
  const { id } = useParams();

  const {
    data: t,
    isLoading,
    error,
  } = useQuery<Ticket>({
    queryKey: ['ticket', id],
    queryFn: async () => {
      const response = await server.get(`/user/ticket/${id}`);
      await new Promise((res) => setTimeout(res, 2000));
      return response.data;
    },
  });

  const [timeLeft, setTimeLeft] = useState<Duration | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!t) return;

    const timer = setInterval(() => {
      const now = new Date();

      if (isBefore(t.departure_time, now)) {
        setIsExpired(true);
        clearInterval(timer);
        return;
      }

      const duration = intervalToDuration({
        start: now,
        end: t.departure_time,
      });

      setTimeLeft(duration);
    }, 500);

    return () => clearInterval(timer);
  }, [t]);

  // submit booking
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState<number | undefined>(1);

  return (
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1300px]">
        {isLoading && <TicketDetailsPageLoadingScreen />}

        {!error && t && (
          <>
            <div className="py-12">
              {/* --- 1. Hero Section --- */}
              <div className="relative mb-8 h-64 overflow-hidden rounded-3xl shadow-xl md:h-96">
                <img
                  src={t.thumbnail}
                  alt="Ticket Thumbnail"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/20 to-transparent p-8">
                  <span className="bg-brand mb-3 w-fit rounded-full px-3 py-1 pt-1.5 text-xs font-medium tracking-widest text-white uppercase">
                    {t.transport}
                  </span>
                  <h1 className="text-3xl font-semibold text-white md:text-5xl">
                    {t.title}
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* --- 2. Left Column: Details --- */}
                <div className="space-y-6 lg:col-span-2">
                  {/* Route & Time Card */}
                  <div className="bg-surface border-content-light/10 rounded-2xl border p-6 shadow-sm">
                    <h2 className="text-content mb-6 text-xl font-medium">
                      Trip Itinerary
                    </h2>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-center">
                        <p className="text-content-light text-sm font-semibold tracking-tighter uppercase">
                          From
                        </p>
                        <p className="text-content text-2xl font-medium">
                          {t.from}
                        </p>
                      </div>

                      <div className="flex flex-1 flex-col items-center px-4">
                        <div className="border-content-light relative w-full border-t-2 border-dashed">
                          <span className="bg-surface absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 text-xl">
                            <TransportIcon transport={t.transport} />
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 text-center">
                        <p className="text-content-light text-sm font-semibold tracking-tighter uppercase">
                          To
                        </p>
                        <p className="text-content text-2xl font-medium">
                          {t.to}
                        </p>
                      </div>
                    </div>

                    <div className="border-content-light/20 text-content/80 mt-8 flex items-center gap-4 border-t pt-6">
                      <span className="font-medium">Departure:</span>
                      <span className="bg-content-light/15 rounded-lg px-3 py-1">
                        {format(t.departure_time, 'dd MMM y, hh:mm a')}
                      </span>
                    </div>
                  </div>

                  {/* Perks Section */}
                  <div className="border-content-light/10 bg-surface rounded-2xl border p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-medium">Included Perks</h3>
                    <div className="flex flex-wrap gap-2">
                      {/* perks.map */}
                      {t.perks.map((p) => (
                        <span
                          key={p}
                          className="rounded-xl border border-green-500/20 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-500"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* --- 3. Right Column: Booking Card (Sidebar) --- */}
                <aside className="lg:col-span-1">
                  <div className="border-content-light/10 bg-surface rounded-3xl border px-6 py-8 shadow">
                    <div className="mb-4">
                      <p className="text-content-light mb-2 text-sm tracking-wide">
                        Price per person
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-content text-4xl font-bold">
                          <Tk />
                          {t.price}
                        </span>
                        <span className="text-content-light tracking-wide">
                          /ticket
                        </span>
                      </div>
                    </div>

                    {/* Countdown Section */}
                    <div className="mb-6 rounded-2xl border border-rose-500/10 bg-rose-500/5 p-4">
                      <p className="mb-2 text-center text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-200">
                        Departure In
                      </p>
                      <div className="flex items-center justify-between text-rose-700 dark:text-rose-300">
                        <div className="text-center">
                          <p className="text-xl font-bold">
                            {timeLeft?.days ?? 0}
                          </p>
                          <p className="text-[10px]">DAYS</p>
                        </div>
                        <span className="font-bold">:</span>
                        <div className="text-center">
                          <p className="text-xl font-bold">
                            {timeLeft?.hours ?? 0}
                          </p>
                          <p className="text-[10px]">HOURS</p>
                        </div>
                        <span className="font-bold">:</span>
                        <div className="text-center">
                          <p className="text-xl font-bold">
                            {timeLeft?.minutes ?? 0}
                          </p>
                          <p className="text-[10px]">MINS</p>
                        </div>
                        <span className="font-bold">:</span>
                        <div className="text-center">
                          <p className="text-xl font-bold">
                            {timeLeft?.seconds ?? 0}
                          </p>
                          <p className="text-[10px]">SECONDS</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-content-light flex gap-1 text-sm tracking-wide">
                        <span>Available Tickets:</span>
                        <span className="text-content">{t.quantity}</span>
                      </div>

                      {/* Main Action Button */}
                      <button
                        onClick={() => {
                          if (isExpired) return;
                          setIsBookingModalOpen(true);
                        }}
                        className={`bg-brand w-full rounded-full py-4 font-medium tracking-wider text-white shadow text-shadow-xs ${isExpired ? 'opacity-0' : 'opacity-100'}`}
                      >
                        Book Now
                      </button>
                      <p className="text-content-light text-center text-xs tracking-wide">
                        No extra taxes or hidden fees
                      </p>
                    </div>
                  </div>
                </aside>
              </div>

              {/* Vendor Info */}
              <div className="bg-content-light/10 border-content-light/10 mt-12 flex items-center gap-4 rounded-2xl border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  V
                </div>
                <div>
                  <p className="text-sm font-medium text-content-light">
                    Provided by
                  </p>
                  <p className="font-medium tracking-wide text-content">
                    {/* vendor_name */} Green Line Travels
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {!error && t && (
        <AnimatePresence>
          {isBookingModalOpen && (
            <Modal
              closeFn={() => setIsBookingModalOpen(false)}
              className="bg-canvas w-full max-w-[450px] transform rounded-3xl p-6 shadow-xl"
            >
              <h3 className="mb-2 text-2xl font-semibold text-slate-900">
                Confirm Booking
              </h3>
              <p className="mb-6 text-slate-500">
                How many tickets would you like to purchase?
              </p>

              <div className="space-y-6">
                <div>
                  <InputField
                    id="enter_quantity"
                    label="Enter quantity"
                    type="number"
                    value={ticketQuantity}
                    autoFocus
                    step="1"
                    onChange={(e) =>
                      setTicketQuantity((prev) => {
                        const value = Number(e.target.value);
                        const maxQuantity = Number(t.quantity);
                        if (value > maxQuantity) return prev;
                        if (value < 1) return 1;
                        return value;
                      })
                    }
                  />
                  <p className="text-content-light mt-2 text-sm font-medium">
                    Max available:{' '}
                    <span className="text-content">{t?.quantity}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <CancelButton
                    content="Cancel"
                    closeFn={() => setIsBookingModalOpen(false)}
                    className="font-semibold tracking-wide"
                  />
                  <button className="bg-brand rounded-full py-3 font-medium tracking-wide text-white shadow">
                    <span className="text-shadow-xs">Confirm</span>
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
