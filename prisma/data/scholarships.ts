import {
  EducationLevel,
  OpportunityMode,
  OpportunitySource,
  OpportunityStatus,
  OpportunityType,
} from "@prisma/client";

import { SeedOpportunity } from "./types";

export const scholarships: SeedOpportunity[] = [
  {
    title: "AICTE Pragati Scholarship 2026",
    slug: "aicte-pragati-scholarship-2026",
    description:
      "Scholarship for girl students pursuing technical education in AICTE approved institutions.",
    organization: "AICTE",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.SCHOLARSHIP,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://www.aicte-india.org/",
    amount: "₹50,000 per year",
    eligibility:
      "Girl students admitted to AICTE approved institutions.",
    benefits:
      "Financial assistance towards tuition fees and academic expenses.",
    applicationProcess:
      "Apply online through the National Scholarship Portal.",
    deadline: new Date("2026-09-30"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    featured: true,
    verified: true,
  },

  {
    title: "AICTE Saksham Scholarship",
    slug: "aicte-saksham-scholarship",
    description:
      "Scholarship scheme for specially abled students pursuing technical education.",
    organization: "AICTE",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.SCHOLARSHIP,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://www.aicte-india.org/",
    amount: "₹50,000 per year",
    eligibility:
      "Differently-abled students enrolled in AICTE approved institutions.",
    benefits:
      "Financial support for academic expenses.",
    applicationProcess:
      "Apply through the National Scholarship Portal.",
    deadline: new Date("2026-09-25"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    featured: true,
    verified: true,
  },

  {
    title: "Reliance Foundation Undergraduate Scholarship",
    slug: "reliance-foundation-undergraduate-scholarship",
    description:
      "Merit-based scholarship for undergraduate students across India.",
    organization: "Reliance Foundation",
    source: OpportunitySource.PRIVATE,
    type: OpportunityType.SCHOLARSHIP,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://www.reliancefoundation.org/",
    amount: "Up to ₹2 Lakhs",
    eligibility:
      "First-year undergraduate students with strong academic performance.",
    benefits:
      "Financial support and mentorship.",
    applicationProcess:
      "Apply online through the official portal.",
    deadline: new Date("2026-10-10"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    verified: true,
  },

  {
    title: "INSPIRE Scholarship",
    slug: "inspire-scholarship",
    description:
      "Scholarship for students pursuing higher education in Basic and Natural Sciences.",
    organization: "Department of Science & Technology",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.SCHOLARSHIP,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://online-inspire.gov.in/",
    amount: "₹80,000 per year",
    eligibility:
      "Students pursuing Bachelor's or Master's in Natural Sciences.",
    benefits:
      "Annual scholarship and research encouragement.",
    applicationProcess:
      "Apply online through the INSPIRE portal.",
    deadline: new Date("2026-09-15"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    verified: true,
  },

  {
    title: "Post Matric Scholarship",
    slug: "post-matric-scholarship",
    description:
      "Government scholarship for students pursuing education after Class 10.",
    organization: "National Scholarship Portal",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.SCHOLARSHIP,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://scholarships.gov.in/",
    amount: "Varies by category",
    eligibility:
      "Eligible students belonging to notified categories.",
    benefits:
      "Tuition fee reimbursement and maintenance allowance.",
    applicationProcess:
      "Apply through NSP.",
    deadline: new Date("2026-08-31"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    featured: true,
    verified: true,
  },

  {
    title: "National Means-cum-Merit Scholarship",
    slug: "nmms-scholarship",
    description:
      "Scholarship supporting meritorious students from economically weaker sections.",
    organization: "Ministry of Education",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.SCHOLARSHIP,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://scholarships.gov.in/",
    amount: "₹12,000 per year",
    eligibility:
      "Eligible students as per NMMS guidelines.",
    benefits:
      "Annual financial assistance.",
    applicationProcess:
      "Apply through NSP.",
    deadline: new Date("2026-09-20"),
    educationLevel: EducationLevel.SCHOOL,
    featured: true,
    verified: true,
  },
];