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
      htmlContent = raw_html;
    } else {
      try {
        htmlContent = await fetchHtml(url);
      } catch (err: any) {
        return res.status(400).json({
          error: "Failed to fetch URL",
          details: err.message,
        });
      }
    }

    //Extract metadata with OG → Twitter → oEmbed → fallback priority
    let metadata;
    try {
      metadata = await extractMeta(htmlContent, url);
    } catch (err: any) {
      console.error("extractMeta failed:", err.message);
      metadata = {
        title: null,
        image: null,
        price: null,
        currency: null,
        siteName: null,
        sourceUrl: url || null,
      };
    }

    // Always return normalized metadata
    return res.json({
      title: metadata?.title || null,
      image: metadata?.image || null,
      price: metadata?.price || null,
      currency: metadata?.currency || null,
      siteName: metadata?.siteName || null,
      sourceUrl: metadata?.sourceUrl || url || null,
      _debug: {
        receivedUrl: url || null,
        receivedRawHtml: Boolean(raw_html),
        extractionSuccess: Boolean(metadata && metadata.title),
      },
    });
  } catch (error: any) {
    console.error("Error in extractPreview:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
