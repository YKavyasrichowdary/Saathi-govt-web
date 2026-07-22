import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import opportunityService from "@/services/opportunity/opportunity.service";
import savedOpportunityService from "@/services/saved-opportunity/saved-opportunity.service";
import {
  Building2,
  Calendar,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Award,
  Globe,
  CheckCircle2,
} from "lucide-react";
import OpportunityCard from "@/components/opportunity/OpportunityCard";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const { id } = await params;

  let opportunity = await opportunityService.getById(id);

  if (!opportunity) {
    // Attempt lookup by slug if not found by id
    const allOpps = await opportunityService.getAll();
    opportunity = allOpps.find((o) => o.slug === id) || null;
  }

  if (!opportunity) {
    notFound();
  }

  const isSaved = Boolean(
    await savedOpportunityService.isSaved(session.user.id, opportunity.id)
  );

  const formattedDeadline = opportunity.deadline
    ? new Date(opportunity.deadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Open / Ongoing";

  const sourceStr = opportunity.source
    ? opportunity.source.charAt(0) + opportunity.source.slice(1).toLowerCase()
    : "";
  const modeStr = opportunity.mode
    ? opportunity.mode.charAt(0) + opportunity.mode.slice(1).toLowerCase()
    : "";

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      {/* Back button */}
      <Link
        href="/opportunities/scholarships"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Opportunities
      </Link>

      {/* Main Detail Header */}
      <div className="surface-card p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {opportunity.type}
              </span>
              {sourceStr && modeStr && (
                <span className="rounded-full bg-surface-muted border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {sourceStr} • {modeStr}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              {opportunity.title}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground font-medium">
              <Building2 className="h-4 w-4 text-primary" />
              <span>{opportunity.organization}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <OpportunityCard
              opportunity={opportunity}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border pt-6">
          {opportunity.amount && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
              <Award className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground">Reward / Prize</div>
                <div className="text-sm font-semibold text-foreground">
                  {opportunity.amount}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
            <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">Deadline</div>
              <div className="text-sm font-semibold text-foreground">
                {formattedDeadline}
              </div>
            </div>
          </div>

          {opportunity.location && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
              <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="text-sm font-semibold text-foreground">
                  {opportunity.location}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description & Details */}
        <div className="space-y-6 border-t border-border pt-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">About Opportunity</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {opportunity.description}
            </p>
          </div>

          {opportunity.eligibility && (
            <div>
              <h2 className="text-lg font-bold text-foreground">Eligibility</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {opportunity.eligibility}
              </p>
            </div>
          )}

          {opportunity.benefits && (
            <div>
              <h2 className="text-lg font-bold text-foreground">Benefits</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {opportunity.benefits}
              </p>
            </div>
          )}

          {/* Action button */}
          {opportunity.registrationLink && (
            <div className="pt-4">
              <a
                href={opportunity.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-base font-semibold"
              >
                <span>Apply / Register Now</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
