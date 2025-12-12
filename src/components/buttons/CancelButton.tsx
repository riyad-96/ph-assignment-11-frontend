type CancelButtonPropsType = {
  closeFn: () => void;
  content: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export default function CancelButton({
  closeFn,
  content,
  type,
  className,
}: CancelButtonPropsType) {
  return (
    <button
      onClick={closeFn}
      type={type}
      className={`bg-brand-light border-brand-light rounded-full border shadow ${className !== undefined ? className : 'h-10 w-[100px]'}`}
    >
      {content}
    </button>
  );
}
