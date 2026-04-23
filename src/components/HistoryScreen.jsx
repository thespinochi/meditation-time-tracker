import { formatSeconds } from "../utils/hr";

const HistoryScreen = ({ sessions, onNewSession }) => {
  const sortedSessions = [...sessions].sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0)).slice(0, 10);

  return (
    <section className="animate-fadeUp space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-white">Session History</h2>
        <button
          type="button"
          onClick={onNewSession}
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          New Session
        </button>
      </div>

      {sortedSessions.length === 0 ? (
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-slate-200">
          No sessions yet. Complete one meditation to populate history.
        </article>
      ) : (
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
          <div className="max-h-[65vh] overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-slate-900/95">
                <tr className="text-slate-300">
                  <th className="px-3 py-3">#</th>
                  <th className="px-3 py-3">Duration</th>
                  <th className="px-3 py-3">Felt</th>
                  <th className="px-3 py-3">Distortion</th>
                  <th className="px-3 py-3">Insight</th>
                </tr>
              </thead>
              <tbody>
                {sortedSessions.map((session, index) => (
                  <tr key={session.id} className="border-t border-white/10 text-slate-100 align-top">
                    <td className="px-3 py-3">{index + 1}</td>
                    <td className="px-3 py-3">{formatSeconds(session.actualDuration)}</td>
                    <td className="px-3 py-3">{session.userPerceivedMinutes.toFixed(1)} min</td>
                    <td className="px-3 py-3">
                      {session.distortionPercentage > 0 ? "+" : ""}
                      {session.distortionPercentage.toFixed(1)}%
                    </td>
                    <td className="px-3 py-3 text-xs sm:text-sm">{session.insight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      )}
    </section>
  );
};

export default HistoryScreen;
