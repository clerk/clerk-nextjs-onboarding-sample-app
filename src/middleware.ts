import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isProtectedRoute = createRouteMatcher(["/dashboard", "/onboarding"])


// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware


export default clerkMiddleware((auth, req) => {
  const userAuth = auth();
  const isOnboarding = req.nextUrl.pathname === "/onboarding";

  // If user is logged in
  if (userAuth.userId) {

    // If visiting /onboarding and onboarding is not complete, redirect
    if (!isOnboarding && userAuth.sessionClaims?.metadata?.onboardingComplete !== true) {
      const onboardingUrl = new URL("/onboarding", req.url);
      return NextResponse.redirect(onboardingUrl)
    }

    // If onboarding is complete or visiting another page, proceed
    return NextResponse.next();
  }

  // If user is not logged in and visiting a protected route, redirect to sign in
  if (isProtectedRoute(req)) {
    return userAuth.redirectToSignIn();
  }

  // User isn't logged in and the route is public - let them visit it
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
