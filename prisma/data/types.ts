import {
  EducationLevel,
  OpportunityMode,
  OpportunitySource,
  OpportunityStatus,
  OpportunityType,
} from "@prisma/client";

export interface SeedOpportunity {
  title: string;
  slug: string;
  description: string;
  organization: string;
  source: OpportunitySource;
  type: OpportunityType;
  mode: OpportunityMode;
  status: OpportunityStatus;
  registrationLink: string;

  imageUrl?: string;
  bannerUrl?: string;

  amount?: string;

  eligibility?: string;
  benefits?: string;
  applicationProcess?: string;

  deadline?: Date;

  educationLevel?: EducationLevel;

  course?: string;

  specialization?: string;

  state?: string;

  city?: string;

  minCGPA?: number;

  featured?: boolean;

  verified?: boolean;

  officialId?: string;

  startDate?: Date;

  endDate?: Date;

  skills?: string[];

  interests?: string[];

  careerTags?: string[];
}