export { };

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
    };
    publicMetadata?: {
      applicationName?: string;
    };
  }
}