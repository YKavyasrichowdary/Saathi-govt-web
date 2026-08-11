import {
  EducationLevel,
  OpportunityMode,
  OpportunitySource,
  OpportunityStatus,
  OpportunityType,
} from "@prisma/client";

import { SeedOpportunity } from "./types";

export const jobs: SeedOpportunity[] = [
  {
    title: "TCS Digital Graduate Trainee 2026",
    slug: "tcs-digital-graduate-trainee-2026",
    description:
      "Entry-level software engineering and digital transformation roles for fresh engineering graduates.",
    organization: "Tata Consultancy Services",
    source: OpportunitySource.COMPANY,
    type: OpportunityType.JOB,
    mode: OpportunityMode.OFFLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://onboarding.tcs.com/",
    amount: "₹7.0 - ₹9.0 LPA",
    eligibility:
      "Final year B.Tech/M.Tech students with minimum 65% aggregate.",
    benefits:
      "Full-time job placement, continuous learning programs, global client exposure.",
    applicationProcess:
      "Register via TCS NextStep portal and complete National Qualifier Test (NQT).",
    deadline: new Date("2026-11-15"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    minCGPA: 6.5,
    featured: true,
    verified: true,
    skills: ["Java", "Python", "SQL", "Cloud Computing", "Web Technologies"],
    interests: ["Software Engineering", "Enterprise Software", "Cloud"],
    careerTags: ["Software Engineer", "Systems Engineer", "Cloud Engineer"],
  },

  {
    title: "Infosys Specialist Programmer (SP)",
    slug: "infosys-specialist-programmer-2026",
    description:
      "High-impact technical developer role focusing on complex algorithm design, cloud systems, and modern full-stack development.",
    organization: "Infosys",
    source: OpportunitySource.COMPANY,
    type: OpportunityType.JOB,
    mode: OpportunityMode.HYBRID,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://career.infosys.com/",
    amount: "₹9.5 LPA",
    eligibility:
      "Graduating engineering students (B.E/B.Tech/M.E/M.Tech/MCA).",
    benefits:
      "Advanced training at Mysuru Campus, fast-track career growth.",
    applicationProcess:
      "Apply through Infosys HackWithInfy or Campus Recruitment drive.",
    deadline: new Date("2026-10-15"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    minCGPA: 7.0,
    featured: true,
    verified: true,
    skills: ["Data Structures", "Algorithms", "React", "Node.js", "Java", "Python"],
    interests: ["Full Stack Development", "Competitive Coding"],
    careerTags: ["Full Stack Developer", "Software Development Engineer"],
  },
];

export const courses: SeedOpportunity[] = [
  {
    title: "AWS Academy Cloud Foundations",
    slug: "aws-academy-cloud-foundations",
    description:
      "Official cloud computing course introducing AWS core services, security, architecture, and pricing.",
    organization: "Amazon Web Services",
    source: OpportunitySource.COMPANY,
    type: OpportunityType.COURSE,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://aws.amazon.com/training/",
    amount: "Free with Certification Discount",
    eligibility:
      "Open to all students interested in Cloud Computing.",
    benefits:
      "Hands-on lab access, AWS Certified Cloud Practitioner voucher discount.",
    applicationProcess:
      "Enroll online through AWS Educate or partner institution portal.",
    deadline: new Date("2026-12-31"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    featured: true,
    verified: true,
    skills: ["AWS", "Cloud Computing", "DevOps", "Linux", "Networking"],
    interests: ["Cloud Computing", "DevOps", "Infrastructure"],
    careerTags: ["Cloud Architect", "DevOps Engineer"],
  },

  {
    title: "NPTEL Deep Learning & Artificial Intelligence",
    slug: "nptel-deep-learning-ai",
    description:
      "12-week comprehensive government certification course offered by IIT Madras on deep neural networks and machine learning.",
    organization: "IIT Madras & NPTEL",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.COURSE,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://nptel.ac.in/",
    amount: "Free Course (₹1,000 for Proctored Exam)",
    eligibility:
      "College students with basic linear algebra and Python knowledge.",
    benefits:
      "Government-recognized certificate signed by IIT faculty.",
    applicationProcess:
      "Enroll on Swayam/NPTEL portal.",
    deadline: new Date("2026-09-01"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    featured: true,
    verified: true,
    skills: ["Python", "PyTorch", "TensorFlow", "Deep Learning", "Machine Learning"],
    interests: ["Artificial Intelligence", "Data Science", "Machine Learning"],
    careerTags: ["AI Engineer", "Data Scientist", "Machine Learning Engineer"],
  },
];

export const fellowships: SeedOpportunity[] = [
  {
    title: "Prime Minister's Research Fellowship (PMRF) 2026",
    slug: "pmrf-fellowship-2026",
    description:
      "Prestigious national fellowship scheme for carrying out doctoral research at premier academic institutions in India.",
    organization: "Ministry of Education",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.FELLOWSHIP,
    mode: OpportunityMode.OFFLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://may2024.pmrf.in/",
    amount: "₹70,000 - ₹80,000 per month + Research Grant",
    eligibility:
      "B.Tech/M.Tech graduates from IISc, IITs, NITs, IISERs with high CGPA.",
    benefits:
      "Full funding for Ph.D., annual research grant of ₹2 Lakhs, international conference travel support.",
    applicationProcess:
      "Direct entry or lateral entry application submitted through PMRF portal.",
    deadline: new Date("2026-10-30"),
    educationLevel: EducationLevel.POSTGRADUATE,
    minCGPA: 8.0,
    featured: true,
    verified: true,
    skills: ["Research Methods", "Algorithm Design", "Technical Writing", "Data Analysis"],
    interests: ["Research", "Higher Studies", "Academia"],
    careerTags: ["Research Scientist", "Academician"],
  },
];
