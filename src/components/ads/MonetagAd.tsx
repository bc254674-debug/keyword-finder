"use client";

import Script from "next/script";

export default function MonetagAd() {
  return (
    <>
      {/* Push Notifications */}
      <Script
        src="https://5gvci.com/act/files/tag.min.js?z=11028376"
        strategy="afterInteractive"
        data-cfasync="false"
        async
      />

      {/* In-Page Push */}
      <Script id="inpage-push" strategy="afterInteractive">
        {`(function(s){s.dataset.zone='11028381',s.src='https://nap5k.com/tag.min.js'})([document.documentElement,document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
      </Script>

      {/* Vignette Banner */}
      <Script id="vignette" strategy="afterInteractive">
        {`(function(s){s.dataset.zone='11028383',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement,document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
      </Script>
    </>
  );
}
