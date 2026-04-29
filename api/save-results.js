import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { realTime, estimatedTime } = req.body;

    const distortion = (estimatedTime - realTime) / realTime;
    const clamped = Math.max(-1, Math.min(1, distortion));

    const { error } = await supabase.from("meditation_results").insert([
      {
        real_time: realTime,
        estimated_time: estimatedTime,
        distortion: clamped
      }
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      distortion: clamped
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
