"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { AnalyticsRange } from "@/lib/analytics";
import { getTrendPointsByRange } from "@/lib/analytics";

type AnalyticsTrendPanelProps = {
  initialRange?: AnalyticsRange;
};

const RANGES: AnalyticsRange[] = ["1W", "1M", "3M"];

function buildAreaPath(values: number[], width: number, height: number, topPadding: number, bottomPadding: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1);
  const innerHeight = height - topPadding - bottomPadding;

  const coords = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width;
    const normalized = (value - min) / span;
    const y = topPadding + (1 - normalized) * innerHeight;
    return { x, y };
  });

  const line = coords
    .map((coord, index) => `${index === 0 ? "M" : "L"}${coord.x.toFixed(2)} ${coord.y.toFixed(2)}`)
    .join(" ");

  const area = `${line} L${width} ${(height - bottomPadding + 4).toFixed(2)} L0 ${(height - bottomPadding + 4).toFixed(2)} Z`;

  return { line, area, coords };
}

export default function AnalyticsTrendPanel({ initialRange = "1M" }: AnalyticsTrendPanelProps) {
  const [range, setRange] = useState<AnalyticsRange>(initialRange);
  const series = useMemo(() => getTrendPointsByRange(range), [range]);

  const chart = useMemo(() => {
    const values = series.map((point) => point.value);
    return buildAreaPath(values, 1000, 320, 18, 56);
  }, [series]);

  const activePoint = chart.coords[Math.max(chart.coords.length - 2, 0)];

  return (
    <section className="rounded-[26px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-4 sm:p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-foreground sm:text-2xl">Fleet Performance Overview</h2>
          <p className="mt-1 text-sm text-[color:var(--muted)]">Production trend across all apiary sectors</p>
        </div>

        <div className="inline-flex items-center gap-1 rounded-full bg-[color:var(--surface-2)] p-1">
          {RANGES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={cn(
                "rounded-full px-3 py-1 text-[10px] font-black tracking-[0.14em] transition-colors",
                item === range
                  ? "bg-[#8b5d03] text-white"
                  : "text-[color:var(--muted)] hover:bg-[color:var(--surface-3)]"
              )}
              aria-pressed={item === range}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <svg viewBox="0 0 1000 320" className="h-[300px] w-full sm:h-[330px]" role="img" aria-label="Fleet performance line chart">
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eed8ab" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#eed8ab" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            <path d={chart.area} fill="url(#trendFill)" />
            <path d={chart.line} fill="none" stroke="#8b5d03" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

            {activePoint ? (
              <>
                <circle cx={activePoint.x} cy={activePoint.y} r="9" fill="#f6efe1" stroke="#8b5d03" strokeWidth="3" />
                <circle cx={activePoint.x} cy={activePoint.y} r="3" fill="#8b5d03" />
              </>
            ) : null}

            <line x1="0" y1="264" x2="1000" y2="264" stroke="#ece7db" strokeWidth="2" />
          </svg>

          <div className="-mt-8 grid grid-cols-5 gap-1 px-1 sm:px-2">
            {series.filter((_, index) => index % 2 === 0).map((point) => (
              <span key={point.label} className="text-center text-[10px] font-black tracking-[0.14em] text-[color:var(--muted)]">
                {point.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
