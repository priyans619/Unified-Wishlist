// src/controllers/previewController.ts
import { Request, Response } from "express";
import fetch from "node-fetch";
import { extractMeta } from "../utils/htmlExtractor";

const FETCH_TIMEOUT_MS = 10000;

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
      // Fetch HTML from URL with timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);

        if (!response.ok) {
          return res.status(500).json({ error: `Failed to fetch URL: ${response.statusText}` });
        }

        htmlContent = await response.text();
      } catch (err: any) {
        clearTimeout(timeout);
        return res.status(500).json({ error: "Failed to fetch URL", details: err.message });
      }
    }

    // Extract metadata using Cheerio
    const metadata = extractMeta(htmlContent, url ?? "");

    // Return structured response
    return res.json({
      ...metadata,
      _debug: { receivedUrl: url, receivedRawHtml: Boolean(raw_html) },
    });
  } catch (error: any) {
    console.error("Error in extractPreview:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
