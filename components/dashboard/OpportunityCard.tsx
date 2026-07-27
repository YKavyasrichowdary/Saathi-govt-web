"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Building2,
} from "lucide-react";

export interface OpportunityItem {
  id?: string;
  title: string;
  organization: string;
  match?: number;
  deadline?: string | Date | null;
  mode?: string;
  reasons?: string[];
}

export default function OpportunityCard({
  title,
  organization,
  match,
  deadline,
  mode,
  reasons,
}: OpportunityItem) {
  const badgeColor =
    match !== undefined
      ? match >= 90
        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        : match >= 80
        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      : "bg-primary/10 text-primary";

  const formattedDeadline = deadline
    ? typeof deadline === "string"
      ? deadline
      : new Date(deadline).toLocaleDateString()
    : "Flexible";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-border bg-background p-6 shadow-sm transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 shrink-0" />
              {organization}
            </div>
          </div>

          <span className={`rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${badgeColor}`}>
            {match !== undefined ? `${match}% Match` : "Recommended"}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0" />
            {formattedDeadline}
          </div>

          {mode && (
            <>
              <span>•</span>
              <span>{mode}</span>
            </>
          )}
        </div>

        {reasons && reasons.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold">Why this matches you</p>
            <div className="flex flex-wrap gap-2">
              {reasons.map((reason) => (
                <span
                  key={reason}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  ✓ {reason}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3">
        Apply Now
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}