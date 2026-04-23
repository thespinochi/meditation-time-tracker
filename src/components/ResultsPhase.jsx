import ComparisonBar from "./ComparisonBar";
import HRChart from "./HRChart";
import { formatSeconds } from "../utils/hr";

const perceptionLabels = {
  much_shorter: "Much shorter",
  about_right: "About right",
  much_longer: "Much longer",
};

const ResultsPhase = ({ sessionData, onRestart, onHistory }) => {
  if (!sessionData) return null;

  const {
    actualDuration,
    perceivedDuration,
    userPerception,
    distortionPercentage,
    insight,
    avgHeartRate,
    maxHeartRate,
    heartRateStream,
  } = sessionData;

  const distortionPrefix = distortionPercentage > 0 ? "+" : "";

  return (
    <section className="animate-fadeUp space-y-6">
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Phase 4 · Results + Insight</p>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Session reflection</h2>
      </header>

      <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <p className="text-slate-200">
            Actual time: <span className="font-semibold">{formatSeconds(actualDuration)}</span>
          </p>
          <p className="text-slate-200">
            User said: <span className="font-semibold">{perceptionLabels[userPerception]}</span>
          </p>
          <p className="text-slate-200">
            Distortion:{" "}
            <span className="font-semibold text-emerald-300">
              {distortionPrefix}
              {distortionPercentage.toFixed(1)}%
            </span>
          </p>
        </div>
      </article>

      <article className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="text-lg font-medium text-slate-100">Perception vs Reality</h3>
        <ComparisonBar actualSeconds={actualDuration} perceivedSeconds={perceivedDuration} />
      </article>

      <article className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h3 className="text-lg font-medium text-slate-100">Dynamic Insight</h3>
        <p className="text-slate-200">{insight}</p>
      </article>

      <article className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-lg font-medium text-slate-100">Session summary</h3>
          <p className="text-slate-200">Avg HR: {avgHeartRate} bpm</p>
          <p className="text-slate-200">Max HR: {maxHeartRate} bpm</p>
          <p className="text-slate-200">Samples: {heartRateStream.length}</p>
        </div>
        <HRChart stream={heartRateStream} />
      </article>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full bg-sky-400 px-6 py-2 font-semibold text-slate-900 transition hover:bg-sky-300"
        >
          Start another session
        </button>
        <button
          type="button"
          onClick={onHistory}
          className="rounded-full border border-white/20 px-6 py-2 font-semibold text-slate-100 transition hover:bg-slate-800"
        >
          See past 7 sessions
        </button>
      </div>
    </section>
  );
};

export default ResultsPhase;
