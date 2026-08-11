import repository from "@/repositories/dashboard/dashboard.repository";
import missionService from "@/services/mission/mission.service";
import dashboardInsightsService from "./dashboard-insights.service";
import { DashboardData } from "@/types/dashboard";

const PROFILE_RULES = {
  base: 30,
  basic: 20,
  resume: 25,
  education: 15,
  contact: 10,
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

class DashboardService {
  async getDashboard(userId: string): Promise<DashboardData> {
    const [
      user,
      mission,
      stats,
      resume,
      activity,
      saved,
      userXP,
      userMissions,
      profile,
      streakHistory,
    ] = await Promise.all([
      repository.getUser(userId),
      missionService.getCurrentMission(userId),
      repository.getQuickStats(userId),
      repository.getLatestResume(userId),
      repository.getRecentActivity(userId),
      repository.getSavedOpportunities(userId),
      repository.getUserXP(userId),
      repository.getUserMissions(userId),
      repository.getUserProfile(userId),
      repository.getStreakHistory(userId),
    ]);

    const priorityMap: Record<string, "High" | "Medium" | "Low"> = {
      HIGH: "High",
      MEDIUM: "Medium",
      LOW: "Low",
    };

    const todayTasks = userMissions.map((m: any) => {
      let rewardStr = "+10 XP";
      if (m.rewardResumeScore) rewardStr = `+${m.rewardResumeScore} Resume Score`;
      else if (m.rewardProfileScore) rewardStr = `+${m.rewardProfileScore} Profile Score`;
      else if (m.rewardXP) rewardStr = `+${m.rewardXP} XP`;

      return {
        id: m.id,
        title: m.title,
        description: m.description,
        duration: `${m.estimatedMinutes} mins`,
        reward: rewardStr,
        completed: m.status === "COMPLETED",
        priority: priorityMap[m.priority] ?? "Medium",
      };
    });

    const streak = {
      currentStreak: userXP?.currentStreak ?? 0,
      longestStreak: userXP?.longestStreak ?? 0,
      days: streakHistory,
    };

    const remaining: string[] = [];
    let completionPercentage = PROFILE_RULES.base;

    if (user?.name && user?.email) completionPercentage += PROFILE_RULES.basic;
    else remaining.push("Complete Basic Details");

    if (resume) completionPercentage += PROFILE_RULES.resume;
    else remaining.push("Upload Resume");

    if (profile?.educationLevel) completionPercentage += PROFILE_RULES.education;
    else remaining.push("Add Education Profile");

    if (profile?.phone || profile?.city) completionPercentage += PROFILE_RULES.contact;
    else remaining.push("Add Contact Information");

    if (completionPercentage > 100) {
      completionPercentage = 100;
    }

    const profileCompletion = {
      percentage: completionPercentage,
      remaining,
    };

    const insights = await dashboardInsightsService.generate({
      user,
      resume,
      mission,
      stats,
    });

    return {
      hero: {
        greeting: getGreeting(),
        name: user?.name ?? "",
        readinessScore: resume?.overallScore ?? 0,
        currentMission: mission,
        xp: userXP?.totalXP ?? 0,
      },

      mission,

      stats,

      resume: resume
        ? {
            overallScore: resume.overallScore,
            atsScore: resume.atsScore,
            summary: resume.summary,
            document: resume.document.title,
          }
        : null,

      todayTasks,

      streak,

      profileCompletion,

      recommendations: saved.map((item: any) => ({
        id: item.opportunity.id,
        title: item.opportunity.title,
        organization: item.opportunity.organization,
        deadline: item.opportunity.deadline,
      })),

      activity: activity.map((item: any) => ({
        id: item.id,
        title: item.title,
        message: item.message,
        createdAt: item.createdAt,
      })),

      insights,
    };
  }
}

export default new DashboardService();