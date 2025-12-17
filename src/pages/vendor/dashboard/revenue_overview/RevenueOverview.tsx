import DashboardH1 from '@/components/DashboardH1';
import { serverAPI } from '@/helpers/server';
import { useQuery } from '@tanstack/react-query';
import StraightAnglePieChart from './charts/PieChart';
import KPIDisplay from './KPIDisplay';
import type { ServerRevenueDataType } from '../../types';
import LoadingErrorSection from '@/components/loading_and_errors/LoadingErrorSection';
import { useAuthContext } from '@/hooks/useAuthContext';
import AccountRestrictedErrorBox from '@/components/AccountRestrictedErrorBox';

export default function RevenueOverview() {
  const server = serverAPI(true);
  const { user } = useAuthContext();

  const {
    data: revenue,
    isLoading: isRevenueLoading,
    error: revenueError,
  } = useQuery<ServerRevenueDataType>({
    queryKey: ['vendor-revenue'],
    queryFn: async () => {
      const response = await server.get('/vendor/revenue');

      return response.data;
    },
    enabled: !user?.isFraud,
  });

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="Revenue Overview" />

      {user?.isFraud ? (
        <AccountRestrictedErrorBox />
      ) : (
        <>
          {isRevenueLoading && (
            <div className="text-content-light mt-30 text-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {revenueError && (
            <div className="mt-8">
              <LoadingErrorSection />
            </div>
          )}
          {!isRevenueLoading &&
            !revenueError &&
            revenue &&
            revenue.kpi_data_raw.total_tickets === 0 && (
              <div className="text-content-light mt-30 text-center font-medium lg:text-lg">
                You have not added any tickets yet.
              </div>
            )}

          {!isRevenueLoading &&
            !revenueError &&
            revenue &&
            revenue.kpi_data_raw.total_tickets > 0 && (
              <div className="mt-8">
                <KPIDisplay data={revenue?.kpi_data} />

                <div className="border-brand-light bg-surface rounded-xl border p-4">
                  <h3 className="text-content mb-4 text-xl font-semibold">
                    Total Sales vs. Inventory
                  </h3>

                  <div className="text-content-light flex w-full items-center justify-center rounded-lg">
                    <StraightAnglePieChart
                      data={[
                        {
                          name: 'Total Tickets',
                          value: revenue.kpi_data_raw.total_tickets,
                        },
                        {
                          name: 'Sold Tickets',
                          value: revenue.kpi_data_raw.total_sold_tickets,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
}
