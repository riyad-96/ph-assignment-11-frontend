import type { ReactNode } from 'react';

type TableProps = {
  children?: ReactNode;
  className?: string;
};

const TableContainer = ({ children, className }: TableProps) => {
  return (
    <div className="mt-4 w-[clamp(14.75rem,-5.25rem+100vw,42.6875rem)] overflow-x-auto md:w-[clamp(34.625rem,-13.375rem+100vw,67.875rem)]">
      <div className="border-brand-light bg-surface min-w-[850px] overflow-hidden rounded-xl border">
        <table
          border={1}
          className={`w-full cursor-default ${className}`}
        >
          {children}
        </table>
      </div>
    </div>
  );
};

const TableHead = ({ children, className }: TableProps) => {
  return <thead className={`${className}`}>{children}</thead>;
};

const TableBody = ({ children, className }: TableProps) => {
  return <tbody className={`${className}`}>{children}</tbody>;
};

const TableRow = ({ children, className }: TableProps) => {
  return (
    <tr className={`group hover:bg-brand-light/50 divide-x ${className}`}>
      {children}
    </tr>
  );
};

const TableHeaderCell = ({ children, className }: TableProps) => {
  return (
    <th
      className={`border-brand-light bg-brand-light border-b px-4 py-2 text-start font-semibold ${className}`}
    >
      {children}
    </th>
  );
};

const TableDataCell = ({ children, className }: TableProps) => {
  return (
    <td
      className={`border-brand-light relative border-t px-4 py-2 ${className}`}
    >
      {children}
    </td>
  );
};

const Table = Object.assign(TableContainer, {
  head: TableHead,
  body: TableBody,
  tr: TableRow,
  th: TableHeaderCell,
  td: TableDataCell,
});

export default Table;
