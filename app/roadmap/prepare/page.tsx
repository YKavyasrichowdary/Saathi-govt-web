import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";

import PreparationWizard from "@/components/roadmap/wizard/PreparationWizard";

export default async function PrepareRoadmapPage() {

  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  return (
    <AppShell
      title="AI Preparation Wizard"
      subtitle="Let's build your personalized execution roadmap."
    >
      <PreparationWizard />
    </AppShell>
  );
}