"use client";

import {
  type LucideIcon,
  RadioTower,
  Droplet,
  Activity,
  Thermometer,
  Zap,
  Clock,
  Leaf,
  Cloud,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- WIDGET COMPONENTS ---

const StatCard = ({ title, value, unit, highlight, icon: Icon, progressColor }: {
  title: string;
  value: string;
  unit?: string;
  highlight: string;
  icon: LucideIcon;
  progressColor: string;
}) => (
  <div className="bg-[color:var(--surface-1)] rounded-3xl px-5 py-4 border border-[color:var(--border-soft)]/80 relative overflow-hidden min-h-[146px]">
    <div className="absolute top-2 right-2 text-foreground/10 opacity-80">
      <Icon className="w-16 h-16" strokeWidth={1} />
    </div>

    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start mb-5">
        <h3 className="text-xs font-bold text-[color:var(--muted)] uppercase tracking-[0.18em]">{title}</h3>
        <Icon className="w-5 h-5 text-[#F6A021]" />
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl leading-none font-black text-foreground">{value}</span>
          {unit && <span className="text-2xl font-semibold text-[color:var(--muted)]">{unit}</span>}
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              highlight.includes("+") || highlight.includes("Optimal")
                ? "text-[color:var(--status-optimal)]"
                : "text-[color:var(--muted)]"
            )}
          >
            {highlight}
          </span>
          <div className="h-1.5 flex-1 bg-[color:var(--surface-3)] rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full", progressColor)} style={{ width: "70%" }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HiveNode = ({ id, status }: { id: string, status: 'optimal' | 'warning' | 'critical' }) => {
  const statusColors = {
    optimal: "bg-[color:var(--status-optimal)]",
    warning: "bg-[color:var(--status-warning)]",
    critical: "bg-[color:var(--status-critical)]"
  };

  return (
    <div className="bg-[color:var(--surface-1)] border border-[color:var(--border-soft)]/70 hover:border-[color:var(--status-optimal)]/50 transition-colors rounded-full py-2 px-4 flex items-center justify-between cursor-pointer">
      <span className="text-sm font-bold text-[color:var(--muted)]">#{id}</span>
      <div className={cn("w-2.5 h-2.5 rounded-full", statusColors[status])} />
    </div>
  );
};

const FeedCard = ({ icon: Icon, title, desc, tag, tagType }: {
  icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  tagType: string;
}) => {
  const tagStyles: Record<string, string> = {
    PRIORITY: "bg-[#5a3f10] text-[color:var(--status-warning)]",
    WARNING: "bg-[#5a2522] text-[#ffab9f]",
    ROUTINE: "bg-[#1f2835] text-[#7d8ba2]",
    AUTOMATED: "bg-[color:var(--status-automated)]/20 text-[color:var(--status-automated-text)]"
  };

  return (
    <div className="bg-[color:var(--surface-2)] rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between border border-[color:var(--border-soft)]/60 group cursor-pointer hover:border-[color:var(--primary)]/30 transition-colors gap-4">
      <div className="flex items-start sm:items-center gap-4 md:gap-5 min-w-0 w-full">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[color:var(--surface-1)] flex items-center justify-center text-[color:var(--primary)] border border-[color:var(--border-soft)]/80 shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 w-full">
          <h4 className="font-bold text-foreground text-base sm:text-lg leading-tight">{title}</h4>
          <p className="text-sm text-[color:var(--muted)] mt-1 leading-snug">{desc}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4 w-full sm:w-auto shrink-0 pl-[3.75rem] sm:pl-0">
        <span className={cn("text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full", tagStyles[tagType] || "")}>
          {tag}
        </span>
        <div className="w-9 h-9 rounded-full bg-[color:var(--surface-1)] border border-[color:var(--border-soft)]/70 flex items-center justify-center text-[color:var(--muted)] group-hover:text-foreground transition-colors">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-7 pb-8">

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="TOTAL HIVES" value="42" highlight="+3 this month"
          icon={RadioTower} progressColor="bg-[color:var(--status-optimal)]"
        />
        <StatCard
          title="SEASON YIELD" value="1,280" highlight="On track" unit="kg"
          icon={Droplet} progressColor="bg-[color:var(--status-warning)]"
        />
        <StatCard
          title="HEALTH SCORE" value="94" highlight="Optimal Range" unit="%"
          icon={Activity} progressColor="bg-[color:var(--status-optimal)]"
        />
        <StatCard
          title="AMBIENT TEMP" value="24.5" highlight="Stable in valley" unit="C"
          icon={Thermometer} progressColor="bg-[color:var(--muted)]/40"
        />
      </div>

      {/* Hive Fleet Health */}
      <section className="bg-[color:var(--feed-bg)]/10 border border-[color:var(--feed-border)]/40 rounded-3xl p-4 md:p-5">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-3xl leading-tight font-black text-foreground">Hive Fleet Health</h2>
            <p className="text-sm text-[color:var(--primary)]">Real-time status of individual nodes</p>
          </div>
          <button className="text-sm font-bold text-foreground flex items-center gap-1 hover:text-[color:var(--primary)] transition-colors">
            View All Map <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 md:gap-4">
          {Array.from({ length: 16 }).map((_, i) => {
            const id = (i + 1).toString().padStart(2, "0");
            let status: 'optimal' | 'warning' | 'critical' = 'optimal';
            if (id === "03" || id === "11") status = "warning";
            if (id === "06") status = "critical";
            return <HiveNode key={id} id={id} status={status} />;
          })}
        </div>
      </section>

      {/* Intelligence Feed */}
      <section className="bg-[color:var(--feed-bg)] border border-[color:var(--feed-border)] rounded-3xl p-4 md:p-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--primary)]/8 rounded-full blur-3xl -mr-20 -mt-20 opacity-70 pointer-events-none" />

        <div className="flex items-start sm:items-center gap-4 mb-6 relative z-10">
          <div className="w-10 h-10 rounded-full bg-[color:var(--primary)] flex items-center justify-center text-black shadow-md">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">Intelligence Feed</h2>
            <p className="text-sm text-[color:var(--primary)]">AI-driven actionable insights for your apiary</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <FeedCard
            icon={Clock}
            title="Harvest Window: Hive #02"
            desc="Current weight at 45kg (peak capacity). Optimal extraction within 48 hours."
            tag="PRIORITY" tagType="PRIORITY"
          />
          <FeedCard
            icon={Thermometer}
            title="Temp Variance Detected: Hive #06"
            desc="Internal temperature dropped 4°C below baseline. Inspect for entrance blockages."
            tag="WARNING" tagType="WARNING"
          />
          <FeedCard
            icon={Leaf}
            title="Queen Activity Insight"
            desc="Fleet-wide acoustics suggest high brood production. Consider expanding super boxes."
            tag="ROUTINE" tagType="ROUTINE"
          />
          <FeedCard
            icon={Cloud}
            title="Climate Buffer Ready"
            desc="Incoming storm front detected. Systems have pre-adjusted hive ventilation for humidity."
            tag="AUTOMATED" tagType="AUTOMATED"
          />
        </div>
      </section>

    </div>
  );
}
