// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  BASE_URL: process.env.BASE_URL || "http://localhost:3333/api",
  QUERY_DEVTOOLS: false,
  playerPortalUrl: "http://localhost:4002",
} as const;
