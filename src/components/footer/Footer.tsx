import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { BsStripe } from 'react-icons/bs';
import { Tooltip } from 'kitzo/react';

export default function Footer() {
  return (
    <footer className="bg-brand-light px-2 pt-8 md:px-3">
      <div className="mx-auto max-w-[1300px]">
        <div className="max-lg:space-y-4 lg:flex">
          <div className="flex-1 max-md:space-y-4 md:flex">
            <div className="flex-1">
              <div className="origin-left scale-80">
                <Logo
                  onClick={() => {
                    const target = document.querySelector('.main-scroller');
                    target?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
              <p className="text-content-light text-sm">
                Book bus, train, launch & flight tickets easily
              </p>
            </div>

            <div className="grid flex-1">
              <Link
                to="/"
                children="Home"
                className="text-content-light hover:text-brand w-fit py-1"
              />
              <Link
                to="/all-tickets"
                children="All Tickets"
                className="text-content-light hover:text-brand w-fit py-1"
              />
              <Link
                to="/dashboard"
                children="Dashboard"
                className="text-content-light hover:text-brand w-fit py-1"
              />
            </div>
          </div>

          <div className="flex-1 max-md:space-y-4 md:flex">
            <div className="flex-1">
              <h4 className="mb-2 font-semibold">Contacts</h4>
              <div className="text-content-light">
                Email:{' '}
                <button className="hover:text-brand">example@email.com</button>
              </div>
              <div className="text-content-light">
                Phone:{' '}
                <button className="hover:text-brand">+8801000-000000</button>
              </div>
              <div className="text-content-light">
                Page:{' '}
                <button className="hover:text-brand">facebook.com/page</button>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="mb-2 font-semibold">Payment method</h4>
              <Tooltip
                content={
                  <span className="rounded-md bg-[#635bff] px-2 py-0.5 text-sm text-white">
                    Stripe
                  </span>
                }
                tooltipOptions={{
                  offset: 4,
                  position: 'right-start',
                }}
              >
                <a
                  href="https://stripe.com"
                  target="_blank"
                  className="grid w-fit rounded-md bg-white text-[#635bff]"
                >
                  <BsStripe size="30" />
                </a>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="pt-12 pb-6">
          <p className="text-content-light text-center text-xs">
            © 2025 TicketBari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
