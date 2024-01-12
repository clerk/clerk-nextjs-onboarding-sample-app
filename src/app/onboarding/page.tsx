"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await completeOnboarding(formData);
    await user?.reload();
    router.push("/dashboard");
  };
  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <div className="mx-auto bg-white overflow-hidden rounded-lg shadow-lg max-w-sm">
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900">Welcome!</h3>
        </div>
        <form action={handleSubmit}>
          <div className="space-y-4 px-8 pb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                {" "}
                Application Name{" "}
              </label>
              <p className="text-xs text-gray-500">
                Enter the name of your application.
              </p>
              <input
                type="text"
                name="applicationName"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Application Type
              </label>
              <p className="text-xs text-gray-500">
                Describe the type of your application.
              </p>
              <input
                type="text"
                name="applicationType"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="px-8 py-4 bg-gray-50">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
