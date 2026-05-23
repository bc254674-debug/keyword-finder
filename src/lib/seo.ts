const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.keywordfind.asia";

export function alternatesFor(pathname: string) {
  const url = `${BASE_URL}${pathname}`;
  return {
    canonical: url,
    languages: {
      "en-US": url,
      "x-default": url,
    },
  };
}
