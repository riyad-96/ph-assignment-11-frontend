import TooltipContent from '@/components/TooltipContent';
import useWindowSize from '@/hooks/useWindowSize';
import { Tooltip } from 'kitzo/react';
import { BsPerson } from 'react-icons/bs';
import { HiOutlineBookmark } from 'react-icons/hi';
import { IoTicket, IoTicketOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { TbCoinTaka } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

export default function VendorSidebar() {
  const { screenWidth } = useWindowSize({ delay: 80 });

  return (
    <div className="bg-surface border-brand-light z-1 h-full w-[50px] border-x px-1 transition-[width] md:w-[180px] lg:h-full">
      <div className="sticky top-[57px] py-4">
        <div className="grid">
          <Tooltip
            content={<TooltipContent content="Dashboard" />}
            tooltipOptions={{
              position: 'right',
              hideOnTouch: false,
            }}
            isHidden={screenWidth > 768}
          >
            <NavLink
              to="/vendor/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
              }
            >
              <span className="grid size-[26px] shrink-0 place-items-center">
                <RxDashboard size="20" />
              </span>
              <span className="text-nowrap max-md:hidden">Dashboard</span>
            </NavLink>
          </Tooltip>

          <Tooltip
            content={<TooltipContent content="Profile" />}
            tooltipOptions={{
              position: 'right',
              hideOnTouch: false,
            }}
            isHidden={screenWidth > 768}
          >
            <NavLink
              to="/vendor/dashboard/profile"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
              }
            >
              <span className="grid size-[26px] shrink-0 place-items-center">
                <BsPerson size="20" />
              </span>
              <span className="text-nowrap max-md:hidden">Profile</span>
            </NavLink>
          </Tooltip>

          <Tooltip
            content={<TooltipContent content="Add Tickets" />}
            tooltipOptions={{
              position: 'right',
              hideOnTouch: false,
            }}
            isHidden={screenWidth > 768}
          >
            <NavLink
              to="/vendor/dashboard/add-tickets"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
              }
            >
              <span className="grid size-[26px] shrink-0 place-items-center">
                <IoTicketOutline size="20" />
              </span>
              <span className="text-nowrap max-md:hidden">Add Tickets</span>
            </NavLink>
          </Tooltip>

          <Tooltip
            content={<TooltipContent content="My Tickets" />}
            tooltipOptions={{
              position: 'right',
              hideOnTouch: false,
            }}
            isHidden={screenWidth > 768}
          >
            <NavLink
              to="/vendor/dashboard/my-tickets"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
              }
            >
              <span className="grid size-[26px] shrink-0 place-items-center">
                <IoTicket size="20" />
              </span>
              <span className="text-nowrap max-md:hidden">My Tickets</span>
            </NavLink>
          </Tooltip>

          <Tooltip
            content={<TooltipContent content="Bookings" />}
            tooltipOptions={{
              position: 'right',
              hideOnTouch: false,
            }}
            isHidden={screenWidth > 768}
          >
            <NavLink
              to="/vendor/dashboard/bookings"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
              }
            >
              <span className="grid size-[26px] shrink-0 place-items-center">
                <HiOutlineBookmark size="20" />
              </span>
              <span className="text-nowrap max-md:hidden">Bookings</span>
            </NavLink>
          </Tooltip>

          <Tooltip
            content={<TooltipContent content="Revenue Overview" />}
            tooltipOptions={{
              position: 'right',
              hideOnTouch: false,
            }}
            isHidden={screenWidth > 768}
          >
            <NavLink
              to="/vendor/dashboard/revenue-overview"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
              }
            >
              <span className="grid size-[26px] shrink-0 place-items-center">
                <TbCoinTaka size="20" />
              </span>
              <span className="text-nowrap max-md:hidden">Revenue</span>
            </NavLink>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
