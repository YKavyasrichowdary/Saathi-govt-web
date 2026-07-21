export interface CreateProfileDto {
  phone?: string;
  college?: string;
  university?: string;
  degree?: string;
  branch?: string;
  currentYear?: number;
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