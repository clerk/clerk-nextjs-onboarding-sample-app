import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { SessionDetails, UserDetails } from "./details";
import { OnboardingDetails } from "./onboarding-details";

async function DashboardContent() {
  // Redirect signed-out users to sign-in
  const { sessionClaims } = await auth.protect()

  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <h1 className="text-3xl font-semibold text-black">
        👋 Hi, {sessionClaims?.firstName || `Stranger`}

      </h1>
      <div className="grid gap-4 mt-8 lg:grid-cols-3">
        <UserDetails />
        <SessionDetails />
        <OnboardingDetails />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
