import Link from "next/link";

export default function HiveNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col items-center justify-center rounded-[32px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] px-6 py-16 text-center shadow-[0_10px_24px_rgba(0,0,0,0.04)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[color:var(--muted)]">Hive Detail</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground">Hive not found</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-[color:var(--muted)]">
        The hive you requested does not exist in the current apiary record.
      </p>
      <Link
        href="/dashboard/my-hives"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-bold text-[color:var(--primary-foreground)] transition-colors hover:opacity-90"
      >
        Back to My Hives
      </Link>
    </div>
  );
}