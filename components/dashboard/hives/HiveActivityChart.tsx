"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ActivityPoint = {
  label: string;
  value: number;
  highlight?: boolean;
};

type HiveActivityChartProps = {
  weeklyPoints: ActivityPoint[];
  monthlyPoints: ActivityPoint[];
};

export default function HiveActivityChart({ weeklyPoints, monthlyPoints }: HiveActivityChartProps) {
  const [range, setRange] = useState<"weekly" | "monthly">("monthly");

  const points = useMemo(() => (range === "weekly" ? weeklyPoints : monthlyPoints), [monthlyPoints, range, weeklyPoints]);
  const maxValue = Math.max(...points.map((point) => point.value), 1);

  return (
    <div className="rounded-[28px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.04)] md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]">Bee Activity (30 Days)</p>
          <h2 className="mt-1 text-2xl font-black text-foreground">Active Foraging</h2>
        </div>

        <div className="inline-flex rounded-full bg-[color:var(--surface-2)] p-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--muted)]">
          <button
            type="button"
            onClick={() => setRange("weekly")}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors",
              range === "weekly" ? "bg-[color:var(--surface-1)] text-foreground" : "text-[color:var(--muted)]"
            )}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setRange("monthly")}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors",
              range === "monthly" ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]" : "text-[color:var(--muted)]"
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="flex h-[240px] items-end gap-2 sm:gap-3">
        {points.map((point) => (
          <div key={point.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
            <div className="flex w-full flex-1 items-end justify-center rounded-full bg-[color:var(--surface-2)]/65 px-[1px] py-1">
              <div
                className={cn("w-full rounded-full transition-all", point.highlight ? "bg-[color:var(--primary)]" : "bg-[color:var(--surface-3)]")}
                style={{ height: `${(point.value / maxValue) * 100}%`, minHeight: "20%" }}
              />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--muted)]">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
