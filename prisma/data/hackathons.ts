import {
  EducationLevel,
  OpportunityMode,
  OpportunitySource,
  OpportunityStatus,
  OpportunityType,
} from "@prisma/client";

import { SeedOpportunity } from "./types";

export const hackathons: SeedOpportunity[] = [
  {
    title: "Smart India Hackathon 2026",
    slug: "smart-india-hackathon-2026",
    description:
      "A nationwide initiative to provide students with a platform to solve pressing problems of government ministries, departments, and industries.",
    organization: "Ministry of Education & AICTE",
    source: OpportunitySource.GOVERNMENT,
    type: OpportunityType.HACKATHON,
    mode: OpportunityMode.HYBRID,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://sih.gov.in/",
    amount: "Prize pool ₹1,00,000 per problem statement",
    eligibility:
      "Undergraduate and postgraduate students of engineering and technology institutions.",
    benefits:
      "National recognition, cash prizes, networking with top tech organizations and government bodies.",
    applicationProcess:
      "Register teams through institutional SPOC on the SIH portal.",
    deadline: new Date("2026-10-31"),
    startDate: new Date("2026-11-15"),
    endDate: new Date("2026-11-17"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    featured: true,
    verified: true,
    skills: ["React", "Node.js", "Python", "Mobile Development", "AI/ML"],
    interests: ["Hackathons", "Problem Solving", "Software Development"],
    careerTags: ["Full Stack Developer", "Software Engineer", "AI Developer"],
  },

  {
    title: "Google Girl Hackathon 2026",
    slug: "google-girl-hackathon-2026",
    description:
      "A program for women in computer science and related tech fields to display their coding skills and creativity.",
    organization: "Google",
    source: OpportunitySource.COMPANY,
    type: OpportunityType.HACKATHON,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://buildyourfuture.withgoogle.com/events/girl-hackathon",
    amount: "Internship opportunities & Google Tech Goodies",
    eligibility:
      "Female students graduating in 2026, 2027, or 2028 pursuing B.Tech/B.E, M.Tech, or Dual Degrees.",
    benefits:
      "Fast-track interview opportunities for Google software engineering internships and full-time roles.",
    applicationProcess:
      "Individual registration via Google Careers portal.",
    deadline: new Date("2026-09-15"),
    startDate: new Date("2026-09-20"),
    endDate: new Date("2026-10-10"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    course: "Computer Science",
    featured: true,
    verified: true,
    skills: ["Data Structures", "Algorithms", "System Design", "C++", "Java", "Python"],
    interests: ["Coding Challenges", "Competitive Programming", "Web Development"],
    careerTags: ["Software Engineer", "Backend Developer"],
  },

  {
    title: "Flipkart GRiD 6.0 Software Development Track",
    slug: "flipkart-grid-6-software-development",
    description:
      "Flipkart's flagship engineering campus challenge for students across premier engineering colleges in India.",
    organization: "Flipkart",
    source: OpportunitySource.COMPANY,
    type: OpportunityType.HACKATHON,
    mode: OpportunityMode.ONLINE,
    status: OpportunityStatus.OPEN,
    registrationLink: "https://unstop.com/hackathons/flipkart-grid-60",
    amount: "Prizes worth ₹5,00,000 + SDE Interviews",
    eligibility:
      "B.Tech/B.E/M.Tech students across all engineering branches.",
    benefits:
      "High paying tech job/internship offers at Flipkart and cash awards.",
    applicationProcess:
      "Register team of 1-3 members on Unstop platform.",
    deadline: new Date("2026-08-30"),
    educationLevel: EducationLevel.UNDERGRADUATE,
    featured: true,
    verified: true,
    skills: ["E-Commerce Tech", "Scalable Systems", "React", "Node.js", "Java"],
    interests: ["Web Development", "System Architecture", "Hackathons"],
    careerTags: ["Software Engineer", "Full Stack Developer"],
  },
];
