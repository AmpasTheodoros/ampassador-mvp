import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    "/dashboard/:path*", "/integrations/:path*", "/templates/:path*"
  ],
}


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This example assumes you have a way (e.g., via cookies) to determine if onboarding is complete.
export function middleware(req: NextRequest) {
  // Check if the path is one that should be protected (e.g., /dashboard, /integrations, etc.)
  const protectedPaths = ["/dashboard", "/integrations", "/templates", "/reports", "/compliance-plans"];
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // Check for onboarding completion, e.g., a cookie flag or by calling a helper function.
    const onboardingCompleted = req.cookies.get("onboardingCompleted")?.value;
    if (!onboardingCompleted) {
      // Redirect to the onboarding/company-info page
      return NextResponse.redirect(new URL("/onboarding/company-info", req.url));
    }
  }
  return NextResponse.next();
}
