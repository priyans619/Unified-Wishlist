// networkGuard.ts
import { URL } from "url";
import dns from "dns/promises";


//  * Validates that a URL is safe to fetch:
//  * - Uses http/https only
//  * - Host resolves to a public IP (not localhost/private/internal)
 
export async function validateSafeUrl(inputUrl: string): Promise<void> {
  let url: URL;
  try {
    url = new URL(inputUrl);
  } catch {
    throw new Error("Invalid URL format");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP/HTTPS protocols are allowed");
  }

  const host = url.hostname;

  // Resolve IP addresses
  const addresses = await dns.lookup(host, { all: true });

  for (const addr of addresses) {
    if (isPrivateIp(addr.address)) {
      throw new Error("Blocked unsafe private/internal IP address");
    }
  }
}


//  Checks if IP is private, loopback, or reserved

function isPrivateIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" || // localhost
    ip === "::1" ||       // IPv6 localhost
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.") && (() => {
      const second = parseInt(ip.split(".")[1], 10);
      return second >= 16 && second <= 31;
    })() ||
    ip.startsWith("169.254.") // link-local
  );
}
