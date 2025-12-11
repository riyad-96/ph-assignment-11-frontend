type WarningButtonPropsType = {
  isProcessing: boolean;
  onClick: () => void;
  content: string;
};

export default function WarningButton({
  isProcessing,
  onClick,
  content,
}: WarningButtonPropsType) {
  return (
    <button
      onClick={() => {
        if (isProcessing) return;
        onClick();
      }}
      className="bg-surface h-10 w-[100px] rounded-full border border-red-500 text-red-500 shadow"
    >
      {isProcessing ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <span>{content}</span>
      )}
    </button>
  );
}
