"use client";

import Script from "next/script";

const MONETAG_ZONE_ID = process.env.NEXT_PUBLIC_MONETAG_SITE_ID || "";
const MULTITAG_SRC = "https://quge5.com/88/tag.min.js";

export default function MonetagAd() {
  if (!MONETAG_ZONE_ID) return null;

  return (
    <Script
      src={MULTITAG_SRC}
      data-zone={MONETAG_ZONE_ID}
      strategy="afterInteractive"
      data-cfasync="false"
      async
    />
  );
}
