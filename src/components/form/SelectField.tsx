import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type SelectFieldPropsType = {
  id: string;
  label: string;
  error: string | null | undefined;
  options: {
    label: string;
    value: string;
  }[];
  title?: string;
};

export default function SelectField({
  id,
  label,
  error,
  options,
  title,
  ...rest
}: SelectFieldPropsType) {
  return (
    <div className="grid gap-1.5">
      <label
        className="w-fit pl-1"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="group relative">
        <select
          id={id}
          className="hover:border-brand/60 border-brand/20 bg-surface focus:border-brand ring-brand/20 w-full min-w-0 appearance-none rounded-full border px-4 py-2 shadow-xs ring-0 transition-[border-color,box-shadow] outline-none focus:ring-3"
          {...rest}
        >
          <option
            value=""
            disabled
          >
            Select {title}
          </option>
          {options.map((o) => (
            <option
              key={o.value}
              value={o.value}
            >
              {o.label}
            </option>
          ))}
        </select>
        <span className="group-hover:text-content text-content-light pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
          <MdOutlineKeyboardArrowDown size="20" />
        </span>
      </div>

      <span
        className={`block overflow-hidden pl-2 text-sm text-red-500 transition-[height] ${error ? 'h-5' : 'h-0'}`}
      >
        {error}
      </span>
    </div>
  );
}
