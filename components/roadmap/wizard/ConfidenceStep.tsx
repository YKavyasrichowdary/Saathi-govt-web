"use client";

import {
  Sprout,
  Rocket,
  Trophy,
} from "lucide-react";

import SelectionCard from "./SelectionCard";

interface Props {
  value?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  onSelect?: (
    value:
      | "BEGINNER"
      | "INTERMEDIATE"
      | "ADVANCED"
  ) => void;
}

const options = [
  {
    value: "BEGINNER",
    icon: <Sprout className="h-6 w-6" />,
    title: "I'm just getting started",
    description: "Still learning the fundamentals.",
  },
  {
    value: "INTERMEDIATE",
    icon: <Rocket className="h-6 w-6" />,
    title: "I know the basics",
    description: "Comfortable building small projects.",
  },
  {
    value: "ADVANCED",
    icon: <Trophy className="h-6 w-6" />,
    title: "I'm ready for a challenge",
    description: "I want to become exceptional.",
  },
] as const;

export default function ConfidenceStep({
  value,
  onSelect,
}: Props) {
  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-3xl font-bold">
          How would you describe yourself today?
        </h2>

        <p className="mt-2 text-muted-foreground">
          This helps Saathi personalize your roadmap.
        </p>
      </div>

      <div className="space-y-4">
        {options.map((option) => (
          <SelectionCard
            key={option.value}
            icon={option.icon}
            title={option.title}
            description={option.description}
            selected={value === option.value}
            onClick={() => onSelect?.(option.value)}
          />
        ))}
      </div>

    </div>
  );
}