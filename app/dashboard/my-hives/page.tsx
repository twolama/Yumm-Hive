import Link from "next/link";
import { Plus, Search, SlidersHorizontal, ArrowUpDown, CheckCircle2 } from "lucide-react";
import HiveCard from "@/components/dashboard/hives/HiveCard";
import DeployHiveTile from "@/components/dashboard/hives/DeployHiveTile";
import InsightPanel from "@/components/dashboard/hives/InsightPanel";
import { HIVE_SUMMARIES } from "@/lib/hives";

type MyHivesPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MyHivesPage({ searchParams }: MyHivesPageProps) {
  const query = await searchParams;
  const registered = query.registered === "1";
  const hiveNameParam = Array.isArray(query.hiveName) ? query.hiveName[0] : query.hiveName;
  const hiveName = typeof hiveNameParam === "string" && hiveNameParam.trim().length > 0 ? hiveNameParam : "Hive";

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-6 pb-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-[color:var(--muted)]">
              Digital Apiary Management
            </p>
            <h1 className="mt-1 text-4xl md:text-[42px] leading-tight font-black tracking-tight text-foreground">
              My Hives
            </h1>
          </div>

          <Link
            href="/dashboard/my-hives/new"
            className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] px-4 py-3 text-sm font-semibold text-foreground hover:border-[color:var(--primary)]/50 hover:bg-[color:var(--surface-2)] transition-colors"
          >
            <Plus className="h-4 w-4 text-[color:var(--status-critical)]" />
            Deploy New Hive
          </Link>
        </div>

        {registered && (
          <div className="rounded-3xl border border-[color:var(--status-optimal)]/30 bg-[color:var(--status-optimal)]/12 px-4 py-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-[color:var(--status-optimal)]" />
              <div>
                <p className="text-sm font-bold text-foreground">Hive registered successfully</p>
                <p className="mt-0.5 text-xs text-[color:var(--muted)]">
                  {hiveName} has been queued for deployment setup.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[560px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
            <input
              type="text"
              placeholder="Search apiaries or hive IDs..."
              className="w-full rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-[color:var(--muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] px-4 py-2 text-xs font-bold text-foreground hover:bg-[color:var(--surface-2)] transition-colors">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[color:var(--muted)]" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] px-4 py-2 text-xs font-bold text-foreground hover:bg-[color:var(--surface-2)] transition-colors">
              <ArrowUpDown className="h-3.5 w-3.5 text-[color:var(--muted)]" />
              Sort
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {HIVE_SUMMARIES.map((hive) => (
          <HiveCard
            key={hive.id}
            id={hive.id}
            location={hive.location}
            status={hive.status}
            colonyStrength={hive.colonyStrength}
            capacity={hive.capacity}
            temperatureC={hive.temperatureC}
            humidityPct={hive.humidityPct}
          />
        ))}

        <DeployHiveTile />
      </section>

      <InsightPanel />
    </div>
  );
}
