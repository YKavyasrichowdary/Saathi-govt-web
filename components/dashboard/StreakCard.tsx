"use client";

import { Flame } from "lucide-react";

const days = [
  2, 2, 3, 1, 4, 2, 0,
  1, 2, 3, 2, 4, 3, 2,
];

function getColor(level: number) {
  switch (level) {
    case 0:
      return "bg-muted";
    case 1:
      return "bg-yellow-200";
    case 2:
      return "bg-yellow-400";
    case 3:
      return "bg-orange-500";
    case 4:
      return "bg-green-500";
    default:
      return "bg-muted";
  }
}

export default function StreakCard() {
  return (
    <div className="surface-card rounded-3xl border border-border p-6">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-orange-100 p-3 dark:bg-orange-900/30">
          <Flame className="h-6 w-6 text-orange-500" />
        </div>

        <div>

          <h2 className="text-xl font-bold">
            14 Day Streak
          </h2>

          <p className="text-sm text-muted-foreground">
            Keep your momentum going.
          </p>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-7 gap-2">

        {days.map((level, index) => (
          <div
            key={index}
            className={`aspect-square rounded-md transition-transform hover:scale-110 ${getColor(
              level
            )}`}
          />
        ))}

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-muted/40 p-4 text-center">

          <p className="text-2xl font-bold">
            14
          </p>

          <p className="text-xs text-muted-foreground">
            Current
          </p>

        </div>

        <div className="rounded-2xl bg-muted/40 p-4 text-center">

          <p className="text-2xl font-bold">
            31
          </p>

          <p className="text-xs text-muted-foreground">
            Best
          </p>

        </div>

      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Complete today's mission to keep your streak alive 🔥
      </p>

    </div>
  );
}