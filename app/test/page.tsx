import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHero from "@/components/dashboard/DashboardHero";
import TodayTasks from "@/components/dashboard/TodayTasks";
import StreakCard from "@/components/dashboard/StreakCard";
import QuickStats from "@/components/dashboard/QuickStats";
import ProfileCompletion from "@/components/dashboard/ProfileCompletion";
import ResumeHealth from "@/components/dashboard/ResumeHealth";
import RecommendedSection from "@/components/dashboard/RecommendedSection";
import AIInsights from "@/components/dashboard/AIInsights";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function Page() {
  const session = { user: { name: "Ananya Sharma" } };

  return (
    <div className="p-8 bg-background min-h-screen">
      <DashboardLayout
        hero={<DashboardHero greeting="Good morning" name={session.user.name} />}
        tasks={
          <TodayTasks
            tasks={[
              {
                id: "1",
                title: "Complete Resume Review",
                description: "Fix ATS formatting and improve technical skills.",
                duration: "15 mins",
                reward: "+5 Resume Score",
                priority: "High",
                completed: false,
              },
            ]}
          />
        }
        streak={
          <StreakCard
            streak={{
              currentStreak: 14,
              longestStreak: 31,
              days: [2, 2, 3, 1, 4, 2, 0, 1, 2, 3, 2, 4, 3, 2],
            }}
          />
        }
        stats={
          <QuickStats
            stats={{ documents: 8, applications: 12, saved: 28, analyses: 21 }}
          />
        }
        profile={
          <ProfileCompletion
            completion={{
              percentage: 75,
              remaining: ["Add Skills", "Upload Resume"],
            }}
          />
        }
        resume={
          <ResumeHealth
            data={{
              overallScore: 84,
              atsScore: 91,
              summary: "Good resume",
              document: "Resume.pdf",
            }}
          />
        }
        recommendations={
          <RecommendedSection
            opportunities={[
              {
                id: "1",
                title: "Google STEP Internship",
                organization: "Google",
                deadline: "2 Days Left",
              },
              {
                id: "2",
                title: "Microsoft Explore",
                organization: "Microsoft",
                deadline: "5 Days Left",
              },
            ]}
          />
        }
        insights={
          <AIInsights
            insights={[
              {
                id: "1",
                title: "ATS Score Improved",
                description: "Your resume score improved by",
                type: "improvement",
                highlightText: "9 points",
              },
            ]}
          />
        }
        activity={
          <RecentActivity
            activities={[
              {
                id: "1",
                title: "Resume Analyzed",
                message: "Your resume received a score of 84%.",
                createdAt: new Date().toISOString(),
              },
            ]}
          />
        }
      />
    </div>
  );
}