import { Opportunity } from "@prisma/client";

export interface MatchBreakdown {
  category: string;
  matched: boolean;
  weight: number;
}

export interface RecommendationAnalysis {
  score: number;
  strengths: string[];
  missing: string[];
  nextSteps: string[];
  bestFor?: string;
}

export interface RecommendedOpportunity extends Opportunity {
  opportunity?: any;
  matchScore: number;
  profileMatchScore?: number;
  resumeMatchScore?: number;
  breakdown: MatchBreakdown[];
  matchReasons?: string[];
  analysis?: RecommendationAnalysis;
}

export interface RecommendedOpportunity extends Opportunity {
  opportunity?: any;

  matchScore: number;
  profileMatchScore?: number;
  resumeMatchScore?: number;

  isSaved?: boolean;

  breakdown: MatchBreakdown[];
  matchReasons?: string[];

  analysis?: RecommendationAnalysis;
}