import { AnimatePresence } from 'motion/react';
import Modal from './modal/Modal';
import { useAuthContext } from '@/hooks/useAuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/configs/firebase.config';
import { useQueryClient } from '@tanstack/react-query';

export default function LogoutPopup() {
  const { isLoggingOut, setIsLoggingOut } = useAuthContext();
  const queryClient = useQueryClient();

  return (
    <AnimatePresence>
      {isLoggingOut && (
        <Modal
          className="bg-surface w-full max-w-[350px] rounded-xl py-4 shadow-md"
          closeFn={() => setIsLoggingOut(false)}
        >
          <h2 className="border-b-content/10 border-b px-4 pb-2 text-lg font-semibold md:text-xl">
            Log out?
          </h2>

          <div className="mt-3 space-y-4 px-4">
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsLoggingOut(false)}
                className="bg-brand-light rounded-full px-5 py-1.5 shadow"
              >
                Cancel
              </button>
              <button
                className="bg-surface rounded-full border border-red-400 px-5 py-1.5 text-red-500 shadow dark:text-red-400"
                onClick={() => {
                  signOut(auth);
                  setIsLoggingOut(false);
                  queryClient.invalidateQueries();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
