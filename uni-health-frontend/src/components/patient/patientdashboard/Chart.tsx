import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  // LineChart,
  // Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
//   type PieLabelRenderProps,
} from "recharts";

// Monthly visits data for charts
const monthlyVisitsData = [
  { month: "Jan", visits: 2, prescriptions: 1, labTests: 1 },
  { month: "Feb", visits: 3, prescriptions: 2, labTests: 2 },
  { month: "Mar", visits: 2, prescriptions: 1, labTests: 1 },
  { month: "Apr", visits: 1, prescriptions: 0, labTests: 1 },
  { month: "May", visits: 3, prescriptions: 2, labTests: 2 },
  { month: "Jun", visits: 2, prescriptions: 1, labTests: 1 },
  { month: "Jul", visits: 2, prescriptions: 1, labTests: 2 },
  { month: "Aug", visits: 3, prescriptions: 2, labTests: 1 },
  { month: "Sep", visits: 2, prescriptions: 1, labTests: 2 },
  { month: "Oct", visits: 4, prescriptions: 2, labTests: 1 },
  { month: "Nov", visits: 0, prescriptions: 0, labTests: 0 },
  { month: "Dec", visits: 0, prescriptions: 0, labTests: 0 },
];

// Health score trend data
const healthScoreTrend = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 80 },
  { month: "Mar", score: 79 },
  { month: "Apr", score: 81 },
  { month: "May", score: 82 },
  { month: "Jun", score: 83 },
  { month: "Jul", score: 82 },
  { month: "Aug", score: 84 },
  { month: "Sep", score: 83 },
  { month: "Oct", score: 85 },
];

// Visit types distribution
const visitTypeData = [
  { name: "General Check-up", value: 10, color: "#3b82f6" },
  { name: "Follow-up", value: 8, color: "#10b981" },
  { name: "Specialist", value: 4, color: "#8b5cf6" },
  { name: "Emergency", value: 2, color: "#ef4444" },
];

// Appointment status data
const appointmentStatusData = [
  { name: "Completed", value: 20, color: "#10b981" },
  { name: "Upcoming", value: 4, color: "#3b82f6" },
  { name: "Cancelled", value: 2, color: "#ef4444" },
];

const Chart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Monthly Activity Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Monthly Healthcare Activity
          </h2>
          <p className="text-sm text-gray-600">
            Your visits, prescriptions, and lab tests over time
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyVisitsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar
              dataKey="visits"
              fill="#3b82f6"
              name="Visits"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="prescriptions"
              fill="#10b981"
              name="Prescriptions"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="labTests"
              fill="#8b5cf6"
              name="Lab Tests"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Health Score Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Health Score Trend
          </h2>
          <p className="text-sm text-gray-600">
            Your wellness score over the past 10 months
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={healthScoreTrend}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[70, 90]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
              name="Health Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Visit Types Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Visit Types Distribution
          </h2>
          <p className="text-sm text-gray-600">
            Breakdown of your medical visits by type
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={visitTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={(props: PieLabelRenderProps) => {
              //   const name = props.name ?? "";
              //   const percent = props.percent ?? 0;
              //   return `${name} ${(percent * 100).toFixed(0)}%`;
              // }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {visitTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {visitTypeData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="font-medium text-gray-900">
                {item.value} visits
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Appointment Status
          </h2>
          <p className="text-sm text-gray-600">
            Overview of all your appointments
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={appointmentStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={({ name, percent }) =>
              //   `${name} ${(percent * 100).toFixed(0)}%`
              // }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {appointmentStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {appointmentStatusData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="font-medium text-gray-900">
                {item.value} appointments
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
