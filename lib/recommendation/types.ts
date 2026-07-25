export interface RecommendationAnalysis {
  score: number;
  strengths: string[];
  missing: string[];
  nextSteps: string[];
}
