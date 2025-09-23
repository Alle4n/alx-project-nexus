import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Default values for query & page
  const { query = "developer jobs in chicago", page = "1" } = req.query;

  // Build RapidAPI endpoint
  const url = `https://${process.env.RAPIDAPI_HOST}/search?query=${encodeURIComponent(
    String(query)
  )}&page=${page}&num_pages=1&country=us&date_posted=all`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.RAPIDAPI_HOST ?? "",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY ?? "",
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      return res
        .status(response.status)
        .json({ error: `Failed to fetch jobs from RapidAPI: ${errText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: unknown) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Unexpected error fetching jobs" });
  }
}
