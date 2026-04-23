import Link from "next/link";
import {
  BookOpen,
  MessageCircleQuestion,
  LifeBuoy,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
} from "lucide-react";

const HELP_TOPICS = [
  {
    title: "Getting Started",
    description:
      "Understand dashboard navigation, hive onboarding, and daily monitoring basics.",
    icon: BookOpen,
  },
  {
    title: "Sensor Diagnostics",
    description:
      "Learn how to interpret signal issues, delayed telemetry, and data quality alerts.",
    icon: Cpu,
  },
  {
    title: "Access and Security",
    description:
      "Manage account protection, password resets, and safe team collaboration practices.",
    icon: ShieldCheck,
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-6 pb-8 sm:space-y-8">
      <section className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-[color:var(--muted)]">
          Support Center
        </p>
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
          Help and Guidance
        </h1>
        <p className="max-w-2xl text-base font-medium text-[color:var(--muted)] sm:text-lg">
          Find quick answers, operational guidance, and direct support channels
          for your digital apiary.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {HELP_TOPICS.map((topic) => {
          const Icon = topic.icon;

          return (
            <article
              key={topic.title}
              className="rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-5"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] text-[color:var(--primary)]">
                <Icon className="h-5 w-5" />
              </div>

              <h2 className="mt-4 text-lg font-extrabold text-foreground">
                {topic.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {topic.description}
              </p>
            </article>
          );
        })}
      </section>

      <section className="rounded-[30px] border border-[color:var(--feed-border)]/70 bg-[color:var(--feed-bg)]/20 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Need direct assistance?
            </h2>
            <p className="mt-1 text-sm text-[color:var(--muted)] sm:text-base">
              Reach support or open a recommendations session for guided actions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/recommendations"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-[color:var(--surface-2)]"
            >
              <MessageCircleQuestion className="h-4 w-4 text-[color:var(--primary)]" />
              Ask Recommendations
            </Link>
            <Link
              href="mailto:support@yumm.io"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-bold text-[color:var(--primary-foreground)] transition-opacity hover:opacity-90"
            >
              <LifeBuoy className="h-4 w-4" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-5 sm:p-6">
        <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Quick Paths
        </h3>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link
            href="/dashboard/my-hives"
            className="group rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] px-4 py-3 transition-colors hover:bg-[color:var(--surface-3)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-foreground">
                Review My Hives
              </span>
              <ArrowUpRight className="h-4 w-4 text-[color:var(--muted)] transition-colors group-hover:text-foreground" />
            </div>
          </Link>

          <Link
            href="/dashboard/analytics"
            className="group rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] px-4 py-3 transition-colors hover:bg-[color:var(--surface-3)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-foreground">
                Open Analytics
              </span>
              <ArrowUpRight className="h-4 w-4 text-[color:var(--muted)] transition-colors group-hover:text-foreground" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}