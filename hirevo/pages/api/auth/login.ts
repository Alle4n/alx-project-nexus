import type { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://nexus-jobboard-backend.onrender.com/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end(`Method ${req.method} Not Allowed`);

  try {
    const { username, password } = req.body;

    const response = await fetch(`${BASE_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const tokens = await response.json();
    return res.status(200).json(tokens);
  } catch (err: unknown) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
}
