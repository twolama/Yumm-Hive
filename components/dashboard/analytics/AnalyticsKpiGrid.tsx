import type { AnalyticsKpi } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type AnalyticsKpiGridProps = {
  kpis: AnalyticsKpi[];
};

const BORDER_ACCENTS: Record<AnalyticsKpi["accent"], string> = {
  yield: "border-b-[#efc680]",
  health: "border-b-[#4f8f57]",
  hives: "border-b-[#d8b270]",
  risk: "border-b-[#9ab391]",
};

export default function AnalyticsKpiGrid({ kpis }: AnalyticsKpiGridProps) {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <article
          key={kpi.id}
          className={cn(
            "rounded-[22px] border border-[color:var(--border-soft)] border-b-[3px] bg-[color:var(--surface-1)] px-4 py-4 sm:px-5 sm:py-5",
            BORDER_ACCENTS[kpi.accent]
          )}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--muted)]">{kpi.label}</p>

          <div className="mt-2 flex items-end gap-1.5">
            <p className="text-[32px] font-black leading-none text-foreground">{kpi.value}</p>
            {kpi.unit ? <span className="pb-1 text-sm font-semibold text-[color:var(--muted)]">{kpi.unit}</span> : null}
          </div>

          {kpi.accent === "health" ? (
            <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-[#dfe6dd]">
              <div className="h-full rounded-full bg-[#3f7d49]" style={{ width: "94%" }} />
            </div>
          ) : null}

          {kpi.accent === "hives" ? (
            <div className="mt-3 flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#346b3e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d5a84d]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e5d7be]" />
            </div>
          ) : null}

          <p
            className={cn(
              "mt-3 text-xs font-semibold",
              kpi.accent === "yield" || kpi.accent === "risk"
                ? "text-[#3f7d49]"
                : "text-[color:var(--muted)]"
            )}
          >
            {kpi.note}
          </p>
        </article>
      ))}
    </section>
  );
}
