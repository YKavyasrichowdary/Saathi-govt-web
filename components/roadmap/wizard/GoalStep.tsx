"use client";

import { Target, Award } from "lucide-react";
import SelectionCard from "./SelectionCard";

interface Props {
  value?: "QUALIFY" | "COMPETITIVE";
  onSelect?: (value: "QUALIFY" | "COMPETITIVE") => void;
}

const options = [
  {
    value: "QUALIFY",
    icon: <Target className="h-6 w-6" />,
    title: "Just Qualify",
    description: "Aiming to clear the minimum cutoff safely.",
  },
  {
    value: "COMPETITIVE",
    icon: <Award className="h-6 w-6" />,
    title: "Top Rank / Competitive",
    description: "Targeting high marks for top position.",
  },
] as const;

export default function GoalStep({ value, onSelect }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">What is your primary goal?</h2>
        <p className="mt-2 text-muted-foreground">
          This helps calibrate the difficulty and target score of your roadmap.
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
