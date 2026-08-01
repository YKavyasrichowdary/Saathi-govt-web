export interface DashboardTask {
  id: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  days: number[];
}

export interface ProfileCompletionData {
  percentage: number;
  remaining: string[];
}

export interface AIInsightData {
  id: string;
  title: string;
  description: string;
  type: "recommendation" | "improvement";
  highlightText: string;
}

export interface DashboardHeroData {
  greeting: string;
  name: string;
  readinessScore: number;
  currentMission: DashboardData["mission"];
  xp: number;
}

export interface DashboardData {
  hero: DashboardHeroData;

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

  todayTasks: DashboardTask[];

  streak: StreakData;

  profileCompletion: ProfileCompletionData;

  recommendations: any[];

  activity: any[];

  insights: AIInsightData[];
}