"use client";

import Link from "next/link";

import {
  CalendarDays,
  Building2,
  MapPin,
  Bookmark,
  BadgeCheck,
  Star,
} from "lucide-react";

import { Opportunity } from "@prisma/client";

interface Props {
  opportunity: Opportunity;
}

export default function OpportunityCard({
  opportunity,
}: Props) {
  return (
    <Link
      href={`/opportunities/${opportunity.slug}`}
      className="group block"
    >
      <div className="surface-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {opportunity.title}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              {opportunity.organization}
            </div>

          </div>

          <button
            type="button"
            className="rounded-full p-2 hover:bg-muted"
          >
            <Bookmark className="h-5 w-5" />
          </button>

        </div>

        {/* Badges */}

        <div className="mt-5 flex flex-wrap gap-2">

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {opportunity.type}
          </span>

          <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
            {opportunity.mode}
          </span>

          {opportunity.featured && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              <Star className="h-3 w-3" />
              Featured
            </span>
          )}

          {opportunity.verified && (
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </span>
          )}

        </div>

        {/* Details */}

        <div className="mt-6 space-y-3 text-sm">

          {opportunity.location && (
            <div className="flex items-center gap-2 text-muted-foreground">

              <MapPin className="h-4 w-4" />

              {opportunity.location}

            </div>
          )}

          {opportunity.deadline && (
            <div className="flex items-center gap-2 text-muted-foreground">

              <CalendarDays className="h-4 w-4" />

              {new Date(
                opportunity.deadline
              ).toLocaleDateString("en-IN")}

            </div>
          )}

        </div>

      </div>
    </Link>
  );
}