"use client";

import { Sun, SunMedium, Sunset, Moon } from "lucide-react";
import SelectionCard from "./SelectionCard";

interface Props {
  value?: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";
  onSelect?: (value: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT") => void;
}

const options = [
  {
    value: "MORNING",
    icon: <Sun className="h-6 w-6" />,
    title: "Morning (6 AM - 12 PM)",
    description: "Start early with a fresh mind.",
  },
  {
    value: "AFTERNOON",
    icon: <SunMedium className="h-6 w-6" />,
    title: "Afternoon (12 PM - 5 PM)",
    description: "Study during mid-day hours.",
  },
  {
    value: "EVENING",
    icon: <Sunset className="h-6 w-6" />,
    title: "Evening (5 PM - 9 PM)",
    description: "Post-work or post-classes focus.",
  },
  {
    value: "NIGHT",
    icon: <Moon className="h-6 w-6" />,
    title: "Night (9 PM - 2 AM)",
    description: "Quiet late night sessions.",
  },
] as const;

export default function StudyTimeStep({ value, onSelect }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">When do you prefer to study?</h2>
        <p className="mt-2 text-muted-foreground">
          We'll schedule your daily missions for your peak focus window.
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
