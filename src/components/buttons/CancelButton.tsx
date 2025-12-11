type CancelButtonPropsType = {
  closeFn: () => void;
  content: string;
};

export default function CancelButton({
  closeFn,
  content,
}: CancelButtonPropsType) {
  return (
    <button
      onClick={closeFn}
      className="bg-brand-light border-brand-light h-10 w-[100px] rounded-full border shadow"
    >
      {content}
    </button>
  );
}
