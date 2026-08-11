import { z } from "zod";

export const opportunityMatchSchema = z.object({

  matchScore: z
    .number()
    .min(0)
    .max(100),

  readinessScore: z
    .number()
    .min(0)
    .max(100),

  strengths: z.array(
    z.string()
  ),

  missingSkills: z.array(
    z.string()
  ),

  recommendations: z.array(
    z.string()
  ),

  summary: z.string(),

});