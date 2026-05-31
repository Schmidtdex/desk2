export const metadata = {
  title: "Desk Manager — Sanity Studio",
  robots: { index: false },
};

/**
 * Studio layout — intentionally bare.
 * The root layout (app/layout.tsx) provides the <html>/<body> shell.
 * NavBar and LenisProvider are in app/(site)/layout.tsx and do NOT apply here.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
