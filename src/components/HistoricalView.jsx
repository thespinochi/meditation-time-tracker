import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
} from "recharts";
import { formatSeconds } from "../utils/hr";

const HistoricalView = ({ sessions, onBack }) => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const chartData = useMemo(
    () =>
      sessions.map((session, index) => ({
        id: session.id,
        index,
        avgHeartRate: session.avgHeartRate,
        distortionPercentage: Number(session.distortionPercentage.toFixed(1)),
      })),
    [sessions],
  );

  const selectedSession = sessions.find((session) => session.id === selectedSessionId) ?? sessions[0];

  return (
    <section className="animate-fadeUp space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-white">Past 7 Sessions</h2>
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
        >
          Back to results
        </button>
      </div>

      <article className="h-80 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 15, bottom: 10, left: 5 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" />
            <XAxis
              type="number"
              dataKey="avgHeartRate"
              name="Avg HR"
              unit=" bpm"
              stroke="#94a3b8"
              domain={[50, 100]}
            />
            <YAxis
              type="number"
              dataKey="distortionPercentage"
              name="Distortion"
              unit="%"
              stroke="#94a3b8"
              domain={[-80, 80]}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <ReferenceArea x1={55} x2={68} y1={-60} y2={-10} fill="#22c55e" fillOpacity={0.08} />
            <ReferenceArea x1={72} x2={95} y1={15} y2={80} fill="#ef4444" fillOpacity={0.08} />
            <Scatter
              data={chartData}
              fill="#38bdf8"
              shape={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={8}
                    className="cursor-pointer"
                    fill={payload.id === selectedSessionId ? "#f59e0b" : "#38bdf8"}
                    onClick={() => setSelectedSessionId(payload.id)}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </article>

      <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="mb-3 text-lg font-medium text-slate-100">Patterns</h3>
        <p className="text-slate-200">
          Green zone indicates likely flow sessions (lower HR + shorter perceived time). Red zone suggests compulsion or stress
          sessions (higher HR + longer perceived time).
        </p>
      </article>

      {selectedSession && (
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h3 className="mb-2 text-lg font-medium text-slate-100">Selected session details</h3>
          <p className="text-slate-200">Actual duration: {formatSeconds(selectedSession.actualDuration)}</p>
          <p className="text-slate-200">Avg HR: {selectedSession.avgHeartRate} bpm</p>
          <p className="text-slate-200">Distortion: {selectedSession.distortionPercentage.toFixed(1)}%</p>
          <p className="mt-2 text-slate-200">{selectedSession.insight}</p>
        </article>
      )}
    </section>
  );
};

export default HistoricalView;
