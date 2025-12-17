import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
  const [videoStatus, setVideoStatus] = useState<
    'loading' | 'loaded' | 'failed'
  >('loading');

  return (
    <div className="relative overflow-hidden">
      <div className="relative -mx-1 h-[clamp(11.25rem,8.3163rem+10.2041vw,17.5rem)]">
        <span className="absolute inset-0 z-3 bg-black/30"></span>
        <div className="absolute inset-0 z-1">
          <img
            src={'/banner-loader-low-res.png'}
            alt="banner loader placeholder"
            className="size-full object-cover object-center brightness-150"
          />
        </div>
        <video
          onLoadedData={() => setVideoStatus('loaded')}
          src="/banner.mp4"
          autoPlay
          muted
          loop
          className={`relative z-2 h-full w-full object-cover object-center transition-opacity duration-1000 ${videoStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        ></video>
      </div>

      <div className="absolute inset-0 z-5 flex items-end px-2 text-white md:px-3">
        <div className="mx-auto w-full max-w-[1300px] pb-4 max-md:text-center md:space-y-2 md:pb-8">
          <h1 className="text-2xl tracking-wider drop-shadow-sm drop-shadow-black/50 sm:text-3xl md:text-4xl xl:text-5xl">
            Welcome to <span className="font-semibold">TicketBari!</span>
          </h1>
          <p className="tracking-wider drop-shadow-sm drop-shadow-black/50 max-sm:text-sm lg:text-lg">
            Find Flights, Hotels, Visa & Holidays
          </p>
          <Link
            to="/all-tickets"
            className="bg-brand mt-4 flex w-fit rounded-full px-4 py-2 text-sm tracking-wider text-white shadow max-md:mx-auto"
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
