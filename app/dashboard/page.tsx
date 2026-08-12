import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";
import { getSession } from "@/lib/auth";
import dashboardService from "@/services/dashboard/dashboard.service";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHero from "@/components/dashboard/DashboardHero";
import TodayTasks from "@/components/dashboard/TodayTasks";
import StreakCard from "@/components/dashboard/StreakCard";
import QuickStats from "@/components/dashboard/QuickStats";
import ResumeHealth from "@/components/dashboard/ResumeHealth";
import RecommendedSection from "@/components/dashboard/RecommendedSection";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AIInsights from "@/components/dashboard/AIInsights";
import ProfileCompletion from "@/components/dashboard/ProfileCompletion";
import FadeIn from "@/components/common/FadeIn";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const dashboard = await dashboardService.getDashboard(session.user.id);

  return (
    <AppShell title="Dashboard" subtitle="Welcome back">
      <FadeIn>
        <DashboardLayout
          hero={
            <DashboardHero
              greeting={dashboard.hero.greeting}
              name={dashboard.hero.name}
              mission={dashboard.mission}
              readinessScore={dashboard.hero.readinessScore}
            />
          }
          tasks={<TodayTasks tasks={dashboard.todayTasks} />}
          streak={<StreakCard streak={dashboard.streak} />}
          stats={<QuickStats stats={dashboard.stats} />}
          profile={
            <ProfileCompletion completion={dashboard.profileCompletion} />
          }
          resume={<ResumeHealth data={dashboard.resume} />}
          recommendations={
            <RecommendedSection opportunities={dashboard.recommendations} />
          }
          insights={<AIInsights insights={dashboard.insights} />}
          activity={<RecentActivity activities={dashboard.activity} />}
        />
      </FadeIn>
    </AppShell>
  );
}