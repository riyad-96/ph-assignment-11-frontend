import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// --- 1. DUMMY DATA FOR THE LAST 7 DAYS ---
const data = [
  { day: 'Mon', created: 150, sold: 120 },
  { day: 'Tue', created: 180, sold: 150 },
  { day: 'Wed', created: 160, sold: 130 },
  { day: 'Thu', created: 200, sold: 170 },
  { day: 'Fri', created: 220, sold: 200 },
  { day: 'Sat', created: 170, sold: 150 },
  { day: 'Sun', created: 190, sold: 160 },
];

const SimpleComparisonChart = () => {
  return (
    // ResponsiveContainer makes sure the chart fits the parent element size
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* Adds subtle background lines for better reading of values */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0f0f0"
        />

        {/* X-axis shows the days */}
        <XAxis dataKey="day" />

        {/* Y-axis shows the count of tickets */}
        <YAxis />

        {/* Tooltip shows the exact values when hovering over the bars */}
        <Tooltip />

        {/* Legend explains which color is "Created" and which is "Sold" */}
        <Legend />

        {/* Bar for Tickets Created */}
        <Bar
          dataKey="created"
          name="Tickets Created"
          fill="#8884d8"
        />

        {/* Bar for Tickets Sold */}
        <Bar
          dataKey="sold"
          name="Tickets Sold"
          fill="#82ca9d"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleComparisonChart;
