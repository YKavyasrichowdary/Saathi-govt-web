"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  CalendarDays,
  Building2,
  MapPin,
  Star,
  BadgeCheck,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";

import { Opportunity } from "@prisma/client";

interface Props {
  opportunity: Opportunity;
}

export default function OpportunityCard({
  opportunity,
}: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${opportunity.title}"?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/opportunities/${opportunity.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete opportunity");
      }

      toast.success("Opportunity deleted successfully");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete opportunity");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="surface-card rounded-2xl p-6 transition-all hover:shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-lg font-semibold">
            {opportunity.title}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">

            <Building2 className="h-4 w-4" />

            {opportunity.organization}

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold
          ${
            opportunity.status === "OPEN"
              ? "bg-green-100 text-green-700"
              : opportunity.status === "DRAFT"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {opportunity.status}
        </span>

      </div>

      {/* Tags */}

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
          <div className="flex items-center gap-2">

            <MapPin className="h-4 w-4 text-muted-foreground" />

            {opportunity.location}

          </div>
        )}

        {opportunity.deadline && (
          <div className="flex items-center gap-2">

            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            {new Date(
              opportunity.deadline
            ).toLocaleDateString()}

          </div>
        )}

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-end gap-3">

        <Link
          href={`/admin/opportunities/${opportunity.id}/edit`}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted font-medium transition-colors"
        >
          <Pencil className="h-4 w-4" />

          Edit
        </Link>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}

          Delete
        </button>

      </div>

    </div>
  );
}