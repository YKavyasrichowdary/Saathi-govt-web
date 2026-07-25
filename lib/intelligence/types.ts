export interface RecommendationAnalysis {
  score: number;
  strengths: string[];
  missing: string[];
  nextSteps: string[];
  bestFor?: string;
}

export interface PriorityItem {
  type:
    | "PROFILE"
    | "OPPORTUNITY"
    | "DOCUMENT"
    | "APPLICATION"
    | "NOTIFICATION";

  title: string;

  description: string;

  action: string;

  priority: number;
}

export interface DeadlineStatus {
  label: string;

  color:
    | "green"
    | "yellow"
    | "orange"
    | "red";

  daysLeft: number;
}