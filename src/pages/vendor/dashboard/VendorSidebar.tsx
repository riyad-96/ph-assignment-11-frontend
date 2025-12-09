import { BsPerson } from 'react-icons/bs';
import { HiOutlineBookmark } from 'react-icons/hi';
import { IoTicket, IoTicketOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import { TbCoinTaka } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

export default function VendorSidebar() {
  return (
    <div className="bg-surface h-full w-[50px] px-1 transition-[width] lg:h-full md:w-[180px]">
      <div className="sticky top-[57px] pt-4">
        <div className="grid">
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
        </div>
      </div>
    </div>
  );
}
