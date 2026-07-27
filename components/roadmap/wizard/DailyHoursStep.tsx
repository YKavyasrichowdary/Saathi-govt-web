"use client";

import { Clock3, CheckCircle2 } from "lucide-react";

interface DailyHoursStepProps {
  value?: number;
  onSelect?: (hours: number) => void;
}

const options = [
  {
    hours: 0.5,
    title: "30 Minutes",
    description: "Perfect for busy schedules",
  },
  {
    hours: 1,
    title: "1 Hour",
    description: "Balanced preparation",
  },
  {
    hours: 2,
    title: "2 Hours",
    description: "Accelerated learning",
  },
  {
    hours: 4,
    title: "4+ Hours",
    description: "Intensive preparation",
  },
];

export default function DailyHoursStep({
  value,
  onSelect,
}: DailyHoursStepProps) {
  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-3xl font-bold">
          How much time can you realistically study each day?
        </h2>

        <p className="mt-2 text-muted-foreground">
          Choose something you can consistently follow.
        </p>
      </div>

      <div className="grid gap-4">

        {options.map((option) => {

          const selected = value === option.hours;

          return (

            <button
              key={option.hours}
              onClick={() => onSelect?.(option.hours)}
              className={`group flex items-center justify-between rounded-3xl border p-6 text-left transition-all duration-300 hover:border-primary hover:shadow-md ${
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >

              <div className="flex items-center gap-5">

                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Clock3 className="h-6 w-6" />
                </div>

                <div>

                  <h3 className="text-lg font-semibold">
                    {option.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>

                </div>

              </div>

              {selected && (
                <CheckCircle2 className="h-6 w-6 text-primary" />
              )}

            </button>

          );
        })}

      </div>

    </div>
  );
}