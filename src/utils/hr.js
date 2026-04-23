const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const mapHrToColor = (hr) => {
  if (hr <= 65) return "text-emerald-300";
  if (hr <= 70) return "text-sky-300";
  if (hr <= 80) return "text-amber-300";
  return "text-rose-300";
};

const mapHrToGlow = (hr) => {
  if (hr <= 65) return "rgba(16,185,129,0.55)";
  if (hr <= 70) return "rgba(56,189,248,0.55)";
  if (hr <= 80) return "rgba(251,191,36,0.55)";
  return "rgba(244,63,94,0.6)";
};

const sampleGaussian = () => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

export const generateMockHRStream = (durationMinutes) => {
  const totalSeconds = Math.max(60, Math.floor(durationMinutes * 60));
  const baseline = randomBetween(65, 75);
  const relaxationDropTarget = randomBetween(5, 15);
  const stressChance = durationMinutes >= 10 ? 0.42 : 0.3;
  const events = [];

  if (Math.random() < stressChance) {
    const maxStart = Math.max(40, totalSeconds - 35);
    const start = Math.floor(randomBetween(30, maxStart));
    const eventLength = Math.floor(randomBetween(8, 28));
    const spike = randomBetween(10, 20);
    events.push({ start, end: start + eventLength, spike });
  }

  const hr = [];
  for (let t = 0; t < totalSeconds; t += 1) {
    const progress = t / totalSeconds;
    const drop = relaxationDropTarget * Math.min(1, progress * 1.4);
    const breathingWave = Math.sin((2 * Math.PI * t) / 16) * 1.35;
    const noise = sampleGaussian() * 0.9;

    let value = baseline - drop + breathingWave + noise;

    events.forEach((event) => {
      if (t >= event.start && t <= event.end) {
        const eventProgress = (t - event.start) / (event.end - event.start || 1);
        const envelope = Math.sin(Math.PI * eventProgress);
        value += event.spike * envelope;
      }
    });

    hr.push(Math.round(clamp(value, 52, 110)));
  }

  return hr;
};

export const calculateDistortionFromMinutes = (actualSeconds, userPerceivedMinutes) => {
  const actualTimeMinutes = actualSeconds / 60;
  if (!actualTimeMinutes) return 0;
  return ((userPerceivedMinutes - actualTimeMinutes) / actualTimeMinutes) * 100;
};

export const buildInsight = (distortionPercentage) => {
  if (distortionPercentage < -30) {
    return "You significantly underestimated the time. Time felt much shorter.";
  }
  if (distortionPercentage < -10) {
    return "Time compressed slightly. You were probably in flow.";
  }
  if (Math.abs(distortionPercentage) <= 10) {
    return "Your perception was quite accurate. Good awareness.";
  }
  if (distortionPercentage > 10 && distortionPercentage < 30) {
    return "Time felt a bit longer. Possible restlessness or anticipation.";
  }
  return "You significantly overestimated the time. Could indicate stress or discomfort.";
};

export const formatSeconds = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
};

export const hrClassForValue = (hr) => mapHrToColor(hr);

export const hrGlowForValue = (hr) => mapHrToGlow(hr);
