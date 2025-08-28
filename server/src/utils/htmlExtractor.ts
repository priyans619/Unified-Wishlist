import * as cheerio from "cheerio";

export interface MetaPreview {
  title?: string;
  image?: string;
  price?: string;
  currency?: string;
  siteName?: string;
  sourceUrl?: string;
}

export const extractMeta = (html: string, url: string): MetaPreview => {
  const $ = cheerio.load(html);

  const title =
    $('meta[property="og:title"]').attr("content") ||
    $('meta[name="twitter:title"]').attr("content") ||
    $("title").text() ||
    "No title";

  const image =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="twitter:image"]').attr("content") ||
    $("img").first().attr("src") ||
    "https://via.placeholder.com/150";

  const price =
    $('meta[property="product:price:amount"]').attr("content") ||
    $('[itemprop="price"]').attr("content") ||
    undefined;

  const currency =
    $('meta[property="product:price:currency"]').attr("content") ||
    $('[itemprop="priceCurrency"]').attr("content") ||
    undefined;

  const siteName =
    $('meta[property="og:site_name"]').attr("content") ||
    new URL(url).hostname;

  return {
    title,
    image,
    price,
    currency,
    siteName,
    sourceUrl: url,
  };
};
