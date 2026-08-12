import { z } from "zod";

export const opportunitySchema = z.object({
  title: z.string().min(5, "Title is required"),

  organization: z.string().min(2, "Organization is required"),

  source: z.enum([
    "GOVERNMENT",
    "PRIVATE",
    "UNIVERSITY",
    "COMPANY",
    "NGO",
  ]),

  sourceName: z.string().optional(),

  sourceUrl: z.string().url().optional().or(z.literal("")),

  type: z.enum([
    "SCHOLARSHIP",
    "HACKATHON",
    "INTERNSHIP",
    "JOB",
    "COMPETITIVE_EXAM",
    "COURSE",
    "EVENT",
    "COMPETITION",
    "FELLOWSHIP",
    "RESEARCH",
    "GRANT",
    "GOVERNMENT_SCHEME",
  ]),

  mode: z.enum([
    "ONLINE",
    "OFFLINE",
    "HYBRID",
  ]),

  status: z.enum([
    "DRAFT",
    "OPEN",
    "UPCOMING",
    "CLOSED",
    "EXPIRED",
  ]),

  location: z.string().optional(),

  state: z.string().optional(),

  city: z.string().optional(),

  registrationLink: z.string().url(),

  imageUrl: z.string().url().optional().or(z.literal("")),

  bannerUrl: z.string().url().optional().or(z.literal("")),

  amount: z.string().optional(),

  educationLevel: z
    .enum([
      "SCHOOL",
      "INTERMEDIATE",
      "DIPLOMA",
      "UNDERGRADUATE",
      "POSTGRADUATE",
      "DOCTORATE",
      "CERTIFICATION",
      "OTHER",
    ])
    .optional()
    .or(z.literal("")),

  course: z.string().optional(),

  specialization: z.string().optional(),

  minCGPA: z.coerce.number().optional(),

  deadline: z.string().optional(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),

  description: z.string().min(20),

  eligibility: z.string().optional(),

  benefits: z.string().optional(),

  applicationProcess: z.string().optional(),

  featured: z.boolean(),

  verified: z.boolean(),
});

export type OpportunityForm = z.infer<
  typeof opportunitySchema
>;