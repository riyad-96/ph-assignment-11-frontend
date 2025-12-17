import DashboardH1 from '@/components/DashboardH1';
import LoadingErrorSection from '@/components/loading_and_errors/LoadingErrorSection';
import Tk from '@/components/Tk';
import { formatPrice } from '@/helpers/helper';
import { serverAPI } from '@/helpers/server';
import { useAuthContext } from '@/hooks/useAuthContext';
import useWindowSize from '@/hooks/useWindowSize';
import { useQuery } from '@tanstack/react-query';
import {
  Area,
  AreaChart,
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

type VendorDashboardStatsServerResponse = {
  last_week_transactions: number;
  last_week_revenue: number;
  last_week_stats: { name: string; value: number }[];
  total_bookings: number;
  booking_stats: { [key: string]: number };
};

const pieColors = [
  { name: 'pending', color: '#ff9900' },
  { name: 'accepted', color: '#34c759' },
  { name: 'rejected', color: '#ff3737' },
  { name: 'paid', color: '#8bc34a' },
];

export default function VendorDashboard() {
  const server = serverAPI(true);
  const { theme } = useAuthContext();

  const {
    data: dashboardStats,
    isLoading: isDashboardStatsLoading,
    error: dashboardStatsError,
  } = useQuery<VendorDashboardStatsServerResponse>({
    queryKey: ['vendor-dashboard-stats'],
    queryFn: async () => {
      const response = await server.get('/vendor/dashboard-stats');
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
          <div className="border-brand-light bg-surface space-y-4 rounded-xl border px-4 py-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Booking Stats</h3>
              <span className="font-medium">
                Total: {dashboardStats.total_bookings}
              </span>
            </div>

            {(() => {
              const pieChartData = Object.keys(
                dashboardStats.booking_stats,
              ).map((k) => ({
                name: k,
                value: dashboardStats.booking_stats[k],
              }));
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

          {/* Area chart */}
          <div className="border-brand-light bg-surface space-y-4 rounded-xl border px-4 py-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Last week revenue</h3>
              <span className="font-semibold">
                Total: <Tk />
                {formatPrice(dashboardStats.last_week_revenue)}
              </span>
            </div>

            <ResponsiveContainer
              width={'100%'}
              height={screenWidth > 768 ? 400 : 300}
            >
              <AreaChart data={dashboardStats.last_week_stats}>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={theme === 'light' ? '#2563eb' : '#5b8ff9'}
                  fill={theme === 'light' ? '#2563eb' : '#5b8ff9'}
                />
                <XAxis dataKey="name" />
                <YAxis width="auto" />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
