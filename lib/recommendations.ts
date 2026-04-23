import { HIVE_SUMMARIES } from "@/lib/hives";

export type RecommendationStat = {
  id: string;
  label: string;
  value: string;
  accentText?: string;
  trailingText?: string;
};

export type RecommendationAction = {
  id: string;
  label: string;
};

export type HiveChoice = {
  id: string;
  label: string;
  statusText: string;
  tone: "optimal" | "active" | "alert";
};

export const recommendationStats: RecommendationStat[] = [
  {
    id: "forecast",
    label: "Forecast Window",
    value: "Next 7 Days",
  },
  {
    id: "nectar-flow",
    label: "Nectar Flow",
    value: "Expected:",
    accentText: "High",
  },
  {
    id: "swarm-risk",
    label: "Swarm Risk",
    value: "Status:",
    accentText: "Minimal",
  },
  {
    id: "avg-temp",
    label: "Avg. Temp",
    value: "Stable",
    trailingText: "34C",
  },
];

export const recommendationActions: RecommendationAction[] = [
  { id: "health", label: "Check Hive-07 health" },
  { id: "route", label: "Optimize harvest route" },
  { id: "winter", label: "Predict winter stores" },
];

const statusToChoiceMeta = {
  healthy: { statusText: "Optimal", tone: "optimal" as const },
  monitor: { statusText: "Active", tone: "active" as const },
  alert: { statusText: "Alert", tone: "alert" as const },
};

export const hiveChoices: HiveChoice[] = [...HIVE_SUMMARIES]
  .sort((a, b) => Number(a.id) - Number(b.id))
  .map((hive) => {
    const statusMeta = statusToChoiceMeta[hive.status];

    return {
      id: hive.id,
      label: `Hive #${hive.id}`,
      statusText: statusMeta.statusText,
      tone: statusMeta.tone,
    };
  });

export const recommendationCopy = {
  heading: "Good morning, Natnael.",
  intro:
    "I've analyzed the vibrations and humidity levels across all available hives.",
  highlightedHive: "Hive-07",
  outro:
    "is showing signs of early honey capping. Would you like to review the harvest schedule or check for other maintenance needs?",
  promptPlaceholder: "Ask BeeGuard AI anything...",
};
