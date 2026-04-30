import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { mode } = req.body;

  if (mode !== "idle" && mode !== "latest" && mode !== "history") {
    return res.status(400).json({ error: "Invalid mode" });
  }

  const { error } = await supabase
    .from("installation_state")
    .update({ mode })
    .eq("id", "11111111-1111-1111-1111-111111111111");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true, mode });
}
