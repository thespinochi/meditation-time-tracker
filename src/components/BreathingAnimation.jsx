import { useMemo } from "react";

const BreathingAnimation = () => {
  const breathGuidance = useMemo(
    () => [
      { label: "Inhale", seconds: 4 },
      { label: "Hold", seconds: 7 },
      { label: "Exhale", seconds: 8 },
    ],
    [],
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div
          aria-hidden="true"
          className="h-40 w-40 rounded-full bg-sky-400/30 blur-xl"
        />
        <div
          className="absolute inset-0 flex h-40 w-40 items-center justify-center rounded-full border border-sky-200/40 bg-sky-500/20 text-center text-sm font-medium text-sky-100 backdrop-blur-sm"
          style={{ animation: "breathe 19s ease-in-out infinite" }}
          aria-label="Breathing guide animation"
        >
          4-7-8
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-center text-sm text-slate-200">
        {breathGuidance.map((step) => (
          <p key={step.label}>
            <span className="font-semibold">{step.label}</span> {step.seconds}s
          </p>
        ))}
      </div>
      <style>{`
        @keyframes breathe {
          0% { transform: scale(0.88); opacity: 0.75; }
          21% { transform: scale(1); opacity: 1; }
          58% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.82); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default BreathingAnimation;
