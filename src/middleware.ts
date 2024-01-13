import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard", "/onboarding"]);

export default clerkMiddleware((auth, req) => {
  // If user is logged in and visiting /onboarding, don't redirect
  // This prevents a redirect loop
  if (auth().userId && req.nextUrl.pathname === "/onboarding") {
    return NextResponse.next();
  }

  // Check if a logged in user has completed onboarding
  // If not, redirect the user to the onboarding route
  if (
    auth().userId &&
    auth().sessionClaims?.metadata.onboardingComplete !== true
  ) {
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // Check if the user visiting a protected route is logged in
  // If not, redirect the user to the sign-in route
  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }

  // User isn't logged in and the route is public -- let them visit it
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
