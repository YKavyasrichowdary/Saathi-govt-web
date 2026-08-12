import { AIInsightData } from "@/types/dashboard";

interface GenerateInsightsContext {
  user: any;
  resume: any;
  mission: any;
  stats: any;
}

class DashboardInsightsService {
  async generate(
    context: GenerateInsightsContext
  ): Promise<AIInsightData[]> {
    const {
      user,
      resume,
      mission,
      stats,
    } = context;

    const insights: AIInsightData[] = [];

    /*
     * Resume insight
     */
    if (resume) {
      if (resume.atsScore >= 80) {
        insights.push({
          id: "resume-ats",
          title: "Strong ATS Compatibility",
          description:
            `Your latest resume analysis has an ATS score of ${resume.atsScore}/100.`,
          type: "improvement",
          highlightText: `${resume.atsScore}/100`,
        });
      } else if (resume.atsScore >= 60) {
        insights.push({
          id: "resume-ats",
          title: "Resume Can Be Improved",
          description:
            `Your latest resume analysis has an ATS score of ${resume.atsScore}/100. Review the analysis to identify areas that need improvement.`,
          type: "recommendation",
          highlightText: `${resume.atsScore}/100`,
        });
      } else {
        insights.push({
          id: "resume-ats",
          title: "Resume Needs Attention",
          description:
            `Your latest resume analysis has an ATS score of ${resume.atsScore}/100. Improving your resume could increase its compatibility with applicant tracking systems.`,
          type: "recommendation",
          highlightText: `${resume.atsScore}/100`,
        });
      }
    } else {
      insights.push({
        id: "resume-missing",
        title: "Analyze Your Resume",
        description:
          "Upload and analyze a resume to get your ATS score and personalized resume recommendations.",
        type: "recommendation",
        highlightText: "Resume analysis",
      });
    }

    /*
     * Today's mission
     */
    if (mission) {
      insights.push({
        id: "next-mission",
        title:
          mission.status === "COMPLETED"
            ? "Today's Mission Completed"
            : "Today's Priority",
        description:
          mission.status === "COMPLETED"
            ? `You completed '${mission.title}'. Keep the momentum going.`
            : `Your current priority is '${mission.title}'. Completing it will keep your daily progress on track.`,
        type:
          mission.status === "COMPLETED"
            ? "improvement"
            : "recommendation",
        highlightText: mission.title,
      });
    }

    /*
     * Saved opportunities
     */
    if (stats?.saved > 0) {
      insights.push({
        id: "saved-opportunities",
        title: "Saved Opportunities",
        description:
          `You currently have ${stats.saved} saved ${
            stats.saved === 1
              ? "opportunity"
              : "opportunities"
          }. Review them and prioritize the ones with approaching deadlines.`,
        type: "recommendation",
        highlightText: `${stats.saved} saved`,
      });
    }

    /*
     * Applications
     */
    if (stats?.applications > 0) {
      insights.push({
        id: "applications",
        title: "Applications Tracked",
        description:
          `You have ${stats.applications} ${
            stats.applications === 1
              ? "application"
              : "applications"
          } recorded in Saathi.`,
        type: "improvement",
        highlightText: `${stats.applications} applications`,
      });
    }

    /*
     * New user fallback
     */
    if (insights.length === 0) {
      insights.push({
        id: "getting-started",
        title: "Start Building Your Profile",
        description:
          "Complete your profile, upload your resume, and explore opportunities to start building your career roadmap.",
        type: "recommendation",
        highlightText: "Get started",
      });
    }

    /*
     * Keep the dashboard concise.
     */
    return insights.slice(0, 4);
  }
}

export default new DashboardInsightsService();