import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Droplets, Thermometer, Activity, BarChart3, Leaf, MapPinned, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getHiveById, getHiveIds } from "@/lib/hives";
import HiveTagCard from "@/components/dashboard/hives/HiveTagCard";

type HiveDetailPageProps = {
  params: Promise<{ id: string }>;
};

const STATUS_LABELS = {
  healthy: "THRIVING",
  monitor: "WATCHLIST",
  alert: "CRITICAL",
} as const;

const STATUS_STYLES = {
  healthy: "bg-[color:var(--status-optimal)]/15 text-[color:var(--status-optimal)]",
  monitor: "bg-[color:var(--status-warning)]/15 text-[color:var(--status-warning)]",
  alert: "bg-[color:var(--status-critical)]/15 text-[color:var(--status-critical)]",
} as const;

const STATUS_DOTS = {
  healthy: "bg-[color:var(--status-optimal)]",
  monitor: "bg-[color:var(--status-warning)]",
  alert: "bg-[color:var(--status-critical)]",
} as const;

export function generateStaticParams() {
  return getHiveIds().map((id) => ({ id }));
}

function StatTile({
  icon: Icon,
  label,
  value,
  tone,
  note,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  tone: string;
  note: string;
}) {
  return (
    <div className="rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-full", tone)}>
          <Icon className="h-5 w-5 text-foreground" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]">{label}</p>
          <p className="mt-1 text-2xl font-black leading-none text-foreground">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-xs font-medium text-[color:var(--muted)]">{note}</p>
    </div>
  );
}

function RecommendationRow({
  label,
  title,
  reasoning,
  impactScore,
  impactLabel,
  statusTone,
}: {
  label: string;
  title: string;
  reasoning: string;
  impactScore: number;
  impactLabel: string;
  statusTone: keyof typeof STATUS_LABELS;
}) {
  return (
    <div className="grid gap-4 rounded-[28px] bg-[color:var(--surface-1)] p-4 md:grid-cols-[1fr_1.6fr_auto] md:items-center md:p-5">
      <div className="space-y-2">
        <span className={cn("inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]", STATUS_STYLES[statusTone])}>
          {label}
        </span>
        <h3 className="text-lg font-black leading-tight text-foreground">{title}</h3>
      </div>

      <p className="text-sm leading-6 text-[color:var(--muted)]">{reasoning}</p>

      <div className="min-w-[120px] text-left md:border-l md:border-[color:var(--border-soft)] md:pl-5 md:text-right">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]">Impact Score</p>
        <p className="mt-1 text-3xl font-black leading-none text-foreground">{impactScore}<span className="text-base text-[color:var(--muted)]">/100</span></p>
        <p className={cn("mt-1 text-[10px] font-black uppercase tracking-[0.18em]", STATUS_STYLES[statusTone])}>{impactLabel}</p>
      </div>
    </div>
  );
}

