import * as cheerio from "cheerio";

export interface MetaPreview {
  title: string | null;
  image: string | null;
  price?: string | null;
  currency?: string | null;
  siteName: string | null;
  sourceUrl: string | null;
  thumbnail_url?: string | null;
  [key: string]: any; // for extra oEmbed fields
}

export const extractMeta = async (html: string, sourceUrl?: string): Promise<MetaPreview> => {
  const $ = cheerio.load(html);

  let metadata: MetaPreview = {
    title: null,
    image: null,
    price: null,
    currency: null,
    siteName: null,
    sourceUrl: sourceUrl || null,
    thumbnail_url: null,
  };

  // 1️⃣ Open Graph
  metadata.title = $('meta[property="og:title"]').attr("content") || metadata.title;
  metadata.image = $('meta[property="og:image"]').attr("content") || metadata.image;
  metadata.price = $('meta[property="product:price:amount"]').attr("content") || metadata.price;
  metadata.currency = $('meta[property="product:price:currency"]').attr("content") || metadata.currency;
  metadata.siteName = $('meta[property="og:site_name"]').attr("content") || metadata.siteName;

  // 2️⃣ Twitter Card fallback
  if (!metadata.title) metadata.title = $('meta[name="twitter:title"]').attr("content") || metadata.title;
  if (!metadata.image) metadata.image = $('meta[name="twitter:image"]').attr("content") || metadata.image;
  if (!metadata.siteName) metadata.siteName = $('meta[name="twitter:site"]').attr("content") || metadata.siteName;

  // 3️⃣ oEmbed discovery
  const oembedUrl = $('link[type="application/json+oembed"]').attr("href");
  if (oembedUrl) {
    try {
      const res = await fetch(oembedUrl);
      const oembedData: any = await res.json();
      metadata.title = metadata.title || oembedData.title || null;
      metadata.siteName = metadata.siteName || oembedData.provider_name || null;
      metadata.image = metadata.image || oembedData.thumbnail_url || null;
    } catch {
      // silently fail
    }
  }

  // 4️⃣ Site-specific selectors with currency parsing
  if (sourceUrl?.includes("flipkart.com")) {
    metadata.title = metadata.title || $(".B_NuCI").first().text().trim() || metadata.title;
    const priceText = $("._30jeq3").first().text().trim();
    if (priceText) {
      const match = priceText.match(/(\$|₹|€|£)\s?([\d.,]+)/);
      if (match) {
        metadata.currency = match[1];
        metadata.price = match[2].replace(/,/g, "");
      }
    }
    metadata.image = metadata.image || $("._396cs4 img").first().attr("src") || metadata.image;
    metadata.siteName = "Flipkart";
  } else if (sourceUrl?.includes("amazon.in")) {
    const priceText = $("#priceblock_ourprice, #priceblock_dealprice, .a-price .a-offscreen")
      .first()
      .text()
      .trim();
    if (priceText) {
      const match = priceText.match(/(\$|₹|€|£)\s?([\d.,]+)/);
      if (match) {
        metadata.currency = match[1];
        metadata.price = match[2].replace(/,/g, "");
      }
    }
    metadata.title = metadata.title || $("#productTitle").text().trim() || metadata.title;
    metadata.image = metadata.image || $("#landingImage, #imgTagWrapperId img").first().attr("src") || metadata.image;
    metadata.siteName = "Amazon";
  } else if (sourceUrl?.includes("nike.com")) {
    const priceText = $('div[data-test="product-price"]').first().text().trim();
    if (priceText) {
      const match = priceText.match(/(\$|₹|€|£)?\s?([\d.,]+)/);
      if (match) {
        metadata.currency = match[1] || "₹"; // default ₹ if missing
        metadata.price = match[2].replace(/,/g, "");
      }
    }
    metadata.title = metadata.title || $('h1[data-test="product-title"]').text().trim() || metadata.title;
    metadata.image = metadata.image || $('img[data-test="product-image"]').first().attr("src") || metadata.image;
    metadata.siteName = "Nike";
  } else if (sourceUrl?.includes("myntra.com")) {
    const priceText = $('span.pdp-price').first().text().trim();
    if (priceText) {
      const match = priceText.match(/(\$|₹|€|£)?\s?([\d.,]+)/);
      if (match) {
        metadata.currency = match[1] || "₹";
        metadata.price = match[2].replace(/,/g, "");
      }
    }
    metadata.title = metadata.title || $('h1.pdp-title').text().trim() || metadata.title;
    metadata.image = metadata.image || $('img.pdp-image').first().attr("src") || metadata.image;
    metadata.siteName = "Myntra";
  }

  // 5️⃣ Generic fallbacks
  if (!metadata.title) metadata.title = $("title").text().trim() || null;
  if (!metadata.image) metadata.image = $("img").first().attr("src") || null;

  // Try extracting price and currency from body text if still missing
  if (!metadata.price) {
    const bodyText = $("body").text();
    const priceMatch = bodyText.match(/(\$|₹|€|£)\s?([\d.,]+)/);
    if (priceMatch) {
      metadata.currency = metadata.currency || priceMatch[1];
      metadata.price = priceMatch[2].replace(/,/g, "");
    }
  }

  // 6️⃣ Filter placeholder or 404 pages
  const invalidTitles = ["page not found", "product not found", "error"];
  if (metadata.title && invalidTitles.some(t => metadata.title?.toLowerCase().includes(t))) {
    metadata.title = null;
    metadata.price = null;
    metadata.currency = null;
    metadata.image = null;
    metadata.siteName = null;
  }

  // 7️⃣ Thumbnail
  metadata.thumbnail_url = metadata.image || null;

  return metadata;
};
