import {
  EducationLevel,
  Gender,
} from "@prisma/client";

export interface ProfileSkillInput {
  name: string;
  level?: string;
}

export interface CreateProfileDto {
  phone?: string;

  gender?: Gender;

  dateOfBirth?: string | Date;

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

  skills?: ProfileSkillInput[];

  interests?: string[];

  careerGoals?: string[];
}

export interface UpdateProfileDto
  extends Partial<CreateProfileDto> {}