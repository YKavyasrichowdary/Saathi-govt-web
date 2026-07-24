import { notFound } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import opportunityService from "@/services/opportunity/opportunity.service";

export default async function OpportunityDetailsPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const opportunity =
    await opportunityService.getBySlug(
      slug
    );

  if (!opportunity) {
    notFound();
  }

  return (
    <AppShell
      title={opportunity.title}
      subtitle={opportunity.organization}
    >
      <div className="space-y-8">

        <section className="surface-card p-8">

          <h2 className="text-xl font-semibold">
            Description
          </h2>

          <p className="mt-4 whitespace-pre-wrap text-muted-foreground">
            {opportunity.description}
          </p>

        </section>

        {opportunity.eligibility && (
          <section className="surface-card p-8">

            <h2 className="text-xl font-semibold">
              Eligibility
            </h2>

            <p className="mt-4 whitespace-pre-wrap text-muted-foreground">
              {opportunity.eligibility}
            </p>

          </section>
        )}

        {opportunity.benefits && (
          <section className="surface-card p-8">

            <h2 className="text-xl font-semibold">
              Benefits
            </h2>

            <p className="mt-4 whitespace-pre-wrap text-muted-foreground">
              {opportunity.benefits}
            </p>

          </section>
        )}

        <div className="pt-4">
          <a
            href={opportunity.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Apply Now
          </a>
        </div>

      </div>
    </AppShell>
  );
}
