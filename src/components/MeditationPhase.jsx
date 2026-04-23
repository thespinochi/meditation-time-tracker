import BreathingAnimation from "./BreathingAnimation";
import { formatSeconds, hrGlowForValue } from "../utils/hr";

const MeditationPhase = ({ remainingSeconds, selectedMinutes, currentHR }) => {
  const glowColor = hrGlowForValue(currentHR);

  return (
    <section className="animate-fadeUp relative flex min-h-[70vh] flex-col items-center justify-center gap-10 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-6 h-6 w-6 rounded-full transition"
        style={{ boxShadow: `0 0 22px 8px ${glowColor}`, backgroundColor: glowColor }}
      />
      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
        Phase 2 · Meditation · {selectedMinutes} min
      </p>
      <BreathingAnimation />
      <div className="space-y-1">
        <p className="text-sm text-slate-300">Remain still and follow your breath</p>
        <p className="text-4xl font-semibold tabular-nums text-slate-100">{formatSeconds(remainingSeconds)}</p>
      </div>
      <p className="text-xs text-slate-400">Live HR {currentHR} bpm</p>
    </section>
  );
};

export default MeditationPhase;
