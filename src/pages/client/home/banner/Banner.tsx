import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <div className="relative overflow-hidden">
      <div className="relative -mx-1 h-[clamp(11.25rem,8.3163rem+10.2041vw,17.5rem)]">
        <span className="absolute inset-0 z-1 bg-black/30"></span>
        <video
          src="/banner.mp4"
          autoPlay
          muted
          loop
          className="h-full w-full object-cover object-center"
        ></video>
      </div>

      <div className="absolute inset-0 z-2 flex items-end px-2 text-white md:px-3">
        <div className="mx-auto w-full max-w-[1300px] space-y-2 pb-4 md:pb-8">
          <h1 className="text-2xl tracking-wider drop-shadow-sm drop-shadow-black/50 sm:text-3xl md:text-4xl xl:text-5xl">
            Welcome to <span className="font-semibold">TicketBari!</span>
          </h1>
          <p className="tracking-wider drop-shadow-sm drop-shadow-black/50 max-sm:text-sm lg:text-lg">
            Find Flights, Hotels, Visa & Holidays
          </p>
          <Link
            to="/all-tickets"
            className="bg-brand text-surface rounded-full px-4 py-2 text-sm flex w-fit mt-4 tracking-wider shadow"
          >
            <span className="drop-shadow-xs drop-shadow-black/30">
              Find Tickets
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
