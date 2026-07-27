export interface DashboardData {
  hero: {
    greeting: string;
    name: string;
  };

  mission: {
    id: string;
    title: string;
    description: string;
    estimatedMinutes: number;
    priority: string;
    progress?: number;
    rewardResumeScore?: number | null;
    rewardOpportunityMatch?: number | null;
    rewardProfileScore?: number | null;
    rewardXP?: number | null;
  } | null;

  stats: {
    documents: number;
    applications: number;
    saved: number;
    analyses: number;
  };

  resume: {
    overallScore: number;
    atsScore: number;
    summary: string;
    document: string;
  } | null;

  recommendations: any[];

  activity: any[];
}