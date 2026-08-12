export type Priority = "High" | "Medium" | "Low";

export type InsightType = "recommendation" | "improvement";

export interface DashboardTask {
  id: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
  completed: boolean;
  priority: Priority;
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
  type: InsightType;
  highlightText: string;
}

export interface DashboardMission {
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
}

export interface DashboardHeroData {
  greeting: string;
  name: string;
  readinessScore: number;
  currentMission: DashboardMission | null;
  xp: number;
}

export interface DashboardStats {
  documents: number;
  applications: number;
  saved: number;
  analyses: number;
}

export interface DashboardResume {
  overallScore: number;
  atsScore: number;
  summary: string;
  document: string;
}

export interface DashboardRecommendation {
  id: string;
  title: string;
  organization: string;
  deadline: Date | string | null;
  matchScore: number;
  profileMatchScore?: number;
  resumeMatchScore?: number;
  isSaved: boolean;
  slug: string;
}

export interface DashboardActivity {
  id: string;
  title: string;
  message: string;
  createdAt: Date | string;
}

export interface DashboardData {
  hero: DashboardHeroData;

  mission: DashboardMission | null;

  stats: DashboardStats;

  resume: DashboardResume | null;

  todayTasks: DashboardTask[];

  streak: StreakData;

  profileCompletion: ProfileCompletionData;

  recommendations: DashboardRecommendation[];

  activity: DashboardActivity[];

  insights: AIInsightData[];
}