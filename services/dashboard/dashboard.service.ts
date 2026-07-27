import repository from "@/repositories/dashboard/dashboard.repository";
import missionService from "@/services/mission/mission.service";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

class DashboardService {
  async getDashboard(userId: string) {
    const [
      user,
      mission,
      stats,
      resume,
      activity,
      saved,
    ] = await Promise.all([
      repository.getUser(userId),
      missionService.getCurrentMission(userId),
      repository.getQuickStats(userId),
      repository.getLatestResume(userId),
      repository.getRecentActivity(userId),
      repository.getSavedOpportunities(userId),
    ]);

    return {
      hero: {
        greeting: getGreeting(),
        name: user?.name ?? "",
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

      recommendations: saved.map((item) => ({
        id: item.opportunity.id,
        title: item.opportunity.title,
        organization: item.opportunity.organization,
        deadline: item.opportunity.deadline,
      })),

      activity,
    };
  }
}

export default new DashboardService();