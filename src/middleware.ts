import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIMARY = "www.keywordfind.asia";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  // Allow the primary domain through
  if (host === PRIMARY) return NextResponse.next();

  // Redirect everything else (bare domain, vercel.app, etc.)
  return NextResponse.redirect(
    `https://${PRIMARY}${url.pathname}${url.search}`,
    301,
  );
}

export const config = {
  matcher: [
    "/((?!_next|api|sw\\.js|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)",
  ],
};
