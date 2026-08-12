import { z } from "zod";

export const personalInfoSchema = z.object({
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

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  country: z
    .string()
    .min(2, "Country is required"),

  bio: z
    .string()
    .max(500, "Maximum 500 characters")
    .optional(),
});

export const educationSchema = z.object({
  educationLevel: z.enum([
    "SCHOOL",
    "INTERMEDIATE",
    "DIPLOMA",
    "UNDERGRADUATE",
    "POSTGRADUATE",
    "DOCTORATE",
    "CERTIFICATION",
    "OTHER",
  ]),

  institutionName: z.string().min(2),

  university: z.string().optional(),

  course: z.string().min(2),

  specialization: z.string().optional(),

  currentSemester: z.string().optional(),

  graduationYear: z.coerce.number(),

  cgpa: z.coerce.number().optional(),
});

export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

export type EducationForm = z.infer<typeof educationSchema>;