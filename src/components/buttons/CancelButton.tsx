type CancelButtonPropsType = {
  closeFn: () => void;
  content: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function CancelButton({
  closeFn,
  content,
  type,
}: CancelButtonPropsType) {
  return (
    <button
      onClick={closeFn}
      type={type}
      className="bg-brand-light border-brand-light h-10 w-[100px] rounded-full border shadow"
    >
      {content}
    </button>
  );
}
