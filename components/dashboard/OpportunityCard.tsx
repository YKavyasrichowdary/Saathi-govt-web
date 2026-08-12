"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Building2,
} from "lucide-react";
import SaveButton from "@/components/opportunity/SaveButton";

export interface OpportunityItem {
  id?: string;
  title: string;
  organization: string;
  matchScore?: number;
  deadline?: string | Date | null;
  mode?: string;
  reasons?: string[];
  isSaved?: boolean;
  slug?: string;
}

export default function OpportunityCard({
  id,
  title,
  organization,
  matchScore = 0,
  deadline,
  mode,
  reasons,
  isSaved = false,
}: OpportunityItem) {
  const badgeColor =
    matchScore >= 90
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
      : matchScore >= 80
      ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300"
      : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300";

  const formattedDeadline = deadline
    ? typeof deadline === "string"
      ? deadline.slice(0, 10)
      : new Date(deadline).toLocaleDateString("en-IN")
    : "Flexible";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-border bg-background p-6 shadow-sm transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 shrink-0" />
              {organization}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold shrink-0 ${badgeColor}`}>
              {matchScore}% Match
            </span>

            {id && (
              <SaveButton
                opportunityId={id}
                initialSaved={isSaved}
              />
            )}
          </div>
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
            <p className="mb-3 text-sm font-semibold text-foreground">Why this matches you</p>
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

      <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
        <Link
          href={`/opportunities/${id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
        >
          View Opportunity
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}