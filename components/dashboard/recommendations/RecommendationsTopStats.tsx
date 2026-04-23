import type { RecommendationStat } from "@/lib/recommendations";

type RecommendationsTopStatsProps = {
  stats: RecommendationStat[];
};

export default function RecommendationsTopStats({
  stats,
}: RecommendationsTopStatsProps) {
  return (
    <section className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.id}
          className="flex flex-col justify-center rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] px-4 py-2 sm:px-5 sm:py-2.5"
        >
          <p className="text-[9px] font-bold uppercase tracking-wider text-[color:var(--muted)]">
            {stat.label}
          </p>

          <p className="flex items-baseline gap-1 text-lg font-black tracking-tight text-foreground sm:text-[22px]">
            <span>{stat.value}</span>

            {stat.accentText && (
              <span className="text-[color:var(--status-optimal)]">
                {stat.accentText}
              </span>
            )}

            {stat.trailingText && (
              <span className="text-sm font-medium tracking-normal text-[color:var(--muted)]">
                {stat.trailingText}
              </span>
            )}
          </p>
        </article>
      ))}
    </section>
  );
}
