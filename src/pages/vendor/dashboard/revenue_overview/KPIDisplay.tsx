import { formatPrice } from '@/helpers/helper';
import type { KPIData } from '../../types';
import Tk from '@/components/Tk';
import { IoTicketOutline } from 'react-icons/io5';

type KPIDisplayPropsType = {
  data: KPIData[];
};

export default function KPIDisplay({ data }: KPIDisplayPropsType) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      {data.map((d) => (
        <div
          key={d.label}
          className="border-brand-light bg-surface rounded-xl border p-5"
        >
          <h5 className="text-brand text-sm font-medium">{d.label}</h5>
          <p className="text-content mt-1 text-xl font-semibold tracking-wider">
            {d.label === 'Total sales' && (
              <span>
                <Tk /> {formatPrice(d.value)}
              </span>
            )}
            {d.label === 'Total tickets' && (
              <span className="flex items-center gap-1">
                <IoTicketOutline /> {d.value}
              </span>
            )}
            {d.label === 'Total sold tickets' && (
              <span className="flex items-center gap-1">
                <IoTicketOutline /> {d.value}
              </span>
            )}
            {d.label === 'Unsold tickets' && (
              <span className="flex items-center gap-1">
                <IoTicketOutline /> {d.value}
              </span>
            )}
            {d.label === 'Sales percentage' && (
              <span className="flex items-center gap-1">{d.value} %</span>
            )}
            {d.label === 'Average ticket price' && (
              <span className="flex items-center gap-1">
                <Tk /> {formatPrice(d.value)}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
