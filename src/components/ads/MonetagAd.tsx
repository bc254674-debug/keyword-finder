"use client";

import Script from "next/script";

const MONETAG_ZONE_ID = process.env.NEXT_PUBLIC_MONETAG_SITE_ID || "";

export default function MonetagAd() {
  if (!MONETAG_ZONE_ID) return null;

  return (
    <Script
      src={`https://quge5.com/88/tag.min.js`}
      data-zone={MONETAG_ZONE_ID}
      strategy="afterInteractive"
      data-cfasync="false"
      async
    />
  );
}
