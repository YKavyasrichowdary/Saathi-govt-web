import Link from "next/link";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";
import applicationService from "@/services/application/application.service";

const STATUS_STYLES: Record<string, string> = {
  SUBMITTED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  ACCEPTED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  WITHDRAWN: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

export default async function ApplicationsPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const applications = await applicationService.getApplications(
    session.user.id
  );

  return (
    <AppShell
      title="My Applications"
      subtitle={`${applications.length} tracked applications`}
    >
      {applications.length === 0 ? (
        <div className="surface-card flex flex-col items-center rounded-2xl p-12 text-center">
          <h2 className="text-xl font-semibold">
            No applications yet
          </h2>

          <p className="mt-2 text-muted-foreground">
            Apply to scholarships, internships and hackathons to track them here.
          </p>

          <Link
            href="/opportunities"
            className="btn-primary mt-6"
          >
            Explore Opportunities
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application: any) => (
            <div
              key={application.id}
              className="surface-card p-6 rounded-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-lg">
                    {application.opportunity.title}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    {application.opportunity.organization}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium shrink-0 ${
                    STATUS_STYLES[application.status] || "bg-muted text-muted-foreground"
                  }`}
                >
                  {application.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Applied on{" "}
                  {new Date(application.appliedAt).toLocaleDateString("en-IN")}
                </span>

                <Link
                  href={`/opportunities/${application.opportunity.slug}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View Opportunity →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}