import { ReactNode } from "react";

/**
 * Standard content section: headline + optional lead + content.
 * No kickers — hierarchy via heading scale only.
 */
export default function Section({
  id,
  title,
  lead,
  centered = false,
  className = "",
  headerClassName = "",
  children,
}: {
  id?: string;
  /** Deprecated — accepted for backward-compat but no longer rendered. */
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  centered?: boolean;
  className?: string;
  headerClassName?: string;
  children: ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  const headerLayout = centered ? "mx-auto text-center" : "";
  const leadLayout = centered ? "mx-auto" : "";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative px-6 py-20 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className={`reveal mb-12 max-w-[720px] md:mb-[4.5rem] ${headerLayout} ${headerClassName}`}>
          <h2 id={headingId} className="text-[clamp(2rem,4.5vw,3.5rem)] font-extralight tracking-tight leading-[1.05]">
            {title}
          </h2>
          {lead ? (
            <p className={`mt-6 max-w-[580px] text-[1.05rem] leading-relaxed text-text-muted ${leadLayout}`}>
              {lead}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
