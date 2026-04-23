import { formatSeconds } from "../utils/hr";

const ComparisonCard = ({ actualDuration, userPerceivedMinutes, distortionPercentage }) => {
  const actualMinutes = actualDuration / 60;
  const maxValue = Math.max(actualMinutes, userPerceivedMinutes, 0.1);
  const actualWidth = (actualMinutes / maxValue) * 100;
  const perceivedWidth = (userPerceivedMinutes / maxValue) * 100;
  const sign = distortionPercentage > 0 ? "+" : "";

  return (
    <article className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <h3 className="text-lg font-semibold text-slate-100">Actual vs Perceived</h3>
      <div className="grid gap-2 text-slate-200 sm:grid-cols-3">
        <p>Actual: {formatSeconds(actualDuration)}</p>
        <p>Felt: {userPerceivedMinutes.toFixed(1)} min</p>
        <p>
          Distortion:{" "}
          <span className="font-semibold text-emerald-300">
            {sign}
            {distortionPercentage.toFixed(1)}%
          </span>
        </p>
      </div>
      <div className="space-y-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-slate-300">Actual time</p>
          <div className="h-3 rounded-full bg-slate-800">
            <div className="h-3 rounded-full bg-sky-400 transition-all duration-700" style={{ width: `${actualWidth}%` }} />
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-slate-300">Perceived time</p>
          <div className="h-3 rounded-full bg-slate-800">
            <div
              className="h-3 rounded-full bg-emerald-400 transition-all duration-700"
              style={{ width: `${perceivedWidth}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ComparisonCard;
