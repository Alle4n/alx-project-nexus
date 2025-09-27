import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const jobData = req.body;

      const response = await fetch("https://afriremotely.onrender.com/api/jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.AFRIREMOTE_API_KEY}`, // Add your API key
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errText = await response.text();
        return res.status(response.status).json({ error: errText });
      }

      const newJob = await response.json();
      return res.status(201).json(newJob);
    } catch (err: any) {
      console.error("Failed to post job:", err);
      return res.status(500).json({ error: err.message });
    }
  } else if (req.method === "GET") {
    // Optional: fetch jobs
    const response = await fetch("https://afriremotely.onrender.com/api/jobs/", {
      headers: { "Authorization": `Bearer ${process.env.AFRIREMOTE_API_KEY}` },
    });
    const jobs = await response.json();
    return res.status(200).json(jobs);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
