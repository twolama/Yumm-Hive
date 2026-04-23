import SettingsPanel from "@/components/dashboard/settings/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-6 pb-8 sm:space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
          System Settings
        </h1>
        <p className="text-base font-medium text-[color:var(--muted)] sm:text-lg">
          Manage your digital apiary credentials and interface preferences.
        </p>
      </div>

      <SettingsPanel />
    </div>
  );
}
