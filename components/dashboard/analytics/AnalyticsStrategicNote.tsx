import { Zap } from "lucide-react";

type AnalyticsStrategicNoteProps = {
  note: string;
};

export default function AnalyticsStrategicNote({ note }: AnalyticsStrategicNoteProps) {
  return (
    <section className="rounded-[22px] border border-[color:var(--border-soft)] bg-[#efe7d7] px-4 py-3 sm:px-5 sm:py-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f6dfb6] text-[#8c5c00]">
          <Zap className="h-4 w-4 fill-current" />
        </span>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8a6a2f]">Strategic Note</p>
          <p className="mt-1 text-sm leading-6 text-[#6d5d3e]">{note}</p>
        </div>
      </div>
    </section>
  );
}
