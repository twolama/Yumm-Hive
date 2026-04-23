import Link from "next/link";
import { Plus } from "lucide-react";

export default function DeployHiveTile() {
  return (
    <Link
      href="/dashboard/my-hives/new"
      className="group rounded-3xl border border-dashed border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-5 min-h-[292px] flex flex-col items-center justify-center text-center hover:border-[color:var(--primary)]/60 hover:bg-[color:var(--surface-2)] transition-colors"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--surface-2)] text-[color:var(--primary)] border border-[color:var(--border-soft)] group-hover:bg-[color:var(--primary)] group-hover:text-[color:var(--primary-foreground)] transition-colors">
        <Plus className="h-5 w-5" />
      </span>
      <p className="mt-4 text-base font-extrabold text-foreground">Deploy New Hive</p>
      <p className="mt-1 text-xs text-[color:var(--muted)]">Initialize sensor array</p>
    </Link>
  );
}
