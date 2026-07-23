import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";

import { getSession } from "@/lib/auth";

import applicationService from "@/services/application/application.service";

export default async function ApplicationsPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const applications =
    await applicationService.getApplications(
      session.user.id
    );

  return (
    <AppShell
      title="My Applications"
      subtitle={`${applications.length} tracked applications`}
    >
      <div className="space-y-4">

        {applications.map((application) => (

          <div
            key={application.id}
            className="surface-card p-6 rounded-2xl"
          >

            <h2 className="font-semibold text-lg">
              {application.opportunity.title}
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              {application.opportunity.organization}
            </p>

            <div className="mt-4 flex items-center justify-between">

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {application.status}
              </span>

              <span className="text-xs text-muted-foreground">
                Applied on{" "}
                {new Date(
                  application.appliedAt
                ).toLocaleDateString()}
              </span>

            </div>

          </div>

        ))}

      </div>
    </AppShell>
  );
}