import CancelButton from '@/components/buttons/CancelButton';
import Modal from './Modal';
import WarningButton from '@/components/buttons/WarningButton';
import type { ReactNode } from 'react';

type QuickActionModalPropsType = {
  closeFn: () => void;
  title: ReactNode;
  description: ReactNode;
  closeBtnText: string;
  actionBtnText: string;
  actionBtnFn: () => void;
  isProcessing: boolean;
};

export default function QuickActionModal({
  closeFn,
  title,
  description,
  closeBtnText,
  actionBtnText,
  actionBtnFn,
  isProcessing,
}: QuickActionModalPropsType) {
  return (
    <Modal
      closeFn={closeFn}
      className="bg-surface w-full max-w-[450px] space-y-4 rounded-2xl p-4 shadow-lg"
    >
      <h4 className="text-xl font-semibold md:text-2xl">{title}</h4>
      <p>{description}</p>
      <div className="flex justify-end gap-2">
        <CancelButton
          type="button"
          content={closeBtnText}
          closeFn={closeFn}
        />
        <WarningButton
          isProcessing={isProcessing}
          content={actionBtnText}
          onClick={actionBtnFn}
        />
      </div>
    </Modal>
  );
}
