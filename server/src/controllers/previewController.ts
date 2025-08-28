import { Request, Response } from "express";
import fetch from "node-fetch";
import { extractMeta } from "../utils/htmlExtractor";

export const extractPreview = async (req: Request, res: Response) => {
  try {
    const { url, raw_html } = req.body;

    if (!url && !raw_html) {
      return res.status(400).json({ error: "Please provide either a url or raw_html" });
    }

    let htmlContent: string;

    if (raw_html) {
      // Use provided HTML directly
      htmlContent = raw_html;
    } else {
      // Fetch HTML from the provided URL
      const response = await fetch(url, { timeout: 10000 }); // 10s timeout
      if (!response.ok) {
        return res.status(500).json({ error: `Failed to fetch URL: ${response.statusText}` });
      }
      htmlContent = await response.text();
    }

    const metadata = extractMeta(htmlContent, url);

    return res.json(metadata);
  } catch (error: any) {
    console.error("Error in getPreview:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
