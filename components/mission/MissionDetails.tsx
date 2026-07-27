"use client";

import {
  FileText,
  Clock3,
  FolderOpen,
} from "lucide-react";

interface MissionDetailsProps {
  mission: {
    description: string;
    estimatedMinutes: number;
    category: string;
  };
}

export default function MissionDetails({
  mission,
}: MissionDetailsProps) {
  return (
    <div className="surface-card rounded-3xl border border-border p-8">

      <h2 className="text-xl font-bold">
        Mission Details
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Complete this mission to improve your career profile.
      </p>

      <div className="mt-8 space-y-6">

        {/* Description */}

        <div className="flex gap-4">

          <div className="rounded-xl bg-primary/10 p-3 text-primary h-fit">
            <FileText className="h-5 w-5" />
          </div>

          <div>

            <h3 className="font-semibold">
              Description
            </h3>

            <p className="mt-2 text-muted-foreground leading-7">
              {mission.description}
            </p>

          </div>

        </div>

        {/* Estimated Time */}

        <div className="flex gap-4">

          <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 h-fit">
            <Clock3 className="h-5 w-5" />
          </div>

          <div>

            <h3 className="font-semibold">
              Estimated Time
            </h3>

            <p className="mt-2 text-muted-foreground">
              {mission.estimatedMinutes} minutes
            </p>

          </div>

        </div>

        {/* Category */}

        <div className="flex gap-4">

          <div className="rounded-xl bg-green-500/10 p-3 text-green-600 h-fit">
            <FolderOpen className="h-5 w-5" />
          </div>

          <div>

            <h3 className="font-semibold">
              Category
            </h3>

            <p className="mt-2 text-muted-foreground capitalize">
              {mission.category.toLowerCase()}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}