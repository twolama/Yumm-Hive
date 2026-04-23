"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Hexagon, Lightbulb, Minus, AlignJustify, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomDropdown from "@/components/dashboard/hives/CustomDropdown";

type HiveType = "Langstroth" | "Top Bar" | "Warre";

type FormErrors = {
  hiveName?: string;
  apiary?: string;
  type?: string;
};

const HIVE_TYPES: Array<{
  value: HiveType;
  note: string;
  cardNote: string;
  icon: typeof Hexagon;
}> = [
  {
    value: "Langstroth",
    note: "Standard vertical stack",
    cardNote: "Vertical modular system.",
    icon: Hexagon,
  },
  {
    value: "Top Bar",
    note: "Horizontal management",
    cardNote: "Horizontal natural flow.",
    icon: Minus,
  },
  {
    value: "Warre",
    note: 'Natural-comb "People\'s Hive"',
    cardNote: "Sustainable tiering.",
    icon: AlignJustify,
  },
];

const APIARY_LOCATIONS = [
  { value: "North Valley Orchard", label: "North Valley Orchard", description: "Primary orchard zone" },
  { value: "Alpha Ridge", label: "Alpha Ridge", description: "High-altitude apiary" },
  { value: "Beta Field", label: "Beta Field", description: "Open field placement" },
  { value: "Forest Range", label: "Forest Range", description: "Woodland edge setup" },
];

function validateForm(hiveName: string, apiary: string, hiveType: HiveType | ""): FormErrors {
  const errors: FormErrors = {};

  if (!hiveName.trim()) {
    errors.hiveName = "Hive name is required.";
  }

  if (!apiary.trim()) {
    errors.apiary = "Apiary location is required.";
  }

  if (!hiveType) {
    errors.type = "Please select a hive type.";
  }

  return errors;
}

