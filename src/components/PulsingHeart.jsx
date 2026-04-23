import { hrClassForValue } from "../utils/hr";

const PulsingHeart = ({ bpm = 70 }) => {
  const animationDuration = `${(60 / Math.max(45, bpm)).toFixed(2)}s`;
  const bpmColorClass = hrClassForValue(bpm);

  return (
    <figure className="flex flex-col items-center gap-3" aria-label="Animated heart showing current baseline heart rate">
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label="Pulsing heart icon"
        className="h-24 w-24 text-rose-400 drop-shadow-[0_0_25px_rgba(244,63,94,0.55)]"
        style={{ animation: `heartBeat ${animationDuration} ease-in-out infinite` }}
      >
        <title>Current heart rate pulse</title>
        <path
          fill="currentColor"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3
             7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3
             19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55
             11.54L12 21.35z"
        />
      </svg>
      <figcaption className={`text-xl font-semibold ${bpmColorClass}`}>{bpm} bpm</figcaption>
      <style>{`
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.12); }
          50% { transform: scale(1); }
          75% { transform: scale(1.08); }
        }
      `}</style>
    </figure>
  );
};

export default PulsingHeart;
