import { Link } from 'react-router-dom';

export default function ExtraSections() {
  return (
    <>
      <section className="mx-auto py-12">
        <header className="mb-10">
          <h2 className="text-brand mb-2 text-xl font-bold md:text-2xl">
            Our Most Popular Routes:
          </h2>
          <p className="text-content-light md:text-lg">
            Skip the queue! Find instant seat availability on the routes
            everyone is booking.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-surface grid rounded-xl p-4 shadow">
            <h3 className="text-content mb-2 text-2xl font-bold">
              Dhaka ➡️ Chittagong
            </h3>
            <p className="text-content-light mb-4">
              The Port City Express. High-demand route with multiple daily
              departures.
            </p>
            <Link
              to="/all-tickets"
              className="bg-brand-light text-content inline-block w-full rounded-lg py-3 text-center text-sm font-semibold"
            >
              BOOK NOW
            </Link>
          </div>

          <div className="bg-surface grid rounded-xl p-4 shadow">
            <h3 className="text-content mb-2 text-2xl font-bold">
              Dhaka ➡️ Cox's Bazar
            </h3>
            <p className="text-content-light mb-4">
              The Sea Beach Journey. Premium coaches to the world's longest
              beach.
            </p>
            <Link
              to="/all-tickets"
              className="bg-brand-light text-content inline-block w-full rounded-lg py-3 text-center text-sm font-semibold"
            >
              FIND TICKETS
            </Link>
          </div>

          <div className="bg-surface grid rounded-xl p-4 shadow">
            <h3 className="text-content mb-2 text-2xl font-bold">
              Dhaka ➡️ Sylhet
            </h3>
            <p className="text-content-light mb-4">
              The Holy Land Trip. Smooth travel to the land of tea gardens.
            </p>
            <Link
              to="/all-tickets"
              className="bg-brand-light text-content inline-block w-full rounded-lg py-3 text-center text-sm font-semibold"
            >
              CHECK SCHEDULE
            </Link>
          </div>

          <div className="bg-surface grid rounded-xl p-4 shadow">
            <h3 className="text-content mb-2 text-2xl font-bold">
              Dhaka ➡️ Rajshahi
            </h3>
            <p className="text-content-light mb-4">
              North Bengal Connection. Fast, direct services to the divisional
              capital.
            </p>
            <Link
              to="/all-tickets"
              className="bg-brand-light text-content inline-block w-full rounded-lg py-3 text-center text-sm font-semibold"
            >
              VIEW BUSES
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto py-12">
        <header className="mb-10">
          <h2 className="text-brand mb-2 text-xl font-bold md:text-2xl">
            The TicketBari Difference: Your Journey, Simplified
          </h2>
          <p className="text-content-light md:text-lg">
            We are more than just a booking platform. We are your reliable
            travel partner.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-surface flex items-start space-x-4 rounded-lg p-6 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-brand mt-1 h-8 w-8 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <div>
              <h3 className="text-content mb-1 text-xl font-bold">
                100% Secure Payment
              </h3>
              <p className="text-content-light">
                We support all major methods (Bkash, Nagad, Visa) with
                SSL-certified gateways.
              </p>
            </div>
          </div>

          <div className="bg-surface flex items-start space-x-4 rounded-lg p-6 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-brand mt-1 h-8 w-8 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 0 0-9.28 13.84L2 22l6-1h8l6 1-1.72-6.16A10 10 0 0 0 12 2z" />
            </svg>
            <div>
              <h3 className="text-content mb-1 text-xl font-bold">
                24/7 Customer Support
              </h3>
              <p className="text-content-light">
                Got a last-minute change? Our team is available around the clock
                to assist you.
              </p>
            </div>
          </div>

          <div className="bg-surface flex items-start space-x-4 rounded-lg p-6 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-brand mt-1 h-8 w-8 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                width="14"
                height="20"
                x="5"
                y="2"
                rx="2"
                ry="2"
              />
              <path d="M12 18V6" />
              <path d="M17 6h-6" />
              <path d="M17 10h-2" />
            </svg>
            <div>
              <h3 className="text-content mb-1 text-xl font-bold">
                Instant E-Ticket & SMS
              </h3>
              <p className="text-content-light">
                No need to print! Receive your confirmed ticket instantly via
                email and SMS on your phone.
              </p>
            </div>
          </div>

          <div className="bg-surface flex items-start space-x-4 rounded-lg p-6 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-brand mt-1 h-8 w-8 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 17H2" />
              <path d="M6 17V3h12v14" />
              <path d="M4 17l.8-2.4C5.4 13 7 12 8.5 12h7c1.5 0 3.1 1 3.7 2.6L20 17" />
              <path d="M18 6h-6" />
              <path d="M10 6h-2" />
            </svg>
            <div>
              <h3 className="text-content mb-1 text-xl font-bold">
                Real-Time Seat View
              </h3>
              <p className="text-content-light">
                See the actual bus layout and choose your preferred seat
                (window, aisle, front, or back).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/all-tickets"
            className="bg-brand-light font-content text-content inline-block rounded-lg px-10 py-4 text-center shadow transition duration-200"
          >
            Ready for a smooth journey? Start by searching your route now!
          </Link>
        </div>
      </section>
    </>
  );
}
