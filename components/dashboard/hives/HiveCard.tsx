import Link from "next/link";
import { Droplets, Thermometer } from "lucide-react";
import type { HiveStatus } from "@/lib/hives";
import { cn } from "@/lib/utils";

type HiveCardProps = {
  id: string;
  location: string;
  status: HiveStatus;
  colonyStrength: number;
  capacity: number;
  temperatureC: number;
  humidityPct: number;
};

const STATUS_LABELS: Record<HiveStatus, string> = {
  healthy: "HEALTHY",
  monitor: "MONITOR",
  alert: "ALERT",
};

const STATUS_STYLES: Record<HiveStatus, string> = {
  healthy: "bg-[color:var(--status-optimal)]/20 text-[color:var(--status-optimal)]",
  monitor: "bg-[color:var(--status-warning)]/20 text-[color:var(--status-warning)]",
  alert: "bg-[color:var(--status-critical)]/15 text-[color:var(--status-critical)]",
};

const BAR_STYLES: Record<HiveStatus, string> = {
  healthy: "bg-[color:var(--status-optimal)]",
  monitor: "bg-[color:var(--status-warning)]",
  alert: "bg-[color:var(--status-critical)]",
};

export default function HiveCard({
  id,
  location,
  status,
  colonyStrength,
  capacity,
  temperatureC,
  humidityPct,
}: HiveCardProps) {
  const ratio = Math.max(0, Math.min(100, (colonyStrength / capacity) * 100));

  return (
    <Link href={`/dashboard/my-hives/${id}`} className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]">
      <article className="rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-4 md:p-5 shadow-[0_10px_24px_rgba(0,0,0,0.04)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:border-[color:var(--primary)]/40">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[30px] leading-none font-black text-foreground tracking-tight">Hive #{id}</h3>
            <p className="mt-1 text-xs font-medium text-[color:var(--muted)]">Apiary {location}</p>
          </div>
          <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider", STATUS_STYLES[status])}>
            {STATUS_LABELS[status]}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--muted)]">
            <span>Colony Strength</span>
            <span className="tracking-normal text-[11px] font-extrabold text-[color:var(--status-warning)]">
              {colonyStrength.toLocaleString()} / {capacity.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-[color:var(--surface-3)] overflow-hidden">
            <div className={cn("h-full rounded-full", BAR_STYLES[status])} style={{ width: `${ratio}%` }} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[color:var(--surface-2)] p-3 border border-[color:var(--border-soft)]/80">
            <div className="flex items-center gap-2 text-[color:var(--status-critical)]">
              <Thermometer className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">Temperature</span>
            </div>
            <p className="mt-2 text-xl font-black leading-none text-foreground">{temperatureC.toFixed(1)} C</p>
          </div>

          <div className="rounded-2xl bg-[color:var(--surface-2)] p-3 border border-[color:var(--border-soft)]/80">
            <div className="flex items-center gap-2 text-[color:var(--status-warning)]">
              <Droplets className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">Humidity</span>
            </div>
            <p className="mt-2 text-xl font-black leading-none text-foreground">{humidityPct}%</p>
          </div>
        </div>

        <div className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] px-4 py-2.5 text-xs font-bold text-foreground transition-colors group-hover:border-[color:var(--primary)]/40 group-hover:bg-[color:var(--surface-3)]">
          View Details
        </div>
      </article>
    </Link>
  );
}
