const ComparisonBar = ({ actualSeconds, perceivedSeconds }) => {
  const max = Math.max(actualSeconds, perceivedSeconds, 1);
  const actualPercent = (actualSeconds / max) * 100;
  const perceivedPercent = (perceivedSeconds / max) * 100;

  return (
    <div className="w-full space-y-3">
      <div>
        <p className="mb-1 text-xs uppercase tracking-wider text-slate-300">Reality</p>
        <div className="h-4 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-sky-400 transition-all duration-700"
            style={{ width: `${actualPercent}%` }}
          />
        </div>
      </div>
      <div>
        <p className="mb-1 text-xs uppercase tracking-wider text-slate-300">Perceived</p>
        <div className="h-4 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-700"
            style={{ width: `${perceivedPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;
