// export default function Table({ headers, rows }: TablePropsType) {
//   return (
//     <div className="mt-4 w-[clamp(14.75rem,-5.25rem+100vw,42.6875rem)] overflow-x-auto md:w-[clamp(34.625rem,-13.375rem+100vw,67.875rem)]">
//       <div className="border-brand-light bg-surface min-w-[850px] overflow-hidden rounded-xl border">
//         <table
//           border={1}
//           className="w-full cursor-default"
//         >
//           <thead>
//             <tr className="divide-x">
//               {headers.map((header) => (
//                 <th
//                   key={header}
//                   className="border-brand-light bg-brand-light border-b px-4 py-2 text-start font-semibold"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row) => (
//               <tr
//                 key={row[Object.keys(row)[0]]} // Assuming the first key is unique for each row
//                 className="group hover:bg-brand-light/50 divide-x"
//               >
//                 <td className="border-brand-light relative border-t py-2"></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import type { ReactNode, FC } from 'react';

type ChildrenProps = {
  children: ReactNode;
};

const TableContainer: FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="mt-4 w-[clamp(14.75rem,-5.25rem+100vw,42.6875rem)] overflow-x-auto md:w-[clamp(34.625rem,-13.375rem+100vw,67.875rem)]">
      <div className="border-brand-light bg-surface min-w-[850px] overflow-hidden rounded-xl border">
        <table
          border={1}
          className="w-full cursor-default"
        >
          {children}
        </table>
      </div>
    </div>
  );
};

const TableHead: FC<ChildrenProps> = ({ children }) => {
  return <thead>{children}</thead>;
};

const TableBody: FC<ChildrenProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TableRow: FC<ChildrenProps> = ({ children }) => {
  return <tr className="group hover:bg-brand-light/50 divide-x">{children}</tr>;
};

const TableHeaderCell: FC<ChildrenProps> = ({ children }) => {
  return (
    <th className="border-brand-light bg-brand-light border-b px-4 py-2 text-start font-semibold">
      {children}
    </th>
  );
};

const TableDataCell: FC<ChildrenProps> = ({ children }) => {
  return (
    <td className="border-brand-light relative border-t px-4 py-2">
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
