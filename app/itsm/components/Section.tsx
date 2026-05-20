import { ReactNode } from "react";

/**
 * Ring 2 — "Standard Content Section" anatomy.
 * Kicker → headline → optional lead body → content block.
 */
export default function Section({
  id,
  kicker,
  title,
  lead,
  className = "",
  headerClassName = "",
  children,
}: {
  id?: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  headerClassName?: string;
  children: ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative px-6 py-20 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className={`reveal mb-12 max-w-[720px] md:mb-[4.5rem] ${headerClassName}`}>
          <span className="kicker">{kicker}</span>
          <h2 id={headingId} className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-extralight tracking-tight leading-[1.05]">
            {title}
          </h2>
          {lead ? (
            <p className="mt-6 max-w-[580px] text-[1.05rem] leading-relaxed text-text-muted">
              {lead}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
