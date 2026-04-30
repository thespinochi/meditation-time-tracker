import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("meditation_results")
    .select("distortion, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({
    history: data.map((row) => ({
      distortion: row.distortion,
      created_at: row.created_at,
    })),
  });
}
