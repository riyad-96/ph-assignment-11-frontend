import { useAuthContext } from '@/hooks/useAuthContext';
import useWindowSize from '@/hooks/useWindowSize';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// #region Sample data

type StraightAnglePieChartProps = {
  isAnimationActive?: boolean;
  data: { name: string; value: number }[];
};

const pieColors: { [key: string]: string } = {
  'Total Tickets': '#ffb900',
  'Sold Tickets': '#00d492',
};

// #endregion
export default function StraightAnglePieChart({
  data,
}: StraightAnglePieChartProps) {
  const { screenWidth } = useWindowSize();
  const { theme } = useAuthContext();

  return (
    <ResponsiveContainer
      width={'100%'}
      height={screenWidth > 768 ? 400 : 300}
    >
      <PieChart dataKey="value">
        <Pie
          data={data}
          dataKey={'value'}
          label
          stroke={theme === 'light' ? 'white' : '#1e293b'}
        >
          {data.map(({ name }, i) => (
            <Cell
              key={`pie-cell-${i}`}
              fill={pieColors[name]}
            />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
