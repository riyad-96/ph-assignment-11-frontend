import { BsPerson } from 'react-icons/bs';
import { IoTicketOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { TbCoinTaka } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

export default function ClientSidebar() {
  return (
    <div className="bg-surface pointer-events-auto relative h-full w-[50px] px-1 transition-[width] lg:h-full lg:w-[180px]">
      <div className="sticky top-[57px] pt-4">
        <div className="grid">
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
            <span className="text-nowrap max-lg:hidden">Dashboard</span>
          </NavLink>
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
            <span className="text-nowrap max-lg:hidden">Profile</span>
          </NavLink>
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
            <span className="text-nowrap max-lg:hidden">Booked Tickets</span>
          </NavLink>
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
            <span className="text-nowrap max-lg:hidden">Transactions</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
