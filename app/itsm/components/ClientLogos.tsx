const CLIENTS = [
  "Eurofarma",
  "Convergint",
  "BYD",
  "Petz Cobasi",
];

export default function ClientLogos() {
  return (
    <section
      aria-label="Clientes Desk Manager"
      className="client-band relative px-6 py-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="reveal flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-10">
          <p className="text-[0.85rem] text-text-muted md:max-w-[24ch]">
            Mais de 600 empresas em operação enterprise confiam na Desk Manager.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 md:gap-x-11">
            {CLIENTS.map((name) => (
              <span key={name} className="client-mark">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
