import BreathingAnimation from "./BreathingAnimation";

const MeditationScreen = ({ selectedDuration, onStop }) => {
  return (
    <section className="animate-fadeUp relative flex min-h-[70vh] flex-col items-center justify-center gap-10 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Meditation · {selectedDuration} min target</p>
      <BreathingAnimation />
      <p className="max-w-md text-sm text-slate-300">Inhale slowly, hold, then exhale. Timer is running quietly in the background.</p>
      <button
        type="button"
        onClick={onStop}
        className="rounded-full bg-rose-500 px-12 py-4 text-lg font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
      >
        Stop
      </button>
    </section>
  );
};

export default MeditationScreen;
