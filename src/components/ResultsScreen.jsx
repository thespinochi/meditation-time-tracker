import { formatSeconds } from "../utils/hr";

const getDistortionColor = (distortionPercentage) => {
  if (Math.abs(distortionPercentage) <= 10) return "#10B981";
  if (distortionPercentage < -10) return "#3B82F6";
  return "#EF4444";
};

const ResultsScreen = ({ sessionData, onNewSession, onHistory }) => {
  if (!sessionData) return null;

  const distortionColor = getDistortionColor(sessionData.distortionPercentage);
  const sign = sessionData.distortionPercentage > 0 ? "+" : "";

  return (
    <section className="animate-fadeUp space-y-5">
      <header className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Results</p>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Session Summary</h2>
      </header>

      <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <p className="text-slate-200">Actual time: {formatSeconds(sessionData.actualDuration)}</p>
          <p className="text-slate-200">Felt duration: {sessionData.userPerceivedMinutes.toFixed(1)} min</p>
          <p className="font-semibold" style={{ color: distortionColor }}>
            Distortion: {sign}
            {sessionData.distortionPercentage.toFixed(1)}%
          </p>
        </div>
      </article>

      <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="mb-2 text-lg font-semibold text-slate-100">Insight</h3>
        <p className="text-slate-200">{sessionData.insight}</p>
      </article>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onHistory}
          className="rounded-full border border-white/20 px-6 py-2 font-semibold text-slate-100 transition hover:bg-slate-800"
        >
          View History
        </button>
        <button
          type="button"
          onClick={onNewSession}
          className="rounded-full bg-sky-500 px-6 py-2 font-semibold text-white transition hover:bg-sky-400"
        >
          New Session
        </button>
      </div>
    </section>
  );
};

export default ResultsScreen;
