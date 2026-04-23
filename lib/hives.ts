export type HiveStatus = "healthy" | "monitor" | "alert";

export type HiveRecommendation = {
  label: string;
  title: string;
  reasoning: string;
  impactScore: number;
  impactLabel: string;
  statusTone: HiveStatus;
};

export type HiveDetail = {
  id: string;
  name: string;
  apiary: string;
  type: string;
  status: HiveStatus;
  colonyStrength: number;
  capacity: number;
  temperatureC: number;
  humidityPct: number;
  growthPct: number;
  productivityScore: number;
  estimatedYieldKg: number;
  activityLevel: string;
  identifier: string;
  inspectionNote: string;
  activityPoints: Array<{ label: string; value: number; highlight?: boolean }>;
  recommendations: HiveRecommendation[];
};

const HIVE_RECORDS: HiveDetail[] = [
  {
    id: "12",
    name: "Hive #12",
    apiary: "Alpha Ridge",
    type: "Langstroth",
    status: "healthy",
    colonyStrength: 42500,
    capacity: 55000,
    temperatureC: 34.2,
    humidityPct: 52,
    growthPct: 12,
    productivityScore: 88,
    estimatedYieldKg: 28.4,
    activityLevel: "High",
    identifier: "BG-7829-X",
    inspectionNote: "Balanced brood expansion and stable sensor readings indicate strong seasonal readiness.",
    activityPoints: [
      { label: "Sep 01", value: 42 },
      { label: "Sep 05", value: 44 },
      { label: "Sep 09", value: 61 },
      { label: "Sep 12", value: 45 },
      { label: "Sep 15", value: 72, highlight: true },
      { label: "Sep 18", value: 58 },
      { label: "Sep 21", value: 49 },
      { label: "Today", value: 66, highlight: true },
    ],
    recommendations: [
      {
        label: "Recommendation",
        title: "Expand brood chamber size",
        reasoning:
          "Core temperature spikes of +1.2C alongside a 15% increase in vibration frequency indicate crowding during the brood cycle.",
        impactScore: 94,
        impactLabel: "High-growth potential",
        statusTone: "monitor",
      },
      {
        label: "Recommendation",
        title: "Monitor for potential swarming",
        reasoning:
          "Consistent strength growth to 42.5k bees paired with queen piping signatures suggests a 72% swarming probability within 72 hours.",
        impactScore: 88,
        impactLabel: "Critical preventative",
        statusTone: "alert",
      },
      {
        label: "Recommendation",
        title: "Optimize hydration source",
        reasoning:
          "Humidity fluctuations remain minor, but a closer water source can reduce foraging energy expenditure while temperatures stay elevated.",
        impactScore: 42,
        impactLabel: "Efficiency gain",
        statusTone: "healthy",
      },
    ],
  },
  {
    id: "07",
    name: "Hive #07",
    apiary: "Beta Field",
    type: "Top Bar",
    status: "monitor",
    colonyStrength: 31200,
    capacity: 55000,
    temperatureC: 31.8,
    humidityPct: 62,
    growthPct: 6,
    productivityScore: 71,
    estimatedYieldKg: 21.6,
    activityLevel: "Moderate",
    identifier: "BT-1407-M",
    inspectionNote: "Stable foraging trends, but brood temperature needs closer observation through the next cycle.",
    activityPoints: [
      { label: "Sep 01", value: 35 },
      { label: "Sep 05", value: 39 },
      { label: "Sep 09", value: 41 },
      { label: "Sep 12", value: 48, highlight: true },
      { label: "Sep 15", value: 43 },
      { label: "Sep 18", value: 54, highlight: true },
      { label: "Sep 21", value: 50 },
      { label: "Today", value: 46 },
    ],
    recommendations: [
      {
        label: "Recommendation",
        title: "Stabilize brood temperature",
        reasoning:
          "The current cycle is trending below optimal brood warmth. Tighten ventilation control before the next cool night.",
        impactScore: 81,
        impactLabel: "Stability gain",
        statusTone: "monitor",
      },
      {
        label: "Recommendation",
        title: "Reduce entrance congestion",
        reasoning:
          "Forager return intervals are widening slightly, suggesting reduced throughput during mid-day peaks.",
        impactScore: 64,
        impactLabel: "Flow improvement",
        statusTone: "healthy",
      },
      {
        label: "Recommendation",
        title: "Inspect moisture sealing",
        reasoning:
          "Humidity is elevated enough to warrant a quick look at seal points and landing board drainage.",
        impactScore: 58,
        impactLabel: "Preventive maintenance",
        statusTone: "alert",
      },
    ],
  },
  {
    id: "24",
    name: "Hive #24",
    apiary: "Alpha Ridge",
    type: "Warre",
    status: "alert",
    colonyStrength: 18000,
    capacity: 55000,
    temperatureC: 36.5,
    humidityPct: 41,
    growthPct: -4,
    productivityScore: 49,
    estimatedYieldKg: 13.2,
    activityLevel: "Elevated",
    identifier: "WR-2418-A",
    inspectionNote: "Temperature stress and low humidity suggest an immediate review of airflow and water access.",
    activityPoints: [
      { label: "Sep 01", value: 28 },
      { label: "Sep 05", value: 31 },
      { label: "Sep 09", value: 37 },
      { label: "Sep 12", value: 34 },
      { label: "Sep 15", value: 55, highlight: true },
      { label: "Sep 18", value: 52, highlight: true },
      { label: "Sep 21", value: 44 },
      { label: "Today", value: 60, highlight: true },
    ],
    recommendations: [
      {
        label: "Recommendation",
        title: "Expand brood chamber size",
        reasoning:
          "Rapid thermal spikes have pushed the brood area outside the recommended operating band.",
        impactScore: 96,
        impactLabel: "Urgent intervention",
        statusTone: "alert",
      },
      {
        label: "Recommendation",
        title: "Increase water access",
        reasoning:
          "Low humidity and high activity are increasing dehydration risk across the foraging cohort.",
        impactScore: 87,
        impactLabel: "Immediate relief",
        statusTone: "monitor",
      },
      {
        label: "Recommendation",
        title: "Audit ventilation path",
        reasoning:
          "The airflow profile is uneven. Rebalancing the intake path should reduce heat retention after midday.",
        impactScore: 73,
        impactLabel: "Thermal balance",
        statusTone: "healthy",
      },
    ],
  },
  {
    id: "15",
    name: "Hive #15",
    apiary: "Forest Range",
    type: "Langstroth",
    status: "healthy",
    colonyStrength: 48200,
    capacity: 55000,
    temperatureC: 33.9,
    humidityPct: 54,
    growthPct: 9,
    productivityScore: 91,
    estimatedYieldKg: 31.7,
    activityLevel: "High",
    identifier: "FR-5515-L",
    inspectionNote: "Strong growth, balanced humidity, and active foraging indicate a healthy late-season trajectory.",
    activityPoints: [
      { label: "Sep 01", value: 50 },
      { label: "Sep 05", value: 54 },
      { label: "Sep 09", value: 57 },
      { label: "Sep 12", value: 66, highlight: true },
      { label: "Sep 15", value: 74, highlight: true },
      { label: "Sep 18", value: 68 },
      { label: "Sep 21", value: 71 },
      { label: "Today", value: 76, highlight: true },
    ],
    recommendations: [
      {
        label: "Recommendation",
        title: "Maintain current chamber size",
        reasoning:
          "The hive is expanding cleanly, and the colony is not yet reaching brood congestion thresholds.",
        impactScore: 91,
        impactLabel: "No structural change",
        statusTone: "healthy",
      },
      {
        label: "Recommendation",
        title: "Track late-season nectar flow",
        reasoning:
          "Foraging activity remains elevated. Continue monitoring until the final bloom window closes.",
        impactScore: 79,
        impactLabel: "Harvest timing",
        statusTone: "monitor",
      },
      {
        label: "Recommendation",
        title: "Preserve current ventilation",
        reasoning:
          "Environmental readings are stable enough that the current airflow setup should be retained.",
        impactScore: 66,
        impactLabel: "Operational stability",
        statusTone: "healthy",
      },
    ],
  },
];

export const HIVE_SUMMARIES = HIVE_RECORDS.map(({ id, apiary, status, colonyStrength, capacity, temperatureC, humidityPct }) => ({
  id,
  location: apiary,
  status,
  colonyStrength,
  capacity,
  temperatureC,
  humidityPct,
}));

export function getHiveById(id: string) {
  return HIVE_RECORDS.find((hive) => hive.id === id);
}

export function getHiveIds() {
  return HIVE_RECORDS.map((hive) => hive.id);
}
