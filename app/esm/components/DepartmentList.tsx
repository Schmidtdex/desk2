import { DEPARTMENT_AREAS } from "@/esm/lib/data";

/**
 * Departments list — replaces ITSM's "Value Chain" inside the About section.
 * Where ITSM lists the 5 stages of ITIL (Strategy → Improvement),
 * ESM lists the 6 corporate domains a single platform covers.
 */
export default function DepartmentList() {
  return (
    <div
      className="reveal relative"
      style={{ "--delay": "120ms" } as React.CSSProperties}
    >
      <ol className="vc-list relative flex flex-col">
        {DEPARTMENT_AREAS.map((it, i) => (
          <li
            key={it.letter}
            className="vc-item relative grid grid-cols-[3.5rem_1fr] items-baseline gap-6 py-5"
            style={{ "--delay": `${160 + i * 80}ms` } as React.CSSProperties}
          >
            <span className="font-mono text-[0.72rem] tracking-[0.22em] text-text-muted">
              {it.letter}
            </span>

            <div>
              <h3 className="text-[1.4rem] font-extralight leading-tight tracking-[-0.018em]">
                {it.name}
              </h3>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-text-muted">
                {it.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
