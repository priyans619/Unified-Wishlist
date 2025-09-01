import fetch from "node-fetch";

const FETCH_TIMEOUT_MS = 10000; // Security: timeout prevents hanging requests
const MAX_REDIRECTS = 3;        // Security: limit redirects to prevent abuse

export const fetchWithTimeoutAndRedirects = async (url: string): Promise<string> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      follow: MAX_REDIRECTS, // redirects to max 3
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
};
