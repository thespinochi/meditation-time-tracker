import { useEffect, useRef, useState } from "react";
import StartScreen from "./components/StartScreen";
import MeditationScreen from "./components/MeditationScreen";
import PerceptionInputScreen from "./components/PerceptionInputScreen";
import ResultsScreen from "./components/ResultsScreen";
import HistoryScreen from "./components/HistoryScreen";
import { buildInsight, calculateDistortionFromMinutes } from "./utils/hr";
import { loadSessions, saveSession } from "./utils/session";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const meditationTimerRef = useRef(null);

  useEffect(() => {
    // Load persisted history (or seed data on first run).
    setSessions(loadSessions());
  }, []);

  useEffect(() => {
    return () => {
      if (meditationTimerRef.current) window.clearTimeout(meditationTimerRef.current);
    };
  }, []);

  const handleStartMeditation = () => {
    const startTime = Date.now();
    setCurrentSession({
      selectedDuration,
      startTime,
      endTime: null,
      actualMinutes: 0,
      actualDuration: 0,
      userPerceivedMinutes: 0,
      distortionPercentage: 0,
      insight: "",
    });
    setCurrentScreen("meditation");

    // Hidden timer auto-ends the session at selected duration.
    if (meditationTimerRef.current) window.clearTimeout(meditationTimerRef.current);
    meditationTimerRef.current = window.setTimeout(() => {
      handleStopMeditation();
    }, selectedDuration * 60 * 1000);
  };

  const handleStopMeditation = () => {
    if (meditationTimerRef.current) window.clearTimeout(meditationTimerRef.current);
    meditationTimerRef.current = null;

    setCurrentSession((previous) => {
      if (!previous) return previous;
      const endTime = Date.now();
      const actualDuration = Math.max(1, Math.round((endTime - previous.startTime) / 1000));
      return {
        ...previous,
        endTime,
        actualDuration,
        actualMinutes: actualDuration / 60,
      };
    });
    setCurrentScreen("perception");
  };

  const handlePerceptionSubmit = (userPerceivedMinutes) => {
    if (!currentSession) return;
    // Use measured duration; fallback protects against edge cases.
    const actualDuration = currentSession.actualDuration || Math.max(1, currentSession.selectedDuration * 60);
    const distortionPercentage = calculateDistortionFromMinutes(actualDuration, userPerceivedMinutes);
    const insight = buildInsight(distortionPercentage);

    const completedSession = {
      id: crypto.randomUUID(),
      selectedDuration: currentSession.selectedDuration,
      startTime: currentSession.startTime,
      endTime: currentSession.endTime ?? Date.now(),
      actualDuration,
      actualMinutes: actualDuration / 60,
      userPerceivedMinutes,
      distortionPercentage,
      insight,
      timestamp: Date.now(),
    };

    setCurrentSession(completedSession);
    setSessions(saveSession(completedSession));
    setCurrentScreen("results");
  };

  const handleNewSession = () => {
    setCurrentSession(null);
    setCurrentScreen("start");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-8 md:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Meditation Time Perception Tracker</p>
        <p className="text-sm text-slate-300">
          Screen: <span className="font-semibold capitalize text-slate-100">{currentScreen}</span>
        </p>
      </div>

      {currentScreen === "start" && (
        <StartScreen
          selectedDuration={selectedDuration}
          onDurationChange={setSelectedDuration}
          onStart={handleStartMeditation}
          onViewHistory={() => setCurrentScreen("history")}
        />
      )}

      {currentScreen === "meditation" && <MeditationScreen selectedDuration={selectedDuration} onStop={handleStopMeditation} />}

      {currentScreen === "perception" && <PerceptionInputScreen onSubmit={handlePerceptionSubmit} />}

      {currentScreen === "results" && currentSession && (
        <ResultsScreen
          sessionData={currentSession}
          onNewSession={handleNewSession}
          onHistory={() => setCurrentScreen("history")}
        />
      )}

      {currentScreen === "history" && <HistoryScreen sessions={sessions} onNewSession={handleNewSession} />}
    </main>
  );
};

export default App;
