import { EducationLevel, Gender } from "@prisma/client";

export interface CreateProfileDto {
  phone?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  educationLevel?: EducationLevel;
  institutionName?: string;
  university?: string;
  course?: string;
  specialization?: string;
  currentSemester?: string;
  graduationYear?: number;
  cgpa?: number;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

export interface UpdateProfileDto
  extends Partial<CreateProfileDto> {}