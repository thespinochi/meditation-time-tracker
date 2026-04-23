const HISTORY_KEY = "meditation-time-sessions";
const MAX_SESSIONS = 10;

const now = Date.now();
const minutesAgo = (minutes) => now - minutes * 60 * 1000;

export const seededSessions = [
  {
    id: 1,
    selectedDuration: 5,
    startTime: minutesAgo(500),
    endTime: minutesAgo(495),
    actualDuration: 5 * 60,
    actualMinutes: 5,
    userPerceivedMinutes: 3.0,
    distortionPercentage: -40.0,
    insight: "You significantly underestimated the time. Time felt much shorter.",
    timestamp: minutesAgo(495),
  },
  {
    id: 2,
    selectedDuration: 10,
    startTime: minutesAgo(480),
    endTime: minutesAgo(470),
    actualDuration: 10 * 60,
    actualMinutes: 10,
    userPerceivedMinutes: 14.3,
    distortionPercentage: 43.0,
    insight: "Time felt a bit longer. Possible restlessness or anticipation.",
    timestamp: minutesAgo(470),
  },
  {
    id: 3,
    selectedDuration: 20,
    startTime: minutesAgo(450),
    endTime: minutesAgo(430),
    actualDuration: 20 * 60,
    actualMinutes: 20,
    userPerceivedMinutes: 10.0,
    distortionPercentage: -50.0,
    insight: "You significantly underestimated the time. Time felt much shorter.",
    timestamp: minutesAgo(430),
  },
  {
    id: 4,
    selectedDuration: 10,
    startTime: minutesAgo(410),
    endTime: minutesAgo(400),
    actualDuration: 10 * 60,
    actualMinutes: 10,
    userPerceivedMinutes: 16.0,
    distortionPercentage: 60.0,
    insight: "You significantly overestimated the time. Could indicate stress or discomfort.",
    timestamp: minutesAgo(400),
  },
  {
    id: 5,
    selectedDuration: 5,
    startTime: minutesAgo(380),
    endTime: minutesAgo(375),
    actualDuration: 5 * 60,
    actualMinutes: 5,
    userPerceivedMinutes: 5.1,
    distortionPercentage: 2.0,
    insight: "Your perception was quite accurate. Good awareness.",
    timestamp: minutesAgo(375),
  },
  {
    id: 6,
    selectedDuration: 20,
    startTime: minutesAgo(350),
    endTime: minutesAgo(330),
    actualDuration: 20 * 60,
    actualMinutes: 20,
    userPerceivedMinutes: 11.0,
    distortionPercentage: -45.0,
    insight: "You significantly underestimated the time. Time felt much shorter.",
    timestamp: minutesAgo(330),
  },
  {
    id: 7,
    selectedDuration: 10,
    startTime: minutesAgo(310),
    endTime: minutesAgo(300),
    actualDuration: 10 * 60,
    actualMinutes: 10,
    userPerceivedMinutes: 9.9,
    distortionPercentage: -1.0,
    insight: "Your perception was quite accurate. Good awareness.",
    timestamp: minutesAgo(300),
  },
  {
    id: 8,
    selectedDuration: 5,
    startTime: minutesAgo(280),
    endTime: minutesAgo(275),
    actualDuration: 5 * 60,
    actualMinutes: 5,
    userPerceivedMinutes: 8.0,
    distortionPercentage: 60.0,
    insight: "You significantly overestimated the time. Could indicate stress or discomfort.",
    timestamp: minutesAgo(275),
  },
];

export const loadSessions = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) {
      // First launch: seed storage with sample sessions.
      localStorage.setItem(HISTORY_KEY, JSON.stringify(seededSessions));
      return seededSessions;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(seededSessions));
      return seededSessions;
    }
    return parsed.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0)).slice(0, MAX_SESSIONS);
  } catch (error) {
    console.error("Failed to parse session history:", error);
    return seededSessions;
  }
};

export const saveSession = (session) => {
  try {
    const existing = loadSessions();
    const next = [session, ...existing]
      .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
      .slice(0, MAX_SESSIONS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    return next;
  } catch (error) {
    console.error("Failed to persist session:", error);
    return loadSessions();
  }
};
