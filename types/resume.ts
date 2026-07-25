export interface ResumeAnalysis {
  overallScore: number;
  atsScore: number;

  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  improvements: string[];

  summary: string;
}

export interface ResumeAnalysisRequest {
  documentId: string;
}

export interface ResumeAnalysisResponse {
  success: boolean;

  analysis?: ResumeAnalysis;

  message?: string;
}

export interface ResumeScore {
  score: number;

  level:
    | "Excellent"
    | "Strong"
    | "Good"
    | "Needs Improvement";

  color:
    | "green"
    | "blue"
    | "yellow"
    | "red";
}

export interface ResumeInsight {
  title: string;

  items: string[];
}

export interface ResumeReviewState {
  loading: boolean;

  error: string | null;

  analysis: ResumeAnalysis | null;
}