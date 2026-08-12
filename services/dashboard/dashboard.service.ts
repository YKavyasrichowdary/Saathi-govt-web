import repository from "@/repositories/dashboard/dashboard.repository";
import missionService from "@/services/mission/mission.service";
import recommendationService from "@/services/recommendation/recommendation.service";
import activityService from "@/services/progress/activity.service";
import dashboardInsightsService from "./dashboard-insights.service";
import { calculateProfileCompletion } from "@/lib/profile/completion";
import { DashboardData } from "@/types/dashboard";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

class DashboardService {
  async getDashboard(userId: string): Promise<DashboardData> {
    const mission = await missionService.getCurrentMission(userId);

    const [
      user,
      stats,
      resume,
      activity,
      saved,
      userXP,
      todayMissions,
      profile,
      streakHistory,
      recommendations,
      currentStreak,
      longestStreak,
    ] = await Promise.all([
      repository.getUser(userId),
      repository.getQuickStats(userId),
      repository.getLatestResume(userId),
      repository.getRecentActivity(userId),
      repository.getSavedOpportunities(userId),
      repository.getUserXP(userId),
      missionService.getTodayMissions(userId),
      repository.getUserProfile(userId),
      repository.getStreakHistory(userId),
      recommendationService.getRecommendations(userId),
      activityService.getCurrentStreak(userId),
      activityService.getLongestStreak(userId),
    ]);

    const priorityMap: Record<string, "High" | "Medium" | "Low"> = {
      HIGH: "High",
      MEDIUM: "Medium",
      LOW: "Low",
    };

    const todayTasks = todayMissions.map((m: any) => {
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
      currentStreak,
      longestStreak,
      days: streakHistory,
    };

    const completionPercentage = calculateProfileCompletion(profile);

    const remaining: string[] = [];

    if (!profile?.phone) {
      remaining.push("Add Phone Number");
    }

    if (!profile?.educationLevel) {
      remaining.push("Add Education Level");
    }

    if (!profile?.institutionName) {
      remaining.push("Add Institution");
    }

    if (!profile?.course) {
      remaining.push("Add Course");
    }

    if (!profile?.specialization) {
      remaining.push("Add Specialization");
    }

    if (!profile?.graduationYear) {
      remaining.push("Add Graduation Year");
    }

    if (!profile?.skills?.length) {
      remaining.push("Add Skills");
    }

    if (!profile?.interests?.length) {
      remaining.push("Add Interests");
    }

    if (!profile?.careerGoals?.length) {
      remaining.push("Add Career Goals");
    }

    if (!profile?.resumeId) {
      remaining.push("Upload Resume");
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

      recommendations: recommendations
        .slice(0, 4)
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          organization: item.organization,
          deadline: item.deadline,
          matchScore: item.matchScore,
          profileMatchScore: item.profileMatchScore,
          resumeMatchScore: item.resumeMatchScore,
          isSaved: Boolean(item.isSaved),
          slug: item.slug,
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