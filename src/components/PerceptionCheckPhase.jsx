const labels = {
  much_shorter: "Much shorter",
  about_right: "About right",
  much_longer: "Much longer",
};

const PerceptionCheckPhase = ({ onSelect }) => {
  return (
    <section className="animate-fadeUp flex flex-col items-center justify-center gap-8 text-center">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Phase 3 · Perception Check</p>
      <h2 className="max-w-2xl text-3xl font-semibold text-slate-50 md:text-4xl">How long did it feel?</h2>
      <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3">
        {Object.entries(labels).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className="rounded-2xl border border-white/15 bg-slate-900/60 px-4 py-6 text-lg font-medium text-slate-100 transition hover:scale-[1.02] hover:border-sky-300/70 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default PerceptionCheckPhase;
