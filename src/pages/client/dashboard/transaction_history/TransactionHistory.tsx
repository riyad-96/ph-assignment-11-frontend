import DashboardH1 from '@/components/DashboardH1';
import LoadingDataLengthErrors from '@/components/loading_and_errors/LoadingDataLengthErrors';
import Table from '@/components/Table';
import Tk from '@/components/Tk';
import TooltipContent from '@/components/TooltipContent';
import { formatPrice } from '@/helpers/helper';
import { serverAPI } from '@/helpers/server';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import kitzo from 'kitzo';
import { toast, Tooltip } from 'kitzo/react';
import { IoCopyOutline } from 'react-icons/io5';

type Transaction = {
  transaction_id: string;
  amount: number;
  ticket_title: string;
  payment_date: string;
};

export default function TransactionHistory() {
  const server = serverAPI(true);

  const {
    data: transactionHistory,
    isLoading: isLoadingTransactionHistory,
    error: transactionHistoryError,
  } = useQuery<Transaction[]>({
    queryKey: ['transaction-history'],
    queryFn: async () => {
      const response = await server.get('/user/transaction-history');
      return response.data;
    },
  });

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="Transaction History" />

      <div className="mt-8">
        <LoadingDataLengthErrors
          emptyMessage="No transaction history found"
          dataLength={transactionHistory?.length}
          isLoading={isLoadingTransactionHistory}
          error={transactionHistoryError}
        />

        {!transactionHistoryError &&
          !isLoadingTransactionHistory &&
          transactionHistory &&
          transactionHistory.length > 0 && (
            <Table>
              <Table.head>
                <Table.tr>
                  <Table.th>Transaction ID</Table.th>
                  <Table.th>Amount</Table.th>
                  <Table.th>Ticket title</Table.th>
                  <Table.th>Payment Date</Table.th>
                </Table.tr>
              </Table.head>

              <Table.body>
                {transactionHistory.map((t) => (
                  <Table.tr
                    key={t.transaction_id}
                    className="group"
                  >
                    <Table.td>
                      <div className="flex items-center justify-between gap-1 text-sm">
                        <span>{t.transaction_id}</span>
                        <Tooltip
                          content={<TooltipContent content="Copy" />}
                          tooltipOptions={{
                            smartHover: false,
                          }}
                        >
                          <button
                            onClick={() => {
                              kitzo.copy(t.transaction_id);
                              toast.success('Copied to clipboard');
                            }}
                            className="group-hover:bg-surface bg-brand-light grid size-[30px] place-items-center rounded-full"
                          >
                            <IoCopyOutline />
                          </button>
                        </Tooltip>
                      </div>
                    </Table.td>

                    <Table.td>
                      <Tk />
                      {formatPrice(t.amount)}
                    </Table.td>

                    <Table.td>{t.ticket_title}</Table.td>

                    <Table.td>
                      {format(t.payment_date, 'dd MMM y, hh:mm a')}
                    </Table.td>
                  </Table.tr>
                ))}
              </Table.body>
            </Table>
          )}
      </div>
    </div>
  );
}
