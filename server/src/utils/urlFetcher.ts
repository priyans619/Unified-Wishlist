import fetch, { Response } from "node-fetch";
import { validateSafeUrl } from "./networkGuard";

const FETCH_TIMEOUT_MS = 5000; // Prevent hanging requests (≤ 5s)
const MAX_REDIRECTS = 3;       // Prevent redirect loops
const MAX_HTML_SIZE = 1024* 3 * 1024; // Security: cap response size (512 KB)
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// Fetch HTML safely with timeout, redirect, size, and content-type checks
export const fetchHtml = async (url: string): Promise<string> => {
  await validateSafeUrl(url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      follow: MAX_REDIRECTS,
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
  } catch (err: any) {
    clearTimeout(timeout);
    throw new Error(`Network error while fetching ${url}: ${err.message}`);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch URL (${response.status}): ${response.statusText}`
    );
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    throw new Error(`Invalid content-type: ${contentType ?? "unknown"}`);
  }

  // Read the body safely with a size check
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > MAX_HTML_SIZE) {
    throw new Error(
      `HTML size exceeds 512 KB limit (received ${(buffer.length / 1024).toFixed(
        1
      )} KB)`
    );
  }

  return buffer.toString("utf-8");
};
