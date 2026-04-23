import AnalyticsEfficiencyList from "@/components/dashboard/analytics/AnalyticsEfficiencyList";
import AnalyticsKpiGrid from "@/components/dashboard/analytics/AnalyticsKpiGrid";
import AnalyticsStrategicNote from "@/components/dashboard/analytics/AnalyticsStrategicNote";
import AnalyticsTrendPanel from "@/components/dashboard/analytics/AnalyticsTrendPanel";
import { analyticsContent } from "@/lib/analytics";

export default function AnalyticsPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-5 pb-10 sm:space-y-6">
      <AnalyticsStrategicNote note={analyticsContent.strategicNote} />

      <AnalyticsKpiGrid kpis={analyticsContent.kpis} />

      <AnalyticsTrendPanel initialRange="1M" />

      <AnalyticsEfficiencyList rows={analyticsContent.efficiencyPoints} />
    </div>
  );
}
