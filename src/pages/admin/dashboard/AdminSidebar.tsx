import { BsPerson, BsPersonGear } from 'react-icons/bs';
import { IoTicketOutline } from 'react-icons/io5';
import { RxDashboard, RxSpeakerLoud } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <div className="bg-surface border-brand-light h-full w-[50px] border-x px-1 transition-[width] md:w-[180px] lg:h-full">
      <div className="sticky top-[57px] pt-4">
        <div className="grid">
          <NavLink
            to="/admin/dashboard"
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
            to="/admin/dashboard/profile"
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
            to="/admin/dashboard/manage-tickets"
            end
            className={({ isActive }) =>
              `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
            }
          >
            <span className="grid size-[26px] shrink-0 place-items-center">
              <IoTicketOutline size="20" />
            </span>
            <span className="text-nowrap max-md:hidden">Manage tickets</span>
          </NavLink>
          <NavLink
            to="/admin/dashboard/manage-users"
            end
            className={({ isActive }) =>
              `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
            }
          >
            <span className="grid size-[26px] shrink-0 place-items-center">
              <BsPersonGear size="20" />
            </span>
            <span className="text-nowrap max-md:hidden">Manage Users</span>
          </NavLink>
          <NavLink
            to="/admin/dashboard/advertise-tickets"
            end
            className={({ isActive }) =>
              `flex items-center gap-1 rounded-md px-2 py-2 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
            }
          >
            <span className="grid size-[26px] shrink-0 place-items-center">
              <RxSpeakerLoud size="20" />
            </span>
            <span className="text-nowrap max-md:hidden">Advertise tickets</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
