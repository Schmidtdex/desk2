import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { NavBar } from "@/components/layout/NavBar";
import { FooterFull } from "@/components/layout/FooterFull";
import { DisableDraftMode } from "@/components/ui/DisableDraftMode";
import { sanityFetch } from "@/sanity/lib/live";
import { LANDING_PAGE_QUERY } from "@/sanity/queries/landingPage";
import type { LandingPageData } from "@/sanity/types/landingPage";

/**
 * Site layout — wraps all routes under app/(site)/ (the main website).
 * Provides NavBar + smooth scroll. Does NOT apply to /studio.
 *
 * Fetches the landing page CMS data here (server component) so it can be
 * passed to NavBar and FooterFull which are "use client" components.
 */
export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isDraftMode = (await draftMode()).isEnabled;

  let cmsData: LandingPageData | null = null;
  try {
    const { data } = await sanityFetch({ query: LANDING_PAGE_QUERY });
    cmsData = data as LandingPageData;
  } catch {
    // Sanity not configured yet — components will use their static defaults
  }

  return (
    <LenisProvider>
      <NavBar data={cmsData?.navbar} />
      {children}
      <FooterFull data={cmsData?.footer} />

      {isDraftMode && (
        <>
          {/* Click-to-edit overlays — only active inside Presentation Tool iframe */}
          <VisualEditing />
          {/* Exit button — shown when browsing the site directly in Draft Mode */}
          <DisableDraftMode />
        </>
      )}
    </LenisProvider>
  );
}
