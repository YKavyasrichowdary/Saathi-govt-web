import { redirect } from "next/navigation";

import { AppShell } from "@/components/AppShell";

import { getSession } from "@/lib/auth";

import dashboardService from "@/services/dashboard/dashboard.service";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

import DashboardHero from "@/components/dashboard/DashboardHero";

import MissionHero from "@/components/dashboard/MissionHero";

import TodayTasks from "@/components/dashboard/TodayTasks";

import StreakCard from "@/components/dashboard/StreakCard";

import QuickStats from "@/components/dashboard/QuickStats";

import ResumeHealth from "@/components/dashboard/ResumeHealth";

import RecommendedSection from "@/components/dashboard/RecommendedSection";

import RecentActivity from "@/components/dashboard/RecentActivity";

import AIInsights from "@/components/dashboard/AIInsights";

import ProfileCompletion from "@/components/dashboard/ProfileCompletion";

export default async function DashboardPage() {

  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const dashboard =
    await dashboardService.getDashboard(
      session.user.id
    );

  return (
    <AppShell
      title="Dashboard"
      subtitle="Welcome back"
    >
      <DashboardLayout

        hero={
          <DashboardHero
            dashboard={dashboard}
          />
        }

        tasks={<TodayTasks />}

        streak={<StreakCard />}

        stats={
          <QuickStats
            stats={dashboard.stats}
          />
        }

        profile={<ProfileCompletion />}

        resume={
          <ResumeHealth
            data={dashboard.resume}
          />
        }

        recommendations={
          <RecommendedSection
            opportunities={
              dashboard.recommendations
            }
          />
        }

        insights={<AIInsights />}

        activity={
          <RecentActivity
            activities={
              dashboard.activity
            }
          />
        }

      />
    </AppShell>
  );
}