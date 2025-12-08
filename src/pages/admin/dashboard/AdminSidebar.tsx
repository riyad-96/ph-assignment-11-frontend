import { NavLink } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <div className="bg-surface w-[50px] px-1 transition-[width] lg:w-[180px]">
      <div className="sticky top-[57px] pt-4">
        <div className="grid">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              `rounded-md px-2 py-1.5 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/dashboard/profile"
            end
            className={({ isActive }) =>
              `rounded-md px-2 py-1.5 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/admin/dashboard/manage-tickets"
            end
            className={({ isActive }) =>
              `rounded-md px-2 py-1.5 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
            }
          >
            Manage tickets
          </NavLink>
          <NavLink
            to="/admin/dashboard/manage-users"
            end
            className={({ isActive }) =>
              `rounded-md px-2 py-1.5 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
            }
          >
            Manage users
          </NavLink>
          <NavLink
            to="/admin/dashboard/advertise-tickets"
            end
            className={({ isActive }) =>
              `rounded-md px-2 py-1.5 ${isActive ? 'bg-brand-light text-brand' : 'hover:bg-brand-light/70'}`
            }
          >
            Advertise tickets
          </NavLink>
        </div>
      </div>
    </div>
  );
}