function ActivityChart({ points }: { points: Array<{ label: string; value: number; highlight?: boolean }> }) {
  const maxValue = Math.max(...points.map((point) => point.value), 1);

  return (
    <div className="rounded-[28px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]">Bee Activity (30 Days)</p>
          <h2 className="mt-1 text-2xl font-black text-foreground">Active Foraging</h2>
        </div>

        <div className="inline-flex rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] p-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--muted)]">
          <span className="rounded-full bg-[color:var(--surface-1)] px-3 py-1.5 text-foreground">Weekly</span>
          <span className="rounded-full bg-[color:var(--primary)] px-3 py-1.5 text-[color:var(--primary-foreground)]">Monthly</span>
        </div>
      </div>

      <div className="flex h-[240px] items-end gap-2 sm:gap-3">
        {points.map((point) => (
          <div key={point.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="w-full flex-1 flex items-end justify-center rounded-full bg-[color:var(--surface-2)]/65 px-[1px] py-1">
              <div
                className={cn(
                  "w-full rounded-full transition-all",
                  point.highlight ? "bg-[color:var(--primary)]" : "bg-[color:var(--surface-3)]"
                )}
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

function LocationCard({ apiary, note }: { apiary: string; note: string }) {
  return (
    <div className="rounded-[28px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.04)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]">Apiary Location</p>
      <div className="mt-3 rounded-[22px] border border-[color:var(--border-soft)] bg-[linear-gradient(135deg,rgba(242,163,22,0.24),rgba(17,23,22,0.16)),linear-gradient(180deg,#37553b,#1a241f)] p-4 text-white">
        <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[color:var(--fg)] w-fit">
          <MapPinned className="h-4 w-4 text-[color:var(--primary)]" />
          {apiary}
        </div>
        <div className="mt-5 h-28 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.28),transparent_35%),linear-gradient(135deg,rgba(68,112,61,0.92),rgba(32,52,29,0.92))] shadow-inner" />
        <p className="mt-4 text-sm leading-6 text-white/85">{note}</p>
      </div>
    </div>
  );
}

export default async function HiveDetailPage({ params }: HiveDetailPageProps) {
  const { id } = await params;
  const hive = getHiveById(id);

  if (!hive) {
    notFound();
  }

  const colonyRatio = Math.max(0, Math.min(100, (hive.colonyStrength / hive.capacity) * 100));

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-6 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Link href="/dashboard/my-hives" className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--muted)] hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            My Hives
          </Link>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[color:var(--muted)]">My Hives / Hive {hive.id}</p>
            <h1 className="mt-1 text-4xl font-black tracking-tight text-foreground md:text-[44px]">Hive Detail</h1>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <span className={cn("inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.16em]", STATUS_STYLES[hive.status])}>
            <span className={cn("h-2.5 w-2.5 rounded-full", STATUS_DOTS[hive.status])} />
            {STATUS_LABELS[hive.status]}
          </span>
          <span className="inline-flex items-center rounded-full border border-[color:var(--primary)]/40 bg-[color:var(--surface-1)] px-4 py-2 text-sm font-bold text-foreground">
            {hive.type}
          </span>
        </div>
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_0.8fr]">
        <div className="rounded-[32px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.04)] md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]">Colony Strength</p>
              <div className="mt-2 flex items-end gap-3">
                <h2 className="text-5xl font-black tracking-tight text-foreground md:text-6xl">{hive.colonyStrength.toLocaleString()}</h2>
                <span className="pb-2 text-base font-semibold text-[color:var(--muted)]">/ {hive.capacity.toLocaleString()} bees</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--muted)]">Growth</p>
                <p className="mt-2 text-2xl font-black text-[color:var(--status-optimal)]">{hive.growthPct > 0 ? "+" : ""}{hive.growthPct}%</p>
                <p className="mt-1 text-xs text-[color:var(--muted)]">Past 7 days</p>
              </div>

              <div className="rounded-[22px] border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--muted)]">Status</p>
                <div className={cn("mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em]", STATUS_STYLES[hive.status])}>
                  <span className={cn("h-2 w-2 rounded-full", STATUS_DOTS[hive.status])} />
                  {STATUS_LABELS[hive.status]}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 h-3 rounded-full bg-[color:var(--surface-3)] overflow-hidden">
            <div className="h-full rounded-full bg-[color:var(--primary)]" style={{ width: `${colonyRatio}%` }} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <StatTile icon={Droplets} label="Humidity" value={`${hive.humidityPct}%`} tone="bg-[color:var(--status-optimal)]/15" note="Stable humidity for the current colony stage." />
          <StatTile icon={Thermometer} label="Internal Temp" value={`${hive.temperatureC.toFixed(1)} C`} tone="bg-[color:var(--status-warning)]/15" note="Brood chamber temperature is within target range." />
          <StatTile icon={Activity} label="Activity" value={hive.activityLevel} tone="bg-[color:var(--primary)]/15" note={`Productivity score ${hive.productivityScore}/100.`} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.55fr]">
        <div className="rounded-[32px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.04)] md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]">Productivity Analysis</p>

          <div className="mt-6 flex flex-col items-center gap-6">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-[conic-gradient(var(--primary)_0%_88%,var(--surface-3)_88%_100%)]">
              <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-[color:var(--surface-1)]">
                <span className="text-5xl font-black tracking-tight text-foreground">{hive.productivityScore}%</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">Score</span>
              </div>
            </div>

            <div className="w-full rounded-[24px] border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]">Est. Honey Yield</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-[color:var(--primary)]">{hive.estimatedYieldKg} <span className="text-base text-[color:var(--muted)]">kg</span></p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatTile icon={BarChart3} label="Hive Model" value={hive.type} tone="bg-[color:var(--primary)]/15" note={hive.inspectionNote} />
            <StatTile icon={Leaf} label="Inspection" value={hive.apiary} tone="bg-[color:var(--status-optimal)]/15" note="Location and growth conditions remain accessible for field review." />
          </div>

          <HiveTagCard hiveId={hive.id} hardwareId={hive.identifier} title={hive.name} description="This unique identifier is linked to your hardware tag and cannot be changed after registration." />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationCard apiary={hive.apiary} note={hive.inspectionNote} />
        <ActivityChart points={hive.activityPoints} />
      </section>

      <section className="rounded-[32px] border border-[color:var(--border-soft)] bg-[color:var(--feed-bg)]/70 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.04)] md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--primary)] text-black">
            <Sparkles className="h-5 w-5 fill-current" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-foreground md:text-3xl">AI Recommendation</h2>
            <p className="mt-1 text-sm text-[color:var(--muted)]">Predictive modeling based on biological and environmental sensors</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {hive.recommendations.map((recommendation) => (
            <RecommendationRow
              key={recommendation.title}
              label={recommendation.label}
              title={recommendation.title}
              reasoning={recommendation.reasoning}
              impactScore={recommendation.impactScore}
              impactLabel={recommendation.impactLabel}
              statusTone={recommendation.statusTone}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
