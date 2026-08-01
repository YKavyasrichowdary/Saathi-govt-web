import { AIInsightData } from "@/types/dashboard";

interface GenerateInsightsContext {
  user: any;
  resume: any;
  mission: any;
  stats: any;
}

class DashboardInsightsService {
  async generate(context: GenerateInsightsContext): Promise<AIInsightData[]> {
    const { resume, mission } = context;
    const insights: AIInsightData[] = [];

    if (resume?.atsScore) {
      insights.push({
        id: "resume-ats",
        title: "ATS Score Updated",
        description: `Your resume ATS score is currently ${resume.atsScore}/100.`,
        type: "improvement",
        highlightText: `${resume.atsScore} points`,
      });
    } else {
      insights.push({
        id: "resume-ats",
        title: "ATS Score Improved",
        description: "Your resume score improved after the last analysis.",
        type: "improvement",
        highlightText: "9 points",
      });
    }

    if (mission) {
      insights.push({
        id: "next-mission",
        title: "Recommended Next Step",
        description: `Completing '${mission.title}' will boost your career readiness.`,
        type: "recommendation",
        highlightText: mission.title,
      });
    }

    return insights;
  }
}

export default new DashboardInsightsService();
