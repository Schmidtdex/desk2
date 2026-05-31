import { defineQuery } from "next-sanity";

export const LANDING_PAGE_QUERY = defineQuery(`
  *[_type == "landingPage"][0] {
    hero {
      headlineLine1,
      headlineLine2,
      pills
    },
    harvardStats {
      eyebrow,
      headline,
      stats[] {
        _key,
        value,
        suffix,
        label
      }
    },
    threePillars {
      headlineLines,
      description,
      hubLabel,
      pillars[] {
        _key,
        name,
        description
      }
    },
    worldGlobe {
      eyebrow,
      countriesCount,
      description
    },
    partnersMarquee {
      label,
      logos[] {
        _key,
        alt,
        height,
        "imageUrl": image.asset->url
      }
    },
    navbar {
      loginLabel,
      ctaLabel,
      ctaHref,
      links[] { _key, title, href }
    },
    aiAnatomy {
      eyebrow,
      headline,
      description,
      layers[] { _key, title, sub, width }
    },
    ecosystemHub {
      eyebrow,
      headlineLine1,
      headlineLine2,
      pillars[] { _key, id, label, name, description }
    },
    segmentsCarousel {
      eyebrow,
      headline,
      description,
      segments[] {
        _key,
        id,
        title,
        description,
        ctaLabel,
        ctaHref,
        "imageUrl": image.asset->url
      }
    },
    casesSection {
      eyebrow,
      headline
    },
    finalCta {
      eyebrow,
      question1,
      question2,
      ctaLabel,
      ctaHref
    },
    deskExperience {
      heroLine1,
      heroLine2,
      eyebrow,
      headline,
      body1,
      body2,
      locationBadge,
      features[] { _key, title, desc }
    },
    footer {
      tagline,
      phone,
      email,
      addressHQ,
      addressExp,
      cnpj,
      copyright,
      madeWith,
      linkGroups[] {
        _key,
        heading,
        links[] { _key, title, href }
      },
      socials[] { _key, platform, href, label }
    }
  }
`);
