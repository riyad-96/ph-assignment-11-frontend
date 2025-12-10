import { Tooltip } from 'kitzo/react';
import TooltipContent from '../TooltipContent';

type CheckboxPropsType = {
  checkboxName: string;
  options: { value: string; tip: string }[];
};

export default function Checkbox({
  checkboxName,
  options,
  ...rest
}: CheckboxPropsType) {
  if (!options)
    return (
      <span className="text-xs text-red-500">
        ! Options prop is required on checkbox input {'<Checkbox />'}
      </span>
    );

  return (
    <div className="grid gap-1">
      <span className="pl-1">Perks</span>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Tooltip
            key={`${checkboxName} ${option.value}`}
            content={<TooltipContent content={option.tip} />}
            tooltipOptions={{
              smartHover: false,
              hideOnTouch: false,
            }}
          >
            <div>
              <input
                id={option.value}
                type="checkbox"
                name={checkboxName}
                value={option.value}
                className="peer block size-0 overflow-hidden"
                {...rest}
              />
              <label
                htmlFor={option.value}
                className="hover:border-brand/60 border-brand/20 bg-surface peer-checked:bg-brand peer-checked:text-surface peer-checked:border-brand ring-brand/20 grid w-fit rounded-full border px-3 py-1 text-xs tracking-wider ring-0 transition-[border-color,box-shadow] select-none peer-focus-within:ring-3 active:scale-98 pointer-fine:cursor-pointer"
              >
                {option.value}
              </label>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
