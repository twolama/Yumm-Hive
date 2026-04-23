import Image from "next/image";
import { Leaf, ShieldCheck } from "lucide-react";

export default function InsightPanel() {
  return (
    <section className="rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-5 md:p-6">
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <span className="inline-flex rounded-full bg-[color:var(--status-warning)]/20 px-3 py-1 text-[10px] font-black tracking-[0.16em] text-[color:var(--status-warning)]">
            YIELD PREDICTION
          </span>

          <h2 className="mt-4 text-3xl leading-tight font-black text-foreground tracking-tight">
            Honey production is up 14% this month.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
            Environmental conditions across Apiary Alpha remain optimal for forage.
            Automated monitors suggest nectar flow peak in 6 days.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-foreground">
            <span className="inline-flex items-center gap-2">
              <Leaf className="h-4 w-4 text-[color:var(--status-optimal)]" />
              +12kg Forecast
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[color:var(--status-warning)]" />
              Peak Clover Season
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] min-h-[190px]">
          <Image
            src="/hives-preview.svg"
            alt="Apiary hives at golden hour"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
