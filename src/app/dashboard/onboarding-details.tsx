import { auth, clerkClient } from "@clerk/nextjs/server";

export function OnboardingDetails() {
  const { userId } = auth()
  const user = clerkClient.users.getUser(userId);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg" style={{ boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)` }}>
      <div className="flex p-8">
        <h3 className="text-xl leading-6 font-semibold text-gray-900 my-auto">Public Metadata</h3>
      </div>
      <div className="pb-6 max-h-96">
        <dl>
          <div className="px-8 py-2">
            <dt className="text-sm font-semibold">Onboarding Completed?</dt>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
              {user?.publicMetadata?.onboardingComplete ? "Yes" : "No"}
            </dd>
          </div>
          <div className="px-8 py-2">
            <dt className="text-sm font-semibold">Application Name</dt>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
              {user?.publicMetadata?.applicationName}
            </dd>
          </div>
          <div className="px-8 py-2">
            <dt className="text-sm font-semibold">Application Type</dt>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
              {user?.publicMetadata?.applicationType}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
