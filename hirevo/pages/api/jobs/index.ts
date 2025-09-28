import type { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://nexus-jobboard-backend.onrender.com/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const response = await fetch(`${BASE_URL}/jobs/`);
    if (!response.ok) {
      const errText = await response.text();
      console.log("Backend error:", errText);
      return res.status(response.status).json({ error: errText });
    }

    const jobs = await response.json();
    console.log("Jobs fetched from backend:", jobs); // console log for debugging
    return res.status(200).json(jobs);
  } catch (err) {
    console.log("Fetch error:", err);
    return res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
}
