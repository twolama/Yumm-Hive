export type AnalyticsRange = "1W" | "1M" | "3M";

export type AnalyticsKpi = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  note: string;
  accent: "yield" | "health" | "hives" | "risk";
};

export type TrendPoint = {
  label: string;
  week: number;
  month: number;
  quarter: number;
};

export type EfficiencyPoint = {
  name: string;
  valueKg: number;
  tone: "optimal" | "warning" | "watch";
};

const TREND_POINTS: TrendPoint[] = [
  { label: "OCT 01", week: 48, month: 50, quarter: 46 },
  { label: "OCT 04", week: 51, month: 55, quarter: 50 },
  { label: "OCT 07", week: 49, month: 52, quarter: 48 },
  { label: "OCT 10", week: 58, month: 65, quarter: 55 },
  { label: "OCT 12", week: 55, month: 62, quarter: 53 },
  { label: "OCT 15", week: 63, month: 74, quarter: 59 },
  { label: "OCT 18", week: 61, month: 71, quarter: 57 },
  { label: "OCT 21", week: 68, month: 81, quarter: 65 },
  { label: "OCT 24", week: 66, month: 78, quarter: 63 },
  { label: "OCT 28", week: 75, month: 89, quarter: 72 },
  { label: "OCT 31", week: 73, month: 86, quarter: 70 },
];

const KPI_CARDS: AnalyticsKpi[] = [
  {
    id: "yield",
    label: "TOTAL YIELD",
    value: "1,280",
    unit: "kg",
    note: "+12% vs last month",
    accent: "yield",
  },
  {
    id: "health",
    label: "AVG HEALTH",
    value: "94",
    unit: "%",
    note: "Across active hives",
    accent: "health",
  },
  {
    id: "hives",
    label: "TOTAL HIVES",
    value: "42",
    unit: "units",
    note: "38 production-ready",
    accent: "hives",
  },
  {
    id: "risk",
    label: "ENV. RISK",
    value: "Low",
    note: "Stable Environment",
    accent: "risk",
  },
];

const EFFICIENCY_POINTS: EfficiencyPoint[] = [
  { name: "North Orchard", valueKg: 482, tone: "optimal" },
  { name: "Valley South", valueKg: 412, tone: "optimal" },
  { name: "East Bank", valueKg: 386, tone: "warning" },
];

export const analyticsContent = {
  strategicNote:
    "Forecast indicates peak nectar flow in 4 days. Prioritize super frame expansion in South Sector to maximize yield capacity.",
  kpis: KPI_CARDS,
  trendPoints: TREND_POINTS,
  efficiencyPoints: EFFICIENCY_POINTS,
};

export function getTrendPointsByRange(range: AnalyticsRange): Array<{ label: string; value: number }> {
  const key = range === "1W" ? "week" : range === "1M" ? "month" : "quarter";

  return TREND_POINTS.map((point) => ({
    label: point.label,
    value: point[key],
  }));
}
