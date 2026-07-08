import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Sector,
} from "recharts";
import { useState } from "react";

const COLORS = [
  "#3B82F6", // Applied
  "#FACC15", // Interview
  "#22C55E", // Offer
  "#EF4444", // Rejected
];

function DashboardCharts({
  stats,
  monthlyApplications,
  interviewRate,
  offerRate,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const pieData = [
    {
      name: "Applied",
      value: Number(stats.applied),
    },
    {
      name: "Interview",
      value: Number(stats.interview),
    },
    {
      name: "Offer",
      value: Number(stats.offer),
    },
    {
      name: "Rejected",
      value: Number(stats.rejected),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 my-8 lg:my-10">
      {/* ===================== PIE CHART ===================== */}

      <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Job Status Distribution</h2>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              rootTabIndex={-1}
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius="70%"
              innerRadius="45%"
              paddingAngle={3}
              stroke="#111827"
              strokeWidth={2}
              activeIndex={activeIndex}
              activeShape={(props) => (
                <Sector {...props} outerRadius={props.outerRadius + 10} />
              )}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
              onClick={(_, index) => {
                setActiveIndex(index);

                // remove browser focus outline
                document.activeElement?.blur();
              }}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  style={{ outline: "none" }}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "10px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#fff",
              }}
              itemStyle={{
                color: "#fff",
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                color: "#d1d5db",
                fontSize: "13px",
                paddingTop: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ===================== BAR CHART ===================== */}

      <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-4 sm:p-5 lg:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          Monthly Applications
        </h2>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={monthlyApplications}
            rootTabIndex={-1}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid stroke="#2b2b2b" strokeDasharray="4 4" />

            <XAxis
              dataKey="month"
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#1f2937" }}
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "10px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#fff",
              }}
              itemStyle={{
                color: "#fff",
              }}
            />

            <Bar
              dataKey="count"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
              activeBar={false}
              rootTabIndex={-1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===================== INTERVIEW RATE ===================== */}

      <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold">Interview Rate</h2>

        <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mt-6 sm:mt-10">
          {interviewRate}%
        </p>
      </div>

      {/* ===================== OFFER RATE ===================== */}

      <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold">Offer Rate</h2>

        <p className="text-2xl sm:text-3xl font-bold text-green-400 mt-6 sm:mt-10">{offerRate}%</p>
      </div>
    </div>
  );
}

export default DashboardCharts;
