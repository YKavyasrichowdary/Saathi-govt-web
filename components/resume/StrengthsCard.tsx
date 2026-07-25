"use client";

import { ShieldCheck, CheckCircle2 } from "lucide-react";

import SectionCard from "@/components/ui/SectionCard";

interface Props {
  strengths: string[];
}

export default function StrengthsCard({
  strengths,
}: Props) {
  return (
    <SectionCard
      title="Strengths"
      subtitle="Areas where your resume performs well"
      icon={<ShieldCheck className="h-5 w-5" />}
    >
      <div className="space-y-3">
        {strengths.map((strength) => (
          <div
            key={strength}
            className="flex items-start gap-3 rounded-2xl bg-green-500/5 border border-green-500/10 p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />

            <p className="text-sm leading-6 text-foreground">
              {strength}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}