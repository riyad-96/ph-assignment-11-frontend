import DashboardH1 from '@/components/DashboardH1';
import LoadingErrorSection from '@/components/loading_and_errors/LoadingErrorSection';
import Tk from '@/components/Tk';
import { formatPrice } from '@/helpers/helper';
import { serverAPI } from '@/helpers/server';
import useWindowSize from '@/hooks/useWindowSize';
import { useQuery } from '@tanstack/react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ClientDashboardStatsServerResponse = {
  total_bookings: number;
  booking_stat: { [key: string]: number };
  total_transactions: number;
  last_seven_days_expense: number;
  expense_stat: { name: string; value: number }[];
};

const pieColors = [
  { name: 'pending', color: '#ff9900' },
  { name: 'accepted', color: '#34c759' },
  { name: 'rejected', color: '#ff3737' },
  { name: 'paid', color: '#8bc34a' },
];

export default function ClientDashboard() {
  const server = serverAPI(true);

  const {
    data: dashboardStats,
    isLoading: isDashboardStatsLoading,
    error: dashboardStatsError,
  } = useQuery<ClientDashboardStatsServerResponse>({
    queryKey: ['client-dashboard-stats'],
    queryFn: async () => {
      const response = await server.get('/user/dashboard-stats');
      console.log(response.data);
      return response.data;
    },
  });

  const { screenWidth } = useWindowSize({ delay: 50 });

  return (
    <div className="px-3 pb-16">
      <DashboardH1 text="Dashboard" />

      {isDashboardStatsLoading && (
        <div className="text-content-light mt-30 text-center font-medium lg:text-lg">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {dashboardStatsError && (
        <div className="mt-8">
          <LoadingErrorSection />
        </div>
      )}

      {!isDashboardStatsLoading && !dashboardStatsError && dashboardStats && (
        <div className="mt-8 grid-cols-2 gap-4 max-xl:space-y-4 xl:grid">
          {/* Pie chart */}
          <div className="border-content/20 bg-surface space-y-4 rounded-xl border px-4 py-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Booking Stats</h3>
              <span className="font-medium">
                Total: {dashboardStats.total_bookings}
              </span>
            </div>

            {(() => {
              const pieChartData = Object.keys(dashboardStats.booking_stat).map(
                (k) => ({ name: k, value: dashboardStats.booking_stat[k] }),
              );
              console.log(pieChartData);

              return (
                <ResponsiveContainer
                  width={'100%'}
                  height={screenWidth > 768 ? 400 : 300}
                >
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey={'value'}
                      label
                    >
                      {pieChartData.map(({ name }, i) => (
                        <Cell
                          key={`pie-cell-${i}`}
                          fill={pieColors.find((c) => c.name === name)?.color}
                        />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              );
            })()}
          </div>

          <div className="border-content/20 bg-surface space-y-4 rounded-xl border px-4 py-3">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Last 7 days expenses</h3>
                <span className="font-semibold">
                  Total: <Tk />
                  {formatPrice(dashboardStats.last_seven_days_expense)}
                </span>
              </div>
            </div>

            {(() => {
              return (
                <ResponsiveContainer
                  width={'100%'}
                  height={screenWidth > 768 ? 400 : 300}
                >
                  <BarChart data={dashboardStats.expense_stat}>
                    <Bar
                      dataKey={'value'}
                      fill={'#2563eb'}
                    />
                    <XAxis dataKey={'name'} />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray={'3 3'} />
                  </BarChart>
                </ResponsiveContainer>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
