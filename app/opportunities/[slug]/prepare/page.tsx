import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { AppShell } from "@/components/AppShell";

import PreparationWizard from "@/components/roadmap/wizard/PreparationWizard";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PrepareOpportunityPage({
  params,
}: PageProps) {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const { id } = await params;

  return (
    <AppShell
      title="Prepare with AI"
      subtitle="Let's build your personalized execution roadmap."
    >
      <PreparationWizard opportunityId={id} />
    </AppShell>
  );
}