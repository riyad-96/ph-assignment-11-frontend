import { Pie, PieChart, Tooltip } from 'recharts';

// #region Sample data


type StraightAnglePieChartProps = {
  isAnimationActive?: boolean;
  data: { name: string; value: number }[];
};

// #endregion
export default function StraightAnglePieChart({
  isAnimationActive = true,
  data,
}: StraightAnglePieChartProps) {
  return (
    <PieChart
      style={{
        width: '100%',
        maxWidth: '500px',
        maxHeight: '80vh',
        aspectRatio: 2,
      }}
      responsive
    >
      <Tooltip />
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx="50%"
        cy="100%"
        outerRadius="120%"
        fill="#8884d8"
        label
        isAnimationActive={isAnimationActive}
      />
    </PieChart>
  );
}
