export interface OpportunityMatch {

  matchScore: number;

  readinessScore: number;

  strengths: string[];

  missingSkills: string[];

  recommendations: string[];

  summary: string;

}

export interface OpportunityMatchInput {

  userId: string;

  opportunityId: string;

}

export interface OpportunityMatchResponse {
  id: string;

  matchScore: number;

  readinessScore: number;

  strengths: string[];

  missingSkills: string[];

  recommendations: string[];

  summary: string;

  generatedBy: string;

  createdAt: Date;
}