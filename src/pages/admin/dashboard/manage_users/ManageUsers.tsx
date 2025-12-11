import DashboardH1 from '@/components/DashboardH1';
import { serverAPI } from '@/helpers/server';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User } from '@/contexts/authContext.type';
import { useMemo, useState } from 'react';
import { toast, Tooltip } from 'kitzo/react';
import { AnimatePresence, motion } from 'motion/react';
import { TbTool } from 'react-icons/tb';
import useClosePopup from '@/hooks/useClosePopup';
import Modal from '@/components/ticket_cards/modal/Modal';
import { useAuthContext } from '@/hooks/useAuthContext';
import InfoPill from '@/components/InfoPill';
import LoadingDataLengthErrors from '@/components/loading_and_errors/LoadingDataLengthErrors';

type ChangeRolePropsType = {
  _id: string;
  name: string;
  currentRole: string;
  changingRoleTo: string;
};

type UpdateRolePayload = {
  id: string;
  role: string;
};
type UpdateIsFraudPayload = {
  id: string;
  isFraud: boolean;
};

export default function ManageUsers() {
  const server = serverAPI(true);
  const queryClient = useQueryClient();
  const { setUser } = useAuthContext();

  const {
    data: users,
    isPending: isUsersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ['admin-manage_users'],
    queryFn: async (): Promise<User[]> => {
      const response = await server.get('/admin/get-user-data');
      return response.data;
    },
  });

  const info = useMemo(() => {
    const total = users?.length;
    const adminCount = users?.filter((u) => u.role === 'admin').length;
    const vendorCount = users?.filter((u) => u.role === 'vendor').length;
    const userCount = users?.filter((u) => u.role === 'user').length;

    return { total, adminCount, vendorCount, userCount };
  }, [users]);

  const [changeRole, setChangeRole] = useState<ChangeRolePropsType | null>(
    null,
  );

  // update role
  const { mutate: updateRole, isPending: updatingRole } = useMutation({
    mutationFn: async ({ id, role }: UpdateRolePayload) => {
      const response = await server.patch('/admin/update-role', {
        id,
        role,
      });
      return response.data;
    },
    onSuccess: (value) => {
      queryClient.invalidateQueries({ queryKey: ['admin-manage_users'] });
      toast.success('Role successfully updated');
      setChangeRole(null);
      setUser(value);
    },
    onError: () => {
      toast.error("Couldn't update role");
    },
  });

  // toggle is fraud
  const { mutate: updateIsFraud, isPending: updatingIsFraud } = useMutation({
    mutationFn: async ({ id, isFraud }: UpdateIsFraudPayload) => {
      const response = await server.patch('/admin/update-is-fraud', {
        id,
        isFraud,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-manage_users'] });
      toast.success('Fraud status successfully updated');
    },
    onError: () => {
      toast.error("Couldn't update fraud status");
    },
  });

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="Manage Users" />

      <LoadingDataLengthErrors
        isLoading={isUsersLoading}
        error={usersError}
        dataLength={users?.length}
        emptyMessage="No users found."
      />

      {!isUsersLoading && !usersError && users && users.length > 0 && (
        <div className="mt-8">
          <div className="">
            <div className="flex flex-wrap gap-1 max-md:text-sm">
              <InfoPill
                infoTitle="Total users"
                info={info.total}
              />
              <InfoPill
                infoTitle="Admin"
                info={info.adminCount}
              />
              <InfoPill
                infoTitle="Vendor"
                info={info.vendorCount}
              />
              <InfoPill
                infoTitle="User"
                info={info.userCount}
              />
            </div>

            <div className="mt-4 w-[clamp(14.75rem,-5.25rem+100vw,42.6875rem)] overflow-x-auto md:w-[clamp(34.625rem,-13.375rem+100vw,67.875rem)]">
              <div className="border-brand-light bg-surface min-w-[850px] overflow-hidden rounded-xl border">
                <table
                  border={1}
                  className="w-full cursor-default"
                >
                  <thead>
                    <tr className="divide-x">
                      <th className="border-brand-light bg-brand-light border-b px-4 py-2 text-start font-semibold">
                        User
                      </th>
                      <th className="border-brand-light bg-brand-light border-b px-4 py-2 text-start font-semibold">
                        Email
                      </th>
                      <th className="border-brand-light bg-brand-light border-b px-4 py-2 text-center font-semibold">
                        Change roles
                      </th>
                      <th className="border-brand-light bg-brand-light border-b px-4 py-2 text-center font-semibold">
                        Is fraud
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <TableRow
                        key={u._id}
                        u={u}
                        i={i}
                        setChangeRole={setChangeRole}
                        updateIsFraud={updateIsFraud}
                        updatingIsFraud={updatingIsFraud}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {changeRole && (
          <Modal
            closeFn={() => setChangeRole(null)}
            className="bg-surface w-full max-w-[500px] rounded-xl p-4 shadow-md"
          >
            <h2 className="mb-4 text-xl font-medium lg:text-2xl">
              Change Role!
            </h2>

            <div>
              User name:{' '}
              <span className="font-medium">
                '{changeRole.name || 'Unknown username'}'
              </span>
            </div>

            <div className="">
              Changing:{' '}
              <span>
                <span className="bg-brand-light rounded-md px-1 text-sm font-medium">
                  {changeRole.currentRole}
                </span>{' '}
                to{' '}
                <span className="bg-brand-light rounded-md px-1 text-sm font-medium">
                  {changeRole.changingRoleTo}
                </span>
              </span>
            </div>

            <p className="py-4 text-sm tracking-wide">
              {getRoleBasedWarningText(
                changeRole.currentRole,
                changeRole.changingRoleTo,
              )}
            </p>

            <div className="flex justify-end gap-1">
              <button
                onClick={() => setChangeRole(null)}
                className="bg-brand-light border-brand-light h-10 w-[100px] rounded-full border shadow"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  updateRole({
                    id: changeRole._id,
                    role: changeRole.changingRoleTo,
                  })
                }
                className="bg-surface h-10 w-[100px] rounded-full border border-red-500 text-red-500 shadow"
              >
                {updatingRole ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <span>Change</span>
                )}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function getRoleBasedWarningText(currentRole: string, changingRoleTo: string) {
  currentRole = currentRole.toLowerCase();
  changingRoleTo = changingRoleTo.toLowerCase();

  if (currentRole === 'user' && changingRoleTo === 'admin') {
    return `Are you sure you want to change this user's role to Administrator? This grants them full, unrestricted access and management power over the entire system.`;
  }
  if (currentRole === 'user' && changingRoleTo === 'vendor') {
    return `Are you sure you want to change this user's role to Vendor? This grants them access to product management, inventory, and sales features.`;
  }
  if (currentRole === 'vendor' && changingRoleTo === 'user') {
    return `Are you sure you want to downgrade this user to the standard User role? They will lose all access to vendor-specific features like product and inventory management.`;
  }
  if (currentRole === 'vendor' && changingRoleTo === 'admin') {
    return `Are you sure you want to change this vendor's role to Administrator? They will gain full system control in addition to their current vendor privileges.`;
  }
  if (currentRole === 'admin' && changingRoleTo === 'vendor') {
    return `Are you sure you want to demote this user from Administrator to Vendor? They will lose all system management rights but retain access to product and sales features.`;
  }
  if (currentRole === 'admin' && changingRoleTo === 'user') {
    return `Are you sure you want to revoke Administrator privileges for this user? They will lose all system management and administrative access immediately.`;
  }
}

type TablePropsType = {
  u: User;
  i: number;
  setChangeRole: React.Dispatch<
    React.SetStateAction<ChangeRolePropsType | null>
  >;
  updateIsFraud: ({ id, isFraud }: { id: string; isFraud: boolean }) => void;
  updatingIsFraud: boolean;
};

function TableRow({
  u,
  i,
  setChangeRole,
  updateIsFraud,
  updatingIsFraud,
}: TablePropsType) {
  const { _id, email, isFraud, name, photoURL, role } = u;
  const { user } = useAuthContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useClosePopup({
    isOpen: isMenuOpen,
    onClose: () => {
      setIsMenuOpen(false);
    },
    ignoredSelectors: [`.role-change-menu-open-btn-${i}`],
  });

  return (
    <tr
      key={_id}
      className={`group hover:bg-brand-light/50 divide-x ${user?._id === _id ? 'bg-brand-light/30' : ''}`}
    >
      <td className="border-brand-light relative overflow-hidden border-t py-2">
        <div className="flex items-center gap-3 px-4">
          <span>{i + 1}.</span>
          <div className="size-8 overflow-hidden rounded-full shadow-xs">
            <img
              className="size-full object-cover object-center"
              src={photoURL}
              alt={`${name} profile image`}
            />
          </div>
          <div className="grid gap-0.5">
            <span className="line-clamp-1 text-sm leading-4 font-semibold">
              {name}
              {user?._id === _id && (
                <span className="bg-brand text-surface pointer-events-none absolute top-0 left-0 flex size-[30px] -translate-1/2 -rotate-45 items-end justify-center px-1 text-xs font-light tracking-wider select-none"></span>
              )}
            </span>
            <span
              className={`bg-ac w-fit rounded-md px-1 text-xs leading-4 ${role === 'user' ? 'bg-brand-light' : role === 'admin' ? 'bg-action' : 'bg-emerald-400'}`}
            >
              {role}
            </span>
          </div>
        </div>
      </td>
      <td className="border-brand-light border-t">
        <div className="px-4">
          <Tooltip
            tooltipOptions={{
              offset: 5,
              position: 'top-start',
            }}
            content={
              <span className="bg-content text-surface rounded-sm px-1.5 py-1 text-xs tracking-wide shadow-md">
                {email}
              </span>
            }
          >
            <span className="text-content-light text-sm tracking-wide">
              {email}
            </span>
          </Tooltip>
        </div>
      </td>
      <td className="border-brand-light border-t pl-4">
        {user?.email !== email && (
          <div className="relative">
            <Tooltip
              tooltipOptions={{
                smartHover: false,
              }}
              content={
                <span className="bg-content text-surface rounded-sm px-1.5 py-1 text-xs tracking-wide text-nowrap shadow-md">
                  Change role
                </span>
              }
            >
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`role-change-menu-open-btn-${i} hover:text-brand text-content-light group-hover:bg-surface grid size-8 place-items-center rounded-full`}
              >
                <span>
                  <TbTool size="20" />
                </span>
              </button>
            </Tooltip>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={menuRef}
                  className="bg-surface divide-brand-light absolute bottom-0 left-0 grid max-w-fit origin-bottom-left divide-y overflow-hidden rounded-md text-sm shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                >
                  {role === 'user' ? (
                    <>
                      <button
                        onClick={() => {
                          setChangeRole({
                            _id,
                            currentRole: role,
                            name,
                            changingRoleTo: 'admin',
                          });
                          setIsMenuOpen(false);
                        }}
                        className="hover:bg-brand-light/60 px-3 py-1.5 font-medium"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => {
                          setChangeRole({
                            _id,
                            currentRole: role,
                            name,
                            changingRoleTo: 'vendor',
                          });
                          setIsMenuOpen(false);
                        }}
                        className="hover:bg-brand-light/60 px-3 py-1.5 font-medium"
                      >
                        make vendor
                      </button>
                    </>
                  ) : role === 'admin' ? (
                    <>
                      <button
                        onClick={() => {
                          setChangeRole({
                            _id,
                            currentRole: role,
                            name,
                            changingRoleTo: 'vendor',
                          });
                          setIsMenuOpen(false);
                        }}
                        className="hover:bg-brand-light/60 px-3 py-1.5 font-medium"
                      >
                        Make Vendor
                      </button>
                      <button
                        onClick={() => {
                          setChangeRole({
                            _id,
                            currentRole: role,
                            name,
                            changingRoleTo: 'user',
                          });
                          setIsMenuOpen(false);
                        }}
                        className="hover:bg-brand-light/60 px-3 py-1.5 font-medium"
                      >
                        Make User
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setChangeRole({
                            _id,
                            currentRole: role,
                            name,
                            changingRoleTo: 'admin',
                          });
                          setIsMenuOpen(false);
                        }}
                        className="hover:bg-brand-light/60 px-3 py-1.5 font-medium"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => {
                          setChangeRole({
                            _id,
                            currentRole: role,
                            name,
                            changingRoleTo: 'user',
                          });
                          setIsMenuOpen(false);
                        }}
                        className="hover:bg-brand-light/60 px-3 py-1.5 font-medium"
                      >
                        Make User
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <div></div>
          </div>
        )}
      </td>
      <td className="border-brand-light border-t">
        <div className="grid size-full place-items-center">
          {role === 'vendor' && (
            <button
              onClick={() => {
                if (updatingIsFraud) return;
                updateIsFraud({ id: _id, isFraud: !isFraud });
              }}
              className={`group relative h-5 w-10 rounded-full outline-2 transition-colors ${isFraud ? 'bg-red-500 outline-red-500' : 'bg-brand-light outline-brand-light'}`}
            >
              <span
                className={`absolute top-0 left-0 z-1 h-full w-1/2 rounded-full bg-white transition-transform group-active:scale-90 ${isFraud ? 'translate-x-1/1' : 'translate-x-0'}`}
              ></span>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
