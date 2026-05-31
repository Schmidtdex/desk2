import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

/**
 * Maps each document type to its URL(s) in the Next.js app.
 * The Presentation Tool uses this to know which page to load in the iframe.
 */
export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // The landing page singleton — always renders at "/"
    landingPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [
          {
            title: "Landing Page Principal",
            href: "/",
          },
        ],
      }),
    }),
  },
};
