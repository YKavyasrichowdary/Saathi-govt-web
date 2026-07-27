"use client";

import {
  Target,
  Flag,
  FolderOpen,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface MissionHeaderProps {
  mission: {
    title: string;
    description: string;
    priority: string;
    category: string;
    status: string;
    createdAt?: Date | string;
  };
}

const priorityStyles: Record<string, string> = {
  HIGH:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  MEDIUM:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  LOW:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const statusStyles: Record<string, string> = {
  PENDING:
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",

  IN_PROGRESS:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",

  COMPLETED:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function MissionHeader({
  mission,
}: MissionHeaderProps) {
  return (
    <div className="surface-card rounded-3xl border border-border p-8">

      {/* Title */}

      <div className="flex items-start gap-4">

        <div className="rounded-2xl bg-primary/10 p-4 text-primary">
          <Target className="h-7 w-7" />
        </div>

        <div className="flex-1">

          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Today's Mission
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {mission.title}
          </h1>

          <p className="mt-3 text-muted-foreground">
            {mission.description}
          </p>

        </div>

      </div>

      {/* Metadata */}

      <div className="mt-8 flex flex-wrap gap-3">

        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
            priorityStyles[mission.priority]
          }`}
        >
          <Flag className="h-4 w-4" />

          {mission.priority}
        </div>

        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">

          <FolderOpen className="h-4 w-4" />

          {mission.category}

        </div>

        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
            statusStyles[mission.status]
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />

          {mission.status.replace("_", " ")}
        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">

        <Clock3 className="h-4 w-4" />

        Created today

      </div>

    </div>
  );
}