import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import Mockup from "./Mockup";

export default function Hero() {
  return (
    <section
      id="top"
      className="
        relative isolate flex min-h-screen items-center overflow-hidden
        px-6 pt-32 pb-20
      "
    >
      {/* Drenched background */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(26,77,255,0.25),transparent_60%),radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(26,77,255,0.08),transparent_70%)]
        "
      />
      <div aria-hidden="true" className="hero-grid-bg absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="
          absolute bottom-0 inset-x-0 -z-10 h-[200px]
          bg-[linear-gradient(to_bottom,transparent,var(--color-bg))]
        "
      />

      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <span className="
              reveal in
              inline-flex items-center gap-2 rounded-full border border-border
              bg-surface/60 px-3.5 py-1.5 font-mono text-[0.7rem] uppercase
              tracking-[0.25em] text-text-muted backdrop-blur-md
            ">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
              Produto · ITSM
            </span>

            <h1
              className="reveal mt-6 text-[clamp(2.5rem,6vw,5rem)]"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              ITSM estratégico,<br />
              certificado pela{" "}
              <em className="not-italic text-accent-2">ITIL 5</em><br />
              com IA nativa.
            </h1>

            <p
              className="reveal mt-7 max-w-[560px] text-lg leading-relaxed text-text-muted"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              A operação de TI deixa de ser reativa e passa a ser orientada
              por dados, governança estruturada e inteligência contínua.
            </p>

            <div
              className="reveal mt-10 flex flex-wrap gap-3"
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              <Link href="#faq-cta" className={buttonClasses({ variant: "primary" })}>
                Fale com um especialista
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="#demo" className={buttonClasses({ variant: "ghost" })}>
                Ver demo
              </Link>
            </div>

            <ul
              className="
                reveal mt-10 flex flex-wrap gap-x-8 gap-y-5
                font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text-muted
              "
              style={{ "--delay": "320ms" } as React.CSSProperties}
            >
              {["12 práticas ITIL 5", "IA nativa", "60+ países", "LGPD · ISO 27001"].map((b) => (
                <li key={b} className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal"
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            <Mockup />
          </div>
        </div>
      </div>
    </section>
  );
}
