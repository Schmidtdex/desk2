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
            <h1
              className="reveal mt-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.1] tracking-[-0.035em]"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              ITSM estratégico certificado pela{" "}
              <em className="not-italic text-accent-2">ITIL</em>{" "}
              com IA nativa
            </h1>

            <p
              className="reveal mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-text-muted"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              A operação de TI deixa de ser reativa e passa a ser orientada
              por dados, governança estruturada e inteligência contínua
            </p>

            <div
              className="reveal mt-8 flex flex-wrap gap-3"
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              <Link href="#faq-cta" className={buttonClasses({ variant: "primary" })}>
                Fale com um especialista
              </Link>
              <Link href="#demo" className={buttonClasses({ variant: "ghost" })}>
                Ver demo
              </Link>
            </div>
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
