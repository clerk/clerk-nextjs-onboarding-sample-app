import { useSession, useUser } from "@clerk/nextjs";
import Image from "next/image";

export function UserDetails() {
  const { isLoaded, user } = useUser();

  return (
    <div className="bg-white overflow-hidden rounded-lg shadow" style={{ boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)` }}>
      <div className="flex justify-between items-center p-8">
        <h3 className="text-xl font-semibold text-gray-900">User Info</h3>

      </div>
      {isLoaded && user ? (
        <div className="pb-6 max-h-96">
          <dl className="px-8">

            <div className="py-2">
              <dt className="text-sm font-semibold">User ID</dt>
              <dd className="mt-1 text-sm text-gray-600">
                {user.id}
              </dd>
            </div>
            {user.firstName && (
              <div className="py-2">
                <dt className="text-sm font-semibold">Name</dt>
                <dd className="mt-1 text-sm text-gray-600">
                  {user.firstName} {user.lastName}
                </dd>
              </div>
            )}
            <div className="py-2">
              <dt className="text-sm font-semibold">Email addresses</dt>
              <dd className="mt-1 text-sm text-gray-600">
                {user.emailAddresses.map((email) => (
                  <div key={email.id} className="flex gap-2 mb-1">
                    {email.emailAddress}
                    {user.primaryEmailAddressId === email.id && (
                      <span className="text-xs bg-primary-50 text-primary-700 rounded-2xl px-2 font-medium pt-[2px]">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="text-gray-700 px-4 py-5">Loading user data...</div>
      )}
    </div>
  );
}


export function SessionDetails() {
  const { isLoaded, session } = useSession();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg" style={{ boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)` }}>
      <div className="flex p-8">
        <h3 className="text-xl leading-6 font-semibold text-gray-900 my-auto">Session Info</h3>
      </div>
      {isLoaded && session ? (
        <div className="pb-6 max-h-96">
          <dl>
            <div className="px-8 py-2">
              <dt className="text-sm font-semibold">Session ID</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
                {session.id}
              </dd>
            </div>
            <div className="px-8 py-2">
              <dt className="text-sm font-semibold mb-1">Last Active</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                {session.lastActiveAt.toLocaleString()}
              </dd>
            </div>
            <div className="px-8 py-2">
              <dt className="text-sm font-semibold mb-1">Expiry</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                {session.expireAt.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="text-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Loading session data...</div>
      )}
    </div>
  );
}

export function OnboardingDetails() {
  const { isLoaded, session } = useSession();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg" style={{ boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)` }}>
      <div className="flex p-8">
        <h3 className="text-xl leading-6 font-semibold text-gray-900 my-auto">Public Metadata</h3>
      </div>
      {isLoaded && session ? (
        <div className="pb-6 max-h-96">
          <dl>
          <div className="px-8 py-2">
              <dt className="text-sm font-semibold">Onboarding Completed?</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
                {session.user.publicMetadata.onboardingComplete ? "Yes" : "No"}
              </dd>
            </div>
            <div className="px-8 py-2">
              <dt className="text-sm font-semibold">Application Name</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
                {session.user.publicMetadata.applicationName}
              </dd>
            </div>
            <div className="px-8 py-2">
              <dt className="text-sm font-semibold">Application Type</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
                {session.user.publicMetadata.applicationType}
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="text-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Loading application details...</div>
      )}
    </div>
  );
}
