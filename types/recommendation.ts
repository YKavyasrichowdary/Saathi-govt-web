import { Opportunity } from "@prisma/client";

export interface MatchBreakdown {
  category: string;
  matched: boolean;
  weight: number;
}

export interface RecommendedOpportunity extends Opportunity {
  matchScore: number;
  breakdown: MatchBreakdown[];
}