import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Disables Next.js Draft Mode.
 * Used by the "Sair do Preview" button when browsing outside the Studio.
 */
export async function GET() {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "http://localhost:3000"));
}
