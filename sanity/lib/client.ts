import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-05-20",
  useCdn: true,
  stega: {
    enabled: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL !== undefined,
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "/studio",
  },
});
