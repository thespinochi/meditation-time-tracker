import PulsingHeart from "./PulsingHeart";

const durationOptions = [5, 10, 20];

const BaselinePhase = ({ baselineHR, selectedMinutes, onDurationChange, onStart }) => {
  return (
    <section className="animate-fadeUp flex flex-col items-center justify-center gap-7 text-center">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Phase 1 · Baseline</p>
      <PulsingHeart bpm={baselineHR} />
      <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">Your baseline: {baselineHR} bpm</h1>
      <div className="space-y-3">
        <p className="text-sm text-slate-300">Choose session length</p>
        <div className="flex items-center justify-center gap-3">
          {durationOptions.map((minutes) => (
            <button
              key={minutes}
              type="button"
              onClick={() => onDurationChange(minutes)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                selectedMinutes === minutes
                  ? "bg-sky-400 text-slate-900"
                  : "border border-white/15 bg-slate-900/50 text-slate-200 hover:bg-slate-800"
              }`}
            >
              {minutes} min
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="rounded-full bg-emerald-400 px-8 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      >
        Ready? Press Start
      </button>
    </section>
  );
};

export default BaselinePhase;
