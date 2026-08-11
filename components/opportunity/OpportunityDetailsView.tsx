"use client";

import Link from "next/link";
import { Opportunity } from "@prisma/client";
import {
  CalendarDays,
  MapPin,
  Sparkles,
  ExternalLink,
  FileText,
  CheckCircle,
  Gift,
  ArrowRight,
  Route,
} from "lucide-react";
import AnalyzeMatchButton from "@/components/opportunity/AnalyzeMatchButton";
import { Roadmap } from "@prisma/client";

interface Props {
  opportunity: Opportunity;
  existingRoadmap?: Roadmap | null;
}

export default function OpportunityDetailsView({ opportunity, existingRoadmap }: Props) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Action Header Card */}
      <div className="relative overflow-hidden surface-card p-6 sm:p-8 rounded-3xl border border-border/80 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {opportunity.title}
            </h1>
            <p className="text-sm font-medium text-muted-foreground">
              {opportunity.organization}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary border border-primary/20">
              {opportunity.type}
            </span>
            <span className="rounded-full bg-secondary/10 px-3.5 py-1 text-xs font-semibold text-secondary-foreground border border-secondary/20">
              {opportunity.mode}
            </span>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/50">
          <AnalyzeMatchButton
            opportunityId={opportunity.id}
          />

          {existingRoadmap ? (
            <Link
              href={`/roadmap/${existingRoadmap.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]"
            >
              <Route className="h-4 w-4" />
              <span>Open Preparation Roadmap</span>
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Link>
          ) : (
            <Link
              href={`/opportunities/${opportunity.slug}/prepare`}
              className="inline-flex items-center gap-2 rounded-xl bg-secondary/80 px-5 py-3 font-semibold text-secondary-foreground shadow-sm transition hover:bg-secondary active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Build Success Plan</span>
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Link>
          )}

          {opportunity.registrationLink && (
            <a
              href={opportunity.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-5 py-3 font-semibold text-foreground shadow-sm transition hover:bg-accent hover:border-border active:scale-[0.98]"
            >
              <span>Apply Now</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          )}
        </div>
      </div>

      {/* Description Section */}
      <section className="surface-card p-6 sm:p-8 rounded-3xl border border-border/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Description
          </h2>
        </div>

        <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-muted-foreground pl-0.5">
          {opportunity.description}
        </p>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/50 text-sm text-muted-foreground">
          {opportunity.deadline && (
            <div className="flex items-center gap-2 font-medium">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>
                Deadline:{" "}
                <span className="font-semibold text-foreground">
                  {new Date(opportunity.deadline).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </span>
            </div>
          )}

          {opportunity.location && (
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{opportunity.location}</span>
            </div>
          )}
        </div>
      </section>

      {/* Eligibility Section */}
      {opportunity.eligibility && (
        <section className="surface-card p-6 sm:p-8 rounded-3xl border border-border/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Eligibility Criteria
            </h2>
          </div>

          <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-muted-foreground pl-0.5">
            {opportunity.eligibility}
          </p>
        </section>
      )}

      {/* Benefits Section */}
      {opportunity.benefits && (
        <section className="surface-card p-6 sm:p-8 rounded-3xl border border-border/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Gift className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Perks & Benefits
            </h2>
          </div>

          <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-muted-foreground pl-0.5">
            {opportunity.benefits}
          </p>
        </section>
      )}
    </div>
  );
}
