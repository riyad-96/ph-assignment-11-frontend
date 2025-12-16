import TooltipContent from '@/components/TooltipContent';
import useWindowSize from '@/hooks/useWindowSize';
import { Tooltip } from 'kitzo/react';
import { BsPerson } from 'react-icons/bs';
import { IoTicketOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { TbCoinTaka } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

export default function ClientSidebar() {
  const { screenWidth } = useWindowSize({ delay: 80 });

  return (
    <div className="bg-surface border-brand-light z-1 h-full w-[50px] border-x px-1 transition-[width] md:w-[180px] lg:h-full">
      <div className="sticky top-[57px] pt-4">
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
              to="/dashboard"
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
              to="/dashboard/profile"
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
            content={<TooltipContent content="Booked Tickets" />}
            tooltipOptions={{
              position: 'right',
              hideOnTouch: false,
            }}
            isHidden={screenWidth > 768}
          >
            <NavLink
              to="/dashboard/booked-tickets"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
              }
            >
              <span className="grid size-[26px] shrink-0 place-items-center">
                <IoTicketOutline size="20" />
              </span>
              <span className="text-nowrap max-md:hidden">Booked Tickets</span>
            </NavLink>
          </Tooltip>

          <Tooltip
            content={<TooltipContent content="Transactions" />}
            tooltipOptions={{
              position: 'right',
              hideOnTouch: false,
            }}
            isHidden={screenWidth > 768}
          >
            <NavLink
              to="/dashboard/transactions"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
              }
            >
              <span className="grid size-[26px] shrink-0 place-items-center">
                <TbCoinTaka size="20" />
              </span>
              <span className="text-nowrap max-md:hidden">Transactions</span>
            </NavLink>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
