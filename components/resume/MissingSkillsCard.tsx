"use client";

import { AlertTriangle, Plus } from "lucide-react";

import SectionCard from "@/components/ui/SectionCard";

interface Props {
  skills: string[];
}

export default function MissingSkillsCard({
  skills,
}: Props) {
  return (
    <SectionCard
      title="Missing Skills"
      subtitle="Skills that can improve your career opportunities"
      icon={<AlertTriangle className="h-5 w-5" />}
    >
      {skills.length === 0 ? (
        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 text-center">
          <p className="font-medium text-green-700 dark:text-green-400">
            🎉 Great job!
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            No major skill gaps were identified.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-yellow-500/20
                bg-yellow-500/10
                px-4
                py-2
              "
            >
              <Plus className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />

              <span className="text-sm font-medium">
                {skill}
              </span>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}