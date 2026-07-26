"use client";

import { CheckCircle2 } from "lucide-react";
import { ReactNode } from "react";

interface SelectionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function SelectionCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-3xl border p-6 transition-all duration-300 text-left ${
        selected
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border hover:border-primary hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-5">

          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            {icon}
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {title}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          </div>

        </div>

        {selected && (
          <CheckCircle2 className="h-6 w-6 text-primary" />
        )}

      </div>
    </button>
  );
}