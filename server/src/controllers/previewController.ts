
import { Request, Response } from "express";
import { extractMeta } from "../utils/htmlExtractor";
import { fetchHtml } from "../utils/urlFetcher";

export const extractPreview = async (req: Request, res: Response) => {
  try {
    const { url, raw_html } = req.body;

    if (!url && !raw_html) {
      return res
        .status(400)
        .json({ error: "Please provide either a 'url' or 'raw_html'" });
    }

    let htmlContent: string;

    if (raw_html) {
      // Use provided HTML directly
      htmlContent = raw_html;
    } else {
      try {
        // Use centralized fetcher with all validations
        htmlContent = await fetchHtml(url);
      } catch (err: any) {
        return res.status(400).json({
          error: "Failed to fetch URL",
          details: err.message,
        });
      }
    }

    const metadata = extractMeta(htmlContent, url);

    return res.json({
      ...metadata,
      _debug: {
        receivedUrl: url,
        receivedRawHtml: Boolean(raw_html),
      },
    });
  } catch (error: any) {
    console.error("Error in extractPreview:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
