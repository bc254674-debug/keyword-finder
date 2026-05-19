"use client";

import Script from "next/script";

const ADSTERRA_SRC =
  "https://pl29496837.effectivecpmnetwork.com/72262b8c4ce66778b048d44836af0444/invoke.js";
const CONTAINER_ID = "container-72262b8c4ce66778b048d44836af0444";

export { CONTAINER_ID as adsterraContainerId };

export default function AdsterraAd() {
  return (
    <Script
      src={ADSTERRA_SRC}
      strategy="afterInteractive"
      data-cfasync="false"
      async
    />
  );
}
