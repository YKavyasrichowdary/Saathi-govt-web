import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";

import { getSession } from "@/lib/auth";

import aiDashboardService from "@/services/ai/dashboard.service";

import { buildDailySummary } from "@/lib/ai/summary-builder";
import { calculateProfileStrength } from "@/lib/intelligence/profile-strength";

import AIHero from "@/components/ai/AIHero";
import SnapshotCard from "@/components/ai/SnapshotCard";
import PriorityCard from "@/components/ai/PriorityCard";
import QuickActions from "@/components/ai/QuickActions";
import ChatContainer from "@/components/ai/ChatContainer";
import ProfileStrengthCard from "@/components/profile/ProfileStrengthCard";

export default async function AIPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const dashboard =
    await aiDashboardService.getDashboard(
      session.user.id
    );

    

  const strength = calculateProfileStrength(dashboard.profile);

  const summary = buildDailySummary({
    profileCompletion: dashboard.profileCompletion,
    recommendationCount:
      dashboard.recommendations.length,
    topRecommendation:
      (dashboard.recommendations[0] as any)?.opportunity
        ?.title ?? dashboard.recommendations[0]?.title,
  });

  return (
    <AppShell
      title="Saathi AI"
      subtitle="Your personalized career companion"
    >
      <div className="grid gap-6 xl:grid-cols-12">

        <section className="space-y-6 xl:col-span-8">

          <AIHero summary={summary} />

          <QuickActions />

          <ChatContainer />

        </section>

        <aside className="space-y-6 xl:col-span-4">

          <ProfileStrengthCard strength={strength} />

          <SnapshotCard
            profileCompletion={
              dashboard.profileCompletion
            }
            recommendations={
              dashboard.recommendations.length
            }
            applications={
              dashboard.applications.length
            }
            saved={
              dashboard.saved.length
            }
            documents={
              dashboard.documents.length
            }
            notifications={
              dashboard.notifications.filter(
                (n: any) => !n.isRead
              ).length
            }
          />

          <PriorityCard
            priorities={dashboard.priorities}
          />

        </aside>

      </div>

    </AppShell>
  );
}