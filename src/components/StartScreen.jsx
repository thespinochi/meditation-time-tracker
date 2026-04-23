const durationOptions = [5, 10, 20];

const StartScreen = ({ selectedDuration, onDurationChange, onStart, onViewHistory }) => {
  return (
    <section className="animate-fadeUp flex min-h-[72vh] flex-col items-center justify-center gap-7 text-center">
      <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">Meditation Time Perception Tracker</h1>
      <div className="space-y-3">
        <p className="text-sm text-slate-300">Choose session duration</p>
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {durationOptions.map((minutes) => (
            <button
              key={minutes}
              type="button"
              onClick={() => onDurationChange(minutes)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                selectedDuration === minutes
                  ? "bg-emerald-500 text-white"
                  : "border border-white/15 bg-slate-900/60 text-slate-100 hover:bg-slate-800"
              }`}
              aria-pressed={selectedDuration === minutes}
            >
              {minutes} min
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onStart}
          className="rounded-full bg-sky-500 px-10 py-3 text-base font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          Start
        </button>
        <button
          type="button"
          onClick={onViewHistory}
          className="rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-slate-100 transition hover:bg-slate-800"
        >
          View History
        </button>
      </div>
    </section>
  );
};

export default StartScreen;
