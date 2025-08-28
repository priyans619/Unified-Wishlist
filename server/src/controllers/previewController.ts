import { Request, Response } from "express";
import { extractMeta } from "../utils/htmlExtractor";

export const extractPreview = (req: Request, res: Response) => {
  const { url, raw_html } = req.body;

  if (!url && !raw_html) {
    return res.status(400).json({ error: "url or raw_html required" });
  }

  try {
    const html = raw_html || "";
    const meta = extractMeta(html, url);

    res.json({
      ...meta,
      _debug: { receivedUrl: url, hasRawHtml: Boolean(raw_html) },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to extract preview" });
  }
};
