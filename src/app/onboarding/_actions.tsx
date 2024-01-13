"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const { data, errors } = await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      onboardingComplete: true,
      applicationName: formData.get("applicationName"),
      applicationType: formData.get("applicationType"),
    },
  });
  if (data) {
    // const res = data.publicMetadata
    return { message: data.publicMetadata };
  }
  if (errors) {
    return { error: errors[0].longMessage };
  }
};
