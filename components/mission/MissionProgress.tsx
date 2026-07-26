"use client";

import { CheckCircle2, Clock3 } from "lucide-react";

interface MissionProgressProps {
  progress: number;
  completedTasks: number;
  totalTasks: number;
  remainingMinutes: number;
}

export default function MissionProgress({
  progress,
  completedTasks,
  totalTasks,
  remainingMinutes,
}: MissionProgressProps) {
  return (
    <div className="surface-card rounded-3xl border border-border p-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold">
            Progress
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Keep going! You're making great progress.
          </p>

        </div>

        <span className="text-3xl font-bold text-primary">
          {progress}%
        </span>

      </div>

      <div className="mt-8">

        <div className="h-3 overflow-hidden rounded-full bg-muted">

          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">

        <div className="flex items-center gap-3 rounded-2xl border border-border p-4">

          <CheckCircle2 className="h-5 w-5 text-green-600" />

          <div>

            <p className="text-sm text-muted-foreground">
              Tasks Completed
            </p>

            <h3 className="font-semibold">
              {completedTasks} / {totalTasks}
            </h3>

          </div>

        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-border p-4">

          <Clock3 className="h-5 w-5 text-blue-600" />

          <div>

            <p className="text-sm text-muted-foreground">
              Time Remaining
            </p>

            <h3 className="font-semibold">
              {remainingMinutes} mins
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}