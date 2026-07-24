import { z } from "zod";

export const onboardingSchema = z.object({
  // ===========================
  // Personal Information
  // ===========================

  phone: z
    .string()
    .min(10, "Phone number must contain at least 10 digits")
    .max(15),

  gender: z.enum([
    "MALE",
    "FEMALE",
    "OTHER",
    "PREFER_NOT_TO_SAY",
  ]),

  dateOfBirth: z.string().min(1, "Date of birth is required"),

  city: z.string().min(2, "City is required"),

  state: z.string().min(2, "State is required"),

  country: z.string().min(2, "Country is required"),

  bio: z
    .string()
    .max(500)
    .optional(),

  // ===========================
  // Education
  // ===========================

  educationLevel: z.enum([
    "SCHOOL",
    "INTERMEDIATE",
    "DIPLOMA",
    "UNDERGRADUATE",
    "POSTGRADUATE",
    "DOCTORATE",
    "CERTIFICATION",
    "COMPETITIVE_EXAM",
    "OTHER",
  ]),

  institutionName: z.string().min(2),

  university: z.string().optional(),

  course: z.string().min(2),

  specialization: z.string().optional(),

  currentSemester: z.string().optional(),

  graduationYear: z.coerce.number(),

  cgpa: z.coerce.number().optional(),

  // ===========================
  // Skills
  // ===========================

  skills: z.array(
    z.object({
      name: z.string(),
      level: z.enum([
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED",
      ]),
    })
  ),

  // ===========================
  // Interests
  // ===========================

  interests: z.array(z.string()),

  // ===========================
  // Career Goals
  // ===========================

  careerGoals: z.array(z.string()),
});

export type OnboardingForm = z.infer<
  typeof onboardingSchema
>;

export type OnboardingInput = z.input<
  typeof onboardingSchema
>;