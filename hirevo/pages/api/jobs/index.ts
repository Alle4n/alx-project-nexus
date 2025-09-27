import type { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://nexus-jobboard-backend.onrender.com/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const response = await fetch(`${BASE_URL}/jobs/`);

      if (!response.ok) {
        const errText = await response.text();
        return res.status(response.status).json({ error: errText });
      }

      const jobs = await response.json();
      return res.status(200).json(jobs);
    } catch (err: unknown) {
      return res.status(500).json({
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
