import Link from "next/link";
import { Compass, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1180px] items-center px-4 py-10 md:px-6 md:py-14 xl:px-8">
      <section className="w-full rounded-[34px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-7 text-center sm:p-10">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] text-[color:var(--primary)]">
          <Compass className="h-6 w-6" />
        </div>

        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[color:var(--muted)] sm:text-base">
          The page you are looking for does not exist or may have been moved.
          Continue to your dashboard workspace or return to the landing page.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-bold text-[color:var(--primary-foreground)] transition-opacity hover:opacity-90 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-[color:var(--surface-3)] sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}