export default function RegisterNewHivePage() {
  const router = useRouter();
  const [hiveName, setHiveName] = useState("Hive-07");
  const [apiary, setApiary] = useState(APIARY_LOCATIONS[0].value);
  const [hiveType, setHiveType] = useState<HiveType | "">("Langstroth");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(
    () => Object.keys(validateForm(hiveName, apiary, hiveType)).length === 0,
    [hiveName, apiary, hiveType]
  );

  const handleTypeSelect = (value: HiveType) => {
    setHiveType(value);
    setErrors((prev) => ({ ...prev, type: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(hiveName, apiary, hiveType);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    const encodedName = encodeURIComponent(hiveName.trim());
    router.push(`/dashboard/my-hives?registered=1&hiveName=${encodedName}`);
  };

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-6 pb-8">
      <div>
        <p className="text-sm font-medium text-[color:var(--muted)]">
          <Link href="/dashboard/my-hives" className="hover:text-foreground transition-colors">
            My Hives
          </Link>{" "}
          <span className="px-1">&gt;</span>
          <span className="font-semibold text-foreground">Add New Hive</span>
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-[46px]">Register New Hive</h1>
        <p className="mt-2 max-w-[860px] text-base text-[color:var(--muted)]">
          Extend your apiary network with detailed colony parameters.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
          <div className="space-y-4">
            <section className="rounded-[30px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-6 md:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--status-warning)]">Hive Identity</p>

              <div className="mt-5 space-y-5">
                <div>
                  <label htmlFor="hive-name" className="mb-2 block text-sm font-bold text-foreground">
                    Hive Name
                  </label>
                  <input
                    id="hive-name"
                    value={hiveName}
                    onChange={(event) => {
                      setHiveName(event.target.value);
                      setErrors((prev) => ({ ...prev, hiveName: undefined }));
                    }}
                    placeholder="Hive-07"
                    className={cn(
                      "h-14 w-full rounded-2xl border bg-[color:var(--surface-2)] px-4 text-base text-foreground placeholder:text-[color:var(--muted)] focus:outline-none focus:ring-2",
                      errors.hiveName
                        ? "border-[color:var(--status-critical)] focus:ring-[color:var(--status-critical)]/40"
                        : "border-[color:var(--border-soft)] focus:ring-[color:var(--primary)]/40"
                    )}
                    aria-invalid={Boolean(errors.hiveName)}
                    aria-describedby={errors.hiveName ? "hive-name-error" : undefined}
                  />
                  {errors.hiveName && (
                    <p id="hive-name-error" className="mt-2 text-xs font-semibold text-[color:var(--status-critical)]">
                      {errors.hiveName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="apiary-location" className="mb-2 block text-sm font-bold text-foreground">
                    Apiary Location
                  </label>
                  <CustomDropdown
                    id="apiary-location"
                    value={apiary}
                    options={APIARY_LOCATIONS}
                    onChange={(nextValue) => {
                      setApiary(nextValue);
                      setErrors((prev) => ({ ...prev, apiary: undefined }));
                    }}
                    error={errors.apiary}
                  />
                  {errors.apiary && (
                    <p id="apiary-error" className="mt-2 text-xs font-semibold text-[color:var(--status-critical)]">
                      {errors.apiary}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-[30px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-6 md:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">Select Hive Configuration</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {HIVE_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = type.value === hiveType;

                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleTypeSelect(type.value)}
                      className={cn(
                        "rounded-3xl border p-4 text-left transition-colors sm:p-5",
                        isSelected
                          ? "border-[color:var(--status-warning)] bg-[color:var(--surface-1)]"
                          : "border-transparent bg-[color:var(--surface-2)] hover:border-[color:var(--primary)]/40"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", isSelected ? "text-[color:var(--status-warning)]" : "text-[color:var(--muted)]")} />
                      <p className="mt-6 text-xl font-black leading-tight text-foreground sm:mt-7 sm:text-2xl">{type.value}</p>
                      <p className="mt-1 text-xs leading-5 text-[color:var(--muted)] sm:text-[13px]">{type.cardNote}</p>
                    </button>
                  );
                })}
              </div>

              {errors.type && <p className="mt-3 text-xs font-semibold text-[color:var(--status-critical)]">{errors.type}</p>}
            </section>
          </div>

          <section className="rounded-[30px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] p-6 md:p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--status-warning)]">Hive Configuration</p>

            <div className="mt-5 space-y-3">
              <p className="text-sm font-bold text-foreground">Hive Type</p>

              {HIVE_TYPES.map((type) => {
                const isSelected = type.value === hiveType;

                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleTypeSelect(type.value)}
                    className="flex w-full items-start gap-3 rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] px-4 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "mt-1 h-[18px] w-[18px] rounded-full border",
                        isSelected
                          ? "border-[color:var(--status-warning)] bg-[color:var(--status-warning)]"
                          : "border-[color:var(--status-warning)]/35 bg-transparent"
                      )}
                    >
                      {isSelected && (
                        <span className="m-auto mt-[4px] block h-2 w-2 rounded-full bg-[color:var(--surface-1)]" />
                      )}
                    </span>

                    <span>
                      <span className="block text-[22px] font-bold leading-6 text-foreground sm:text-[28px] sm:leading-7">{type.value}</span>
                      <span className="mt-1 block text-sm text-[color:var(--muted)]">{type.note}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-3xl border border-transparent bg-[color:var(--feed-bg)] px-4 py-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--surface-1)] text-[color:var(--status-warning)]">
                  <Lightbulb className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-black text-[color:var(--status-warning)]">Expert Tip</p>
                  <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">
                    Placing your hive near a water source can increase initial colony strength by up to 15% in the first month.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-[20px] border border-[color:var(--border-soft)] bg-[color:var(--surface-1)] px-5 py-5 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="flex items-center gap-3 text-sm leading-6 text-[color:var(--muted)] md:max-w-[620px]">
              <ShieldCheck className="h-5 w-5 text-[color:var(--status-optimal)]" />
              Double-check parameters before registration. This will generate a unique QR code for the hive physical tag.
            </p>

            <div className="flex items-center justify-end gap-3">
              <Link
                href="/dashboard/my-hives"
                className="inline-flex h-12 items-center justify-center rounded-full px-7 text-lg font-semibold text-foreground hover:bg-[color:var(--surface-2)] transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="inline-flex h-12 min-w-[150px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#d39a17,#b67c05)] px-8 text-lg font-bold text-white shadow-[0_8px_20px_rgba(199,132,13,0.35)] transition-opacity disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
