import DashboardH1 from '@/components/DashboardH1';
import LoadingErrorSection from '@/components/loading_and_errors/LoadingErrorSection';
import { serverAPI } from '@/helpers/server';
import { useAuthContext } from '@/hooks/useAuthContext';
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

type AdminDashboardStatsServerResponse = {
  total_users: number;
  user_stats: { name: string; value: number }[];
  total_tickets: number;
  ticket_stats: { name: string; value: number }[];
};

const pieColors = { user: '#94a3b8', admin: '#ff9900', vendor: '#5b8ff9' };

export default function AdminDashboard() {
  const server = serverAPI(true);
  const { theme } = useAuthContext();

  const {
    data: dashboardStats,
    isLoading: isDashboardStatsLoading,
    error: dashboardStatsError,
  } = useQuery<AdminDashboardStatsServerResponse>({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const response = await server.get('/admin/dashboard-stats');
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
              <h3 className="text-lg font-medium">User Stats</h3>
              <span className="font-medium">
                Total: {dashboardStats.total_users}
              </span>
            </div>
            <ResponsiveContainer
              width={'100%'}
              height={screenWidth > 768 ? 400 : 300}
            >
              <PieChart>
                <Pie
                  data={dashboardStats.user_stats}
                  dataKey={'value'}
                  stroke={theme === 'light' ? 'white' : '#1e293b'}
                  label
                >
                  {dashboardStats.user_stats.map(({ name }, i) => (
                    <Cell
                      key={`pie-cell-${i}`}
                      fill={
                        name === 'User'
                          ? pieColors.user
                          : name === 'Admin'
                            ? pieColors.admin
                            : name === 'Vendor'
                              ? pieColors.vendor
                              : '#ff0050'
                      }
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="border-brand-light bg-surface space-y-4 rounded-xl border px-4 py-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Ticket Stats</h3>
              <span className="font-semibold">
                Total: {dashboardStats.total_tickets}
              </span>
            </div>

            <ResponsiveContainer
              width={'100%'}
              height={screenWidth > 768 ? 400 : 300}
            >
              <BarChart data={dashboardStats.ticket_stats}>
                <Bar
                  dataKey={'value'}
                  radius={[10, 10, 0, 0]}
                >
                  {dashboardStats.ticket_stats.map(({ name }, i) => (
                    <Cell
                      key={`bar-cell-${i}`}
                      fill={
                        name === 'Pending'
                          ? '#ff9900'
                          : name === 'Approved'
                            ? '#00d492'
                            : '#ff0050'
                      }
                    />
                  ))}
                </Bar>
                <XAxis dataKey={'name'} />
                <YAxis width="auto" />
                <Tooltip />
                <CartesianGrid strokeDasharray={'3 3'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
