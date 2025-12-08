import { FaTrainSubway } from 'react-icons/fa6';

type LogoPropsType = {
  onClick?: () => void;
};

export default function Logo({ onClick }: LogoPropsType) {
  return (
    <div className="w-fit text-2xl font-semibold">
      <button
        onClick={onClick}
        className="text-brand flex w-fit items-center gap-1"
      >
        <FaTrainSubway size="22" />
        <span>TicketBari</span>
      </button>
    </div>
  );
}
