import { VALUE_CHAIN } from "@/itsm/lib/data";

export default function ValueChain() {
  return (
    <div
      className="reveal relative"
      style={{ "--delay": "120ms" } as React.CSSProperties}
    >
      <ol className="vc-list relative flex flex-col">
        {VALUE_CHAIN.map((it, i) => (
          <li
            key={it.i}
            className="vc-item relative grid grid-cols-[3.5rem_1fr] items-baseline gap-6 py-5"
            style={{ "--delay": `${160 + i * 80}ms` } as React.CSSProperties}
          >
            <span className="font-mono text-[0.72rem] tracking-[0.22em] text-text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="text-[1.4rem] font-extralight leading-tight tracking-[-0.018em]">
                {it.i}
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
