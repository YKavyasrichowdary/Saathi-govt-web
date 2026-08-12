import {
  EducationLevel,
  OpportunityMode,
  OpportunitySource,
  OpportunityType,
} from "@prisma/client";

export interface NormalizedOpportunity {
  title: string;
  organization: string;

  type: OpportunityType;
  source: OpportunitySource;

  sourceName?: string;
  sourceUrl?: string;
  officialId?: string;
  slug?: string;

  description: string;

  registrationLink: string;

  mode: OpportunityMode;
  location?: string;

  eligibility?: string;
  benefits?: string;
  applicationProcess?: string;

  deadline?: Date;
  startDate?: Date;
  endDate?: Date;

  educationLevel?: EducationLevel;
  course?: string;
  specialization?: string;
  state?: string;
  city?: string;
  minCGPA?: number;

  skills: string[];
  interests: string[];
  careerTags: string[];
}

export function requiresPreparation(type: OpportunityType) {
  return [
    "INTERNSHIP",
    "JOB",
    "HACKATHON",
    "COMPETITIVE_EXAM",
    "RESEARCH",
    "FELLOWSHIP",
  ].includes(type);
}
