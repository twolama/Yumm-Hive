import { MoreHorizontal } from "lucide-react";
import type { EfficiencyPoint } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type AnalyticsEfficiencyListProps = {
  rows: EfficiencyPoint[];
};

const DOT_TONES: Record<EfficiencyPoint["tone"], string> = {
  optimal: "bg-[#346b3e]",
  warning: "bg-[#d59a35]",
  watch: "bg-[#8d6f40]",
};

export default function AnalyticsEfficiencyList({ rows }: AnalyticsEfficiencyListProps) {
  const max = Math.max(...rows.map((row) => row.valueKg), 1);

  return (
    <section className="rounded-[26px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-4 sm:p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <h3 className="text-xl font-black text-foreground">Apiary Efficiency</h3>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[color:var(--muted)] hover:bg-[color:var(--surface-2)] hover:text-foreground"
          aria-label="Open efficiency options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <ul className="space-y-4">
        {rows.map((row) => {
          const width = `${Math.max((row.valueKg / max) * 100, 20)}%`;

          return (
            <li key={row.name} className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT_TONES[row.tone])} />
                <span className="truncate text-sm font-semibold text-[#373a36] dark:text-foreground">{row.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-12 text-right text-xs font-bold text-[#3f433f] dark:text-[color:var(--muted)]">{row.valueKg}kg</span>
                <div className="h-[4px] w-24 overflow-hidden rounded-full bg-[#ecebe8] dark:bg-[color:var(--surface-3)]">
                  <div className="h-full rounded-full bg-[#8b5d03]" style={{ width }} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
