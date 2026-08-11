import {
  EducationLevel,
  OpportunityMode,
  OpportunitySource,
  OpportunityStatus,
  OpportunityType,
} from "@prisma/client";

import { SeedOpportunity } from "./types";

export const internships: SeedOpportunity[] = [
  {
    title: "Google STEP Internship 2026",
    slug: "google-step-internship-2026",
    description:
      "STEP is Google's internship program for students interested in software engineering and computer science.",
    organization: "Google",
    source: OpportunitySource.COMPANY,
    type: OpportunityType.INTERNSHIP,
    mode: OpportunityMode.HYBRID,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://careers.google.com/",
    amount: "Paid Internship",
    eligibility:
      "Undergraduate students pursuing Computer Science or related fields.",
    benefits:
      "Mentorship, networking, hands-on software engineering experience.",
    applicationProcess:
      "Apply through Google Careers.",
    deadline: new Date("2026-10-20"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    course: "Computer Science",
    featured: true,
    verified: true,
    skills: ["Data Structures", "Algorithms", "C++", "Java", "Python"],
    interests: ["Software Engineering", "Web Development"],
    careerTags: ["Software Engineer", "Backend Developer"],
  },

  {
    title: "Microsoft Explore Internship",
    slug: "microsoft-explore-internship",
    description:
      "Explore is Microsoft's internship program designed for early-career undergraduate students.",
    organization: "Microsoft",
    source: OpportunitySource.COMPANY,
    type: OpportunityType.INTERNSHIP,
    mode: OpportunityMode.HYBRID,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://careers.microsoft.com/",
    amount: "Paid Internship",
    eligibility:
      "First and second-year undergraduate students.",
    benefits:
      "Real-world engineering projects and mentorship.",
    applicationProcess:
      "Apply through Microsoft Careers.",
    deadline: new Date("2026-10-15"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    featured: true,
    verified: true,
    skills: ["Software Engineering", "C#", "TypeScript", "Problem Solving"],
    interests: ["Software Engineering", "Product Management"],
    careerTags: ["Software Engineer", "Program Manager"],
  },

  {
    title: "Amazon SDE Internship",
    slug: "amazon-sde-internship",
    description:
      "Software Development Engineer Internship at Amazon.",
    organization: "Amazon",
    source: OpportunitySource.COMPANY,
    type: OpportunityType.INTERNSHIP,
    mode: OpportunityMode.HYBRID,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://www.amazon.jobs/",
    amount: "Paid Internship",
    eligibility:
      "Students pursuing Bachelor's or Master's in Computer Science or related disciplines.",
    benefits:
      "Industry experience and mentorship.",
    applicationProcess:
      "Apply through Amazon Jobs.",
    deadline: new Date("2026-09-25"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    course: "Computer Science",
    verified: true,
    skills: ["Java", "Distributed Systems", "AWS", "Data Structures"],
    interests: ["Backend Development", "Cloud Systems"],
    careerTags: ["Software Development Engineer"],
  },

  {
    title: "ISRO Student Internship",
    slug: "isro-student-internship",
    description:
      "Research internship opportunity for engineering and science students.",
    organization: "ISRO",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.INTERNSHIP,
    mode: OpportunityMode.OFFLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://www.isro.gov.in/",
    amount: "Certificate",
    eligibility:
      "Engineering and Science students.",
    benefits:
      "Research exposure and mentorship from ISRO scientists.",
    applicationProcess:
      "Apply through the official ISRO portal.",
    deadline: new Date("2026-08-20"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    verified: true,
    skills: ["Aerospace Engineering", "Embedded Systems", "MATLAB", "Physics"],
    interests: ["Space Technology", "Research"],
    careerTags: ["Aerospace Researcher", "Embedded Systems Engineer"],
  },

  {
    title: "DRDO Research Internship",
    slug: "drdo-research-internship",
    description:
      "Internship for students interested in defence research and technology.",
    organization: "DRDO",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.INTERNSHIP,
    mode: OpportunityMode.OFFLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://www.drdo.gov.in/",
    amount: "Certificate",
    eligibility:
      "Engineering and postgraduate students.",
    benefits:
      "Hands-on defence research experience.",
    applicationProcess:
      "Apply through DRDO.",
    deadline: new Date("2026-08-10"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    verified: true,
    skills: ["Electronics", "Signal Processing", "C++", "Robotics"],
    interests: ["Defence Tech", "Robotics", "Research"],
    careerTags: ["Defence Scientist", "Electronics Engineer"],
  },

  {
    title: "TCS Digital Internship",
    slug: "tcs-digital-internship",
    description:
      "Industry internship focused on software development and digital technologies.",
    organization: "TCS",
    source: OpportunitySource.COMPANY,
    type: OpportunityType.INTERNSHIP,
    mode: OpportunityMode.HYBRID,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://www.tcs.com/careers",
    amount: "Paid Internship",
    eligibility:
      "Engineering students in their pre-final year.",
    benefits:
      "Industry mentorship and project experience.",
    applicationProcess:
      "Apply through TCS Careers.",
    deadline: new Date("2026-11-01"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    featured: true,
    verified: true,
    skills: ["Full Stack Development", "React", "Node.js", "SQL"],
    interests: ["Software Engineering", "Digital Solutions"],
    careerTags: ["Full Stack Engineer"],
  },
];