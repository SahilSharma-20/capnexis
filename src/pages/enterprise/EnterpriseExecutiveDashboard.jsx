import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ======================================================
   STATIC DATA (MATCHES REFERENCE DASHBOARD)
====================================================== */

const KPI_DATA = [
  {
    label: "Total Net Operating Income",
    value: "$57.3 M",
    delta: "2.8%",
    positive: true,
    prev: "$55.7 M",
  },
  {
    label: "Total Gross Property Income",
    value: "$87.8 M",
    delta: "-1.3%",
    positive: false,
    prev: "$89.0 M",
  },
  {
    label: "Units Sold",
    value: "1,004",
    delta: "22.4%",
    positive: true,
    prev: "962",
  },
  {
    label: "Number of Properties",
    value: "5",
    delta: "25%",
    positive: true,
    prev: "4",
  },
];

const PROPERTY_TREND_DATA = [
  { month: "Jan", A: 2.4, B: 1.3, C: 0.6, D: 1.1, E: 0.3 },
  { month: "Feb", A: 2.2, B: 1.25, C: 0.7, D: 1.05, E: 0.35 },
  { month: "Mar", A: 2.3, B: 1.28, C: 0.65, D: 1.1, E: 0.32 },
  { month: "Apr", A: 2.15, B: 1.32, C: 0.68, D: 1.08, E: 0.34 },
  { month: "May", A: 2.25, B: 1.35, C: 0.7, D: 1.12, E: 0.36 },
  { month: "Jun", A: 2.1, B: 1.3, C: 0.66, D: 1.1, E: 0.33 },
  { month: "Jul", A: 2.2, B: 1.33, C: 0.69, D: 1.12, E: 0.35 },
  { month: "Aug", A: 2.3, B: 1.36, C: 0.71, D: 1.15, E: 0.37 },
  { month: "Sep", A: 2.1, B: 1.32, C: 0.67, D: 1.11, E: 0.34 },
  { month: "Oct", A: 2.15, B: 1.34, C: 0.69, D: 1.13, E: 0.36 },
  { month: "Nov", A: 2.2, B: 1.36, C: 0.72, D: 1.15, E: 0.38 },
  { month: "Dec", A: 2.3, B: 1.38, C: 0.73, D: 1.17, E: 0.4 },
];

const INCOME_BREAKDOWN = [
  { month: "Jan", Rental: 14500, Parking: 900, Amenities: 600 },
  { month: "Feb", Rental: 14000, Parking: 850, Amenities: 550 },
  { month: "Mar", Rental: 14200, Parking: 880, Amenities: 580 },
  { month: "Apr", Rental: 13800, Parking: 820, Amenities: 520 },
  { month: "May", Rental: 14400, Parking: 900, Amenities: 600 },
  { month: "Jun", Rental: 14600, Parking: 920, Amenities: 610 },
  { month: "Jul", Rental: 14800, Parking: 940, Amenities: 620 },
  { month: "Aug", Rental: 15000, Parking: 960, Amenities: 630 },
  { month: "Sep", Rental: 14700, Parking: 930, Amenities: 600 },
  { month: "Oct", Rental: 14900, Parking: 950, Amenities: 620 },
  { month: "Nov", Rental: 15100, Parking: 970, Amenities: 640 },
  { month: "Dec", Rental: 15200, Parking: 980, Amenities: 650 },
];

const COST_BREAKDOWN = [
  { name: "Maintenance", value: 40.04 },
  { name: "Administration", value: 22.37 },
  { name: "Utilities", value: 21.58 },
  { name: "Marketing", value: 9.48 },
  { name: "Security", value: 6.53 },
];

const DEBT_DATA = [
  { name: "Property A", value: 131.1 },
  { name: "Property B", value: 248.4 },
  { name: "Property C", value: 954.9 },
  { name: "Property D", value: 462.7 },
  { name: "Property E", value: 324.8 },
];

const COLORS = ["#9c27b0", "#4caf50", "#ff9800", "#26c6da", "#ef5350"];

/* ======================================================
   COMPONENT
====================================================== */

export default function EnterpriseExecutiveDashboard() {
  return (
    <div style={{ padding: "24px 40px" }}>
      <h2 style={{ marginBottom: 20 }}>Financial Dashboard</h2>

      {/* KPI ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginBottom: 24,
        }}
      >
        {KPI_DATA.map((k) => (
          <div
            key={k.label}
            style={{
              background: "#eeeeee",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              {k.label}
            </div>
            <div style={{ fontSize: 32, fontWeight: 600 }}>
              {k.value}
            </div>
            <div
              style={{
                fontSize: 13,
                color: k.positive ? "#2e7d32" : "#d32f2f",
              }}
            >
              {k.delta} vs {k.prev}
            </div>
          </div>
        ))}
      </div>

      {/* ROW 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <ChartCard title="Property Value Trends">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROPERTY_TREND_DATA}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="A" stroke={COLORS[0]} strokeWidth={2} />
              <Line dataKey="B" stroke={COLORS[1]} strokeWidth={2} />
              <Line dataKey="C" stroke={COLORS[2]} strokeWidth={2} />
              <Line dataKey="D" stroke={COLORS[3]} strokeWidth={2} />
              <Line dataKey="E" stroke={COLORS[4]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cross Property Income Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={INCOME_BREAKDOWN}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Rental" stackId="a" fill="#9c27b0" />
              <Bar dataKey="Parking" stackId="a" fill="#4caf50" />
              <Bar dataKey="Amenities" stackId="a" fill="#ff9800" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ROW 3 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        <ChartCard title="Management Costs Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={COST_BREAKDOWN}
                dataKey="value"
                outerRadius={110}
                label
              >
                {COST_BREAKDOWN.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Debt Load by Property">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DEBT_DATA}
              layout="vertical"
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#9c27b0" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ======================================================
   CHART CARD
====================================================== */

function ChartCard({ title, children }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 10,
        padding: 16,
        height: 360,
      }}
    >
      <div style={{ fontSize: 14, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}
