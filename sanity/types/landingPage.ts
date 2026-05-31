// Manually defined types matching the Sanity schema for the landing page.
// When typegen is configured, replace this with the auto-generated types.

export interface StatItem {
  _key?: string;
  value: number;
  suffix?: string | null;
  label?: string | null;
}

export interface PillarItem {
  _key?: string;
  name?: string | null;
  description?: string | null;
}

export interface CmsLogo {
  _key?: string;
  alt?: string | null;
  height?: number | null;
  imageUrl?: string | null;
}

export interface NavLink {
  _key?: string;
  title?: string | null;
  href?: string | null;
}

export interface AiLayer {
  _key?: string;
  title?: string | null;
  sub?: string | null;
  width?: string | null;
}

export interface EcosystemPillar {
  _key?: string;
  id?: string | null;
  label?: string | null;
  name?: string | null;
  description?: string | null;
}

export interface SegmentItem {
  _key?: string;
  id?: string | null;
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

export interface FeatureItem {
  _key?: string;
  title?: string | null;
  desc?: string | null;
}

export interface FooterLinkGroup {
  _key?: string;
  heading?: string | null;
  links?: NavLink[] | null;
}

export interface SocialLink {
  _key?: string;
  platform?: string | null;
  href?: string | null;
  label?: string | null;
}

export interface LandingPageData {
  hero?: {
    headlineLine1?: string | null;
    headlineLine2?: string | null;
    pills?: string[] | null;
  } | null;

  harvardStats?: {
    eyebrow?: string | null;
    headline?: string | null;
    stats?: StatItem[] | null;
  } | null;

  threePillars?: {
    headlineLines?: string[] | null;
    description?: string | null;
    hubLabel?: string | null;
    pillars?: PillarItem[] | null;
  } | null;

  worldGlobe?: {
    eyebrow?: string | null;
    countriesCount?: string | null;
    description?: string | null;
  } | null;

  partnersMarquee?: {
    label?: string | null;
    logos?: CmsLogo[] | null;
  } | null;

  navbar?: {
    loginLabel?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
    links?: NavLink[] | null;
  } | null;

  aiAnatomy?: {
    eyebrow?: string | null;
    headline?: string | null;
    description?: string | null;
    layers?: AiLayer[] | null;
  } | null;

  ecosystemHub?: {
    eyebrow?: string | null;
    headlineLine1?: string | null;
    headlineLine2?: string | null;
    pillars?: EcosystemPillar[] | null;
  } | null;

  segmentsCarousel?: {
    eyebrow?: string | null;
    headline?: string | null;
    description?: string | null;
    segments?: SegmentItem[] | null;
  } | null;

  casesSection?: {
    eyebrow?: string | null;
    headline?: string | null;
  } | null;

  finalCta?: {
    eyebrow?: string | null;
    question1?: string | null;
    question2?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
  } | null;

  deskExperience?: {
    heroLine1?: string | null;
    heroLine2?: string | null;
    eyebrow?: string | null;
    headline?: string | null;
    body1?: string | null;
    body2?: string | null;
    locationBadge?: string | null;
    features?: FeatureItem[] | null;
  } | null;

  footer?: {
    tagline?: string | null;
    phone?: string | null;
    email?: string | null;
    addressHQ?: string | null;
    addressExp?: string | null;
    cnpj?: string | null;
    copyright?: string | null;
    madeWith?: string | null;
    linkGroups?: FooterLinkGroup[] | null;
    socials?: SocialLink[] | null;
  } | null;
}
