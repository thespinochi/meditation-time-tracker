import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const HRChart = ({ stream = [] }) => {
  const data = stream.map((value, second) => ({ second, hr: value }));

  return (
    <div className="h-52 w-full rounded-2xl border border-white/10 bg-slate-900/55 p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="second" stroke="#94a3b8" tick={{ fontSize: 10 }} />
          <YAxis domain={["dataMin - 4", "dataMax + 4"]} stroke="#94a3b8" tick={{ fontSize: 10 }} />
          <Tooltip
            formatter={(value) => [`${value} bpm`, "Heart rate"]}
            labelFormatter={(value) => `t=${value}s`}
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
          />
          <Line type="monotone" dataKey="hr" stroke="#22d3ee" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HRChart;
