// pages/api/jobs.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Default filters
    let query = "developer jobs";
    let page = 1;
    let location: string | undefined;
    let category: string | undefined;
    let experience: string | undefined;
    const numPerPage = 10; // Fixed number of jobs per page

    // Parse filters from request body (POST) or query string (GET) params

    if (req.method === "POST") {
      // Read filters from request body
      const body = req.body;
      query = body.query || query;
      page = body.page || page;
      location = body.location;
      category = body.category;
      experience = body.experience;
    } else {
      // Fallback for GET requests (query string params)
      query = (req.query.query as string) || query;
      page = parseInt((req.query.page as string) || "1", 10);
      location = req.query.location as string;
      category = req.query.category as string;
      experience = req.query.experience as string;
    }

    // Build search query dynamically
    let searchQuery = query;
    if (category) searchQuery += ` ${category}`;
    if (location) searchQuery += ` in ${location}`;
    if (experience) searchQuery += ` ${experience} level`;

    const url = `https://${process.env.RAPIDAPI_HOST}/search?query=${encodeURIComponent(
      searchQuery
    )}&page=${page}&num_pages=${numPerPage}&country=us&date_posted=all`;

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

    // Return jobs and total count if available
    return res.status(200).json({
      jobs: data.jobs || [],
      total: data.total_jobs || data.jobs?.length || 0,
      page,
      perPage: numPerPage,
    });
  } catch (error: unknown) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Unexpected error fetching jobs" });
  }
}
