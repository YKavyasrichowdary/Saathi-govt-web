"use client";

import { Rocket, CheckCircle2, AlertCircle, TrendingUp, Sparkles } from "lucide-react";

import SectionCard from "@/components/ui/SectionCard";

export type PriorityLevel = "high" | "medium" | "low";

export interface ImprovementItem {
  text: string;
  priority?: PriorityLevel;
}

interface Props {
  improvements: (string | ImprovementItem)[];
}

const priorityConfig: Record<
  PriorityLevel,
  {
    label: string;
    badgeStyle: string;
    cardStyle: string;
    numberBg: string;
    icon: typeof AlertCircle;
  }
> = {
  high: {
    label: "High Priority",
    badgeStyle: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    cardStyle: "border-red-500/20 bg-red-500/5",
    numberBg: "bg-red-600 text-white",
    icon: AlertCircle,
  },
  medium: {
    label: "Medium Priority",
    badgeStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    cardStyle: "border-amber-500/20 bg-amber-500/5",
    numberBg: "bg-amber-600 text-white",
    icon: TrendingUp,
  },
  low: {
    label: "Nice to Have",
    badgeStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    cardStyle: "border-emerald-500/20 bg-emerald-500/5",
    numberBg: "bg-emerald-600 text-white",
    icon: Sparkles,
  },
};

function inferPriority(
  item: string | ImprovementItem,
  index: number
): PriorityLevel {
  if (typeof item === "object" && item.priority) {
    return item.priority;
  }

  const text = (typeof item === "string" ? item : item.text).toLowerCase();

  if (
    text.includes("ats") ||
    text.includes("format") ||
    text.includes("error") ||
    text.includes("critical")
  ) {
    return "high";
  }

  if (
    text.includes("quantify") ||
    text.includes("metric") ||
    text.includes("impact") ||
    text.includes("action") ||
    text.includes("achievement")
  ) {
    return "medium";
  }

  if (
    text.includes("portfolio") ||
    text.includes("certif") ||
    text.includes("website") ||
    text.includes("link") ||
    text.includes("github")
  ) {
    return "low";
  }

  // Fallback by order
  if (index === 0) return "high";
  if (index === 1) return "medium";
  return "low";
}

export default function ImprovementsCard({ improvements }: Props) {
  return (
    <SectionCard
      title="Recommended Improvements"
      subtitle="Prioritized action steps to maximize your resume's impact"
      icon={<Rocket className="h-5 w-5" />}
    >
      <div className="space-y-4">
        {improvements.map((rawItem, index) => {
          const text = typeof rawItem === "string" ? rawItem : rawItem.text;
          const priority = inferPriority(rawItem, index);
          const config = priorityConfig[priority];
          const PriorityIcon = config.icon;

          return (
            <div
              key={text + index}
              className={`
                flex
                gap-4
                rounded-2xl
                border
                p-4
                transition-all
                hover:shadow-xs
                ${config.cardStyle}
              `}
            >
              <div
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  text-sm
                  font-bold
                  shadow-xs
                  ${config.numberBg}
                `}
              >
                {index + 1}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-foreground text-sm leading-snug">
                    {text}
                  </p>

                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1
                      rounded-full
                      border
                      px-2.5
                      py-0.5
                      text-[11px]
                      font-semibold
                      ${config.badgeStyle}
                    `}
                  >
                    <PriorityIcon className="h-3 w-3" />
                    {config.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary/70" />
                  <span>Recommended by Saathi AI</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}