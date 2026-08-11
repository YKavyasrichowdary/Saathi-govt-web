import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { allOpportunities } from "./data/opportunities";
import {
  EducationLevel,
  Gender,
  OpportunitySource,
  OpportunityType,
  SkillLevel,
  MissionCategory,
  MissionPriority,
  MissionStatus,
  MilestoneStatus,
  TaskStatus,
  RoadmapStatus,
  DocumentType,
  NotificationType,
  ApplicationStatus,
} from "@prisma/client";

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Clean existing records in appropriate order
  console.log("🧹 Clearing old data...");
  await prisma.opportunityMatch.deleteMany();
  await prisma.roadmapTask.deleteMany();
  await prisma.roadmapMilestone.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.userXP.deleteMany();
  await prisma.resumeAnalysis.deleteMany();
  await prisma.document.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.application.deleteMany();
  await prisma.savedOpportunity.deleteMany();
  await prisma.careerGoal.deleteMany();
  await prisma.interest.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.opportunity.deleteMany();

  // 2. Seed Opportunities
  console.log(`📦 Creating ${allOpportunities.length} opportunities...`);
  await prisma.opportunity.createMany({
    data: allOpportunities,
  });

  // Fetch created opportunities for referencing
  const createdOps = await prisma.opportunity.findMany();
  const opMap = new Map<string, (typeof createdOps)[number]>(
    createdOps.map((op: any) => [op.slug, op])
  );

  // 3. Hash common password for demo users
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 4. Create Demo User 1: Aarav Sharma (student@saathi.com)
  console.log("👤 Creating demo users...");
  const user1 = await prisma.user.create({
    data: {
      name: "Aarav Sharma",
      email: "student@saathi.com",
      password: hashedPassword,
      emailVerified: new Date(),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav",
      profile: {
        create: {
          phone: "+91 9876543210",
          gender: Gender.MALE,
          dateOfBirth: new Date("2003-05-14"),
          city: "New Delhi",
          state: "Delhi",
          country: "India",
          bio: "Passionate Full Stack Software Engineer & Open Source Contributor.",
          educationLevel: EducationLevel.UNDERGRADUATE,
          institutionName: "Indian Institute of Technology, Delhi",
          university: "IIT Delhi",
          course: "Computer Science & Engineering",
          specialization: "Software Engineering",
          currentSemester: "6th Semester",
          graduationYear: 2026,
          cgpa: 8.8,
          linkedinUrl: "https://linkedin.com/in/aaravsharma-dev",
          githubUrl: "https://github.com/aarav-sharma",
          portfolioUrl: "https://aaravsharma.dev",
          isProfileCompleted: true,
          skills: {
            create: [
              { name: "React", level: SkillLevel.ADVANCED },
              { name: "TypeScript", level: SkillLevel.INTERMEDIATE },
              { name: "Node.js", level: SkillLevel.INTERMEDIATE },
              { name: "Python", level: SkillLevel.BEGINNER },
              { name: "Data Structures", level: SkillLevel.ADVANCED },
            ],
          },
          interests: {
            create: [
              { name: "Web Development" },
              { name: "Artificial Intelligence" },
              { name: "Hackathons" },
            ],
          },
          careerGoals: {
            create: [
              { title: "Full Stack Developer" },
              { title: "Software Engineer" },
            ],
          },
        },
      },
      xp: {
        create: {
          totalXP: 450,
          level: 3,
          currentStreak: 5,
          longestStreak: 7,
          missionsCompleted: 12,
        },
      },
    },
  });

  // Demo User 2: Rahul Verma (rahul@saathi.com)
  const user2 = await prisma.user.create({
    data: {
      name: "Rahul Verma",
      email: "rahul@saathi.com",
      password: hashedPassword,
      emailVerified: new Date(),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      profile: {
        create: {
          phone: "+91 9812345678",
          gender: Gender.MALE,
          dateOfBirth: new Date("2002-11-20"),
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          bio: "Aspiring Data Scientist with a passion for Machine Learning and AI.",
          educationLevel: EducationLevel.UNDERGRADUATE,
          institutionName: "National Institute of Technology Surathkal",
          university: "NITK",
          course: "Information Technology",
          specialization: "Data Science",
          currentSemester: "8th Semester",
          graduationYear: 2026,
          cgpa: 8.2,
          linkedinUrl: "https://linkedin.com/in/rahulverma-ds",
          githubUrl: "https://github.com/rahulverma",
          isProfileCompleted: true,
          skills: {
            create: [
              { name: "Python", level: SkillLevel.ADVANCED },
              { name: "Machine Learning", level: SkillLevel.INTERMEDIATE },
              { name: "SQL", level: SkillLevel.INTERMEDIATE },
            ],
          },
          interests: {
            create: [
              { name: "Data Science" },
              { name: "Machine Learning" },
            ],
          },
          careerGoals: {
            create: [
              { title: "Data Scientist" },
              { title: "AI Engineer" },
            ],
          },
        },
      },
      xp: {
        create: {
          totalXP: 280,
          level: 2,
          currentStreak: 3,
          longestStreak: 4,
          missionsCompleted: 6,
        },
      },
    },
  });

  // Demo User 3: Priya Patel (priya@saathi.com)
  const user3 = await prisma.user.create({
    data: {
      name: "Priya Patel",
      email: "priya@saathi.com",
      password: hashedPassword,
      emailVerified: new Date(),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      profile: {
        create: {
          phone: "+91 9765432109",
          gender: Gender.FEMALE,
          dateOfBirth: new Date("2004-03-15"),
          city: "Pilani",
          state: "Rajasthan",
          country: "India",
          bio: "Robotics and Embedded Systems Enthusiast.",
          educationLevel: EducationLevel.UNDERGRADUATE,
          institutionName: "BITS Pilani",
          university: "BITS Pilani",
          course: "Electronics & Communication",
          specialization: "Embedded Systems",
          currentSemester: "4th Semester",
          graduationYear: 2027,
          cgpa: 9.1,
          linkedinUrl: "https://linkedin.com/in/priyapatel-ece",
          githubUrl: "https://github.com/priyapatel",
          isProfileCompleted: true,
          skills: {
            create: [
              { name: "C++", level: SkillLevel.ADVANCED },
              { name: "Embedded Systems", level: SkillLevel.INTERMEDIATE },
              { name: "Python", level: SkillLevel.BEGINNER },
            ],
          },
          interests: {
            create: [
              { name: "Robotics" },
              { name: "Space Technology" },
              { name: "Research" },
            ],
          },
          careerGoals: {
            create: [
              { title: "Embedded Systems Engineer" },
              { title: "Research Scientist" },
            ],
          },
        },
      },
      xp: {
        create: {
          totalXP: 150,
          level: 1,
          currentStreak: 2,
          longestStreak: 2,
          missionsCompleted: 3,
        },
      },
    },
  });

  // 5. Seed Documents & Resume Analysis for User 1
  console.log("📄 Creating demo documents & resume analysis...");
  const doc = await prisma.document.create({
    data: {
      userId: user1.id,
      title: "Software Engineer Resume 2026",
      type: DocumentType.RESUME,
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileName: "Aarav_Sharma_Resume.pdf",
      fileSize: 245000,
      mimeType: "application/pdf",
      verified: true,
      resumeAnalyses: {
        create: {
          userId: user1.id,
          overallScore: 84,
          atsScore: 88,
          strengths: [
            "Clear technical skill hierarchy and modern tech stack",
            "Well-structured project descriptions with bullet points",
            "Strong academic record at top tier institution",
          ],
          weaknesses: [
            "Metrics and quantifiable achievements could be stronger",
            "Lacks specific cloud deployment details",
          ],
          missingSkills: ["Docker", "AWS", "GraphQL", "CI/CD Pipeline"],
          improvements: [
            "Quantify project outcomes (e.g. 'Improved speed by 40%')",
            "Add Docker & Cloud experience to boost ATS match rate",
          ],
          summary: "Outstanding undergraduate candidate with solid technical grounding for top-tier software engineering internships.",
          aiModel: "gemini-2.5-flash",
          version: 1,
        },
      },
    },
  });

  // Update profile with resumeId
  await prisma.profile.update({
    where: { userId: user1.id },
    data: { resumeId: doc.id },
  });

  // 6. Seed Saved Opportunities & Applications for User 1
  console.log("📌 Saving opportunities & submitting applications...");
  const stepOp = opMap.get("google-step-internship-2026");
  const sihOp = opMap.get("smart-india-hackathon-2026");
  const pragatiOp = opMap.get("aicte-pragati-scholarship-2026");
  const infosysOp = opMap.get("infosys-specialist-programmer-2026");

  if (stepOp) {
    await prisma.savedOpportunity.create({
      data: { userId: user1.id, opportunityId: stepOp.id },
    });
    await prisma.application.create({
      data: {
        userId: user1.id,
        opportunityId: stepOp.id,
        status: ApplicationStatus.SUBMITTED,
      },
    });

    // Opportunity Match for User 1
    await prisma.opportunityMatch.create({
      data: {
        userId: user1.id,
        opportunityId: stepOp.id,
        matchScore: 92,
        readinessScore: 85,
        strengths: [
          "Strong proficiency in Data Structures & Algorithms",
          "High academic CGPA (8.8/10)",
          "Matches course requirements (Computer Science)",
        ],
        missingSkills: ["System Architecture", "Advanced C++"],
        recommendations: [
          "Practice timed LeetCode medium/hard DSA questions",
          "Review Big-O time and space complexity trade-offs",
        ],
        summary: "High probability match for Google STEP Internship. Focus on core problem-solving speed.",
        generatedBy: "gemini-2.5-flash",
      },
    });
  }

  if (sihOp) {
    await prisma.savedOpportunity.create({
      data: { userId: user1.id, opportunityId: sihOp.id },
    });
    await prisma.application.create({
      data: {
        userId: user1.id,
        opportunityId: sihOp.id,
        status: ApplicationStatus.UNDER_REVIEW,
      },
    });
  }

  if (infosysOp) {
    await prisma.savedOpportunity.create({
      data: { userId: user1.id, opportunityId: infosysOp.id },
    });
  }

  // 7. Seed Missions for User 1
  console.log("🎯 Creating missions...");
  await prisma.mission.createMany({
    data: [
      {
        userId: user1.id,
        title: "Complete Profile & Social Links",
        description: "Add GitHub, LinkedIn, and bio to increase candidate visibility.",
        category: MissionCategory.PROFILE,
        priority: MissionPriority.HIGH,
        status: MissionStatus.COMPLETED,
        estimatedMinutes: 10,
        rewardProfileScore: 20,
        rewardXP: 50,
        completedAt: new Date(),
      },
      {
        userId: user1.id,
        title: "Upload & Analyze Resume",
        description: "Get detailed ATS feedback and score breakdown on your latest CV.",
        category: MissionCategory.RESUME,
        priority: MissionPriority.HIGH,
        status: MissionStatus.COMPLETED,
        estimatedMinutes: 15,
        rewardResumeScore: 25,
        rewardXP: 50,
        completedAt: new Date(),
      },
      {
        userId: user1.id,
        title: "Apply to Google STEP Internship 2026",
        description: "Submit official application form and log status on Saathi portal.",
        category: MissionCategory.APPLICATION,
        priority: MissionPriority.HIGH,
        status: MissionStatus.IN_PROGRESS,
        estimatedMinutes: 30,
        rewardOpportunityMatch: 15,
        rewardXP: 100,
      },
      {
        userId: user1.id,
        title: "Master Binary Trees & Graphs",
        description: "Solve 5 Tree/Graph problems on LeetCode to boost problem-solving readiness.",
        category: MissionCategory.SKILL,
        priority: MissionPriority.MEDIUM,
        status: MissionStatus.PENDING,
        estimatedMinutes: 45,
        rewardXP: 80,
      },
    ],
  });

  // 8. Seed Roadmap for User 1
  console.log("🗺️ Creating career roadmap...");
  const roadmap = await prisma.roadmap.create({
    data: {
      userId: user1.id,
      opportunityId: stepOp?.id,
      title: "Google STEP 2026 Preparation Roadmap",
      description: "Customized 4-week structured preparation plan for software engineering internships.",
      readinessScore: 85,
      targetScore: 95,
      progress: 40,
      targetDate: new Date("2026-10-15"),
      estimatedDays: 28,
      dailyHours: 2.5,
      status: RoadmapStatus.ACTIVE,
      aiSummary: "Focus on Data Structures, Object-Oriented Design, and timed coding sessions over the next month.",
      generatedBy: "gemini-2.5-flash",
      milestones: {
        create: [
          {
            title: "Data Structures & Algorithm Foundations",
            description: "Arrays, Linked Lists, Trees, Graphs, Dynamic Programming",
            order: 1,
            status: MilestoneStatus.IN_PROGRESS,
            tasks: {
              create: [
                {
                  title: "Solve 10 LeetCode Medium Array & String problems",
                  description: "Focus on Two-Pointer & Sliding Window techniques.",
                  estimatedMinutes: 120,
                  status: TaskStatus.COMPLETED,
                  completedAt: new Date(),
                  dayNumber: 1,
                  order: 1,
                  rewardXP: 30,
                },
                {
                  title: "Practice Binary Tree Traversals & BFS/DFS",
                  description: "Inorder, Preorder, Postorder, and Level Order Traversal.",
                  estimatedMinutes: 90,
                  status: TaskStatus.IN_PROGRESS,
                  dayNumber: 3,
                  order: 2,
                  rewardXP: 40,
                },
              ],
            },
          },
          {
            title: "Object-Oriented Design & System Basics",
            description: "Classes, SOLID principles, basic system components",
            order: 2,
            status: MilestoneStatus.PENDING,
            tasks: {
              create: [
                {
                  title: "Study SOLID Principles & Design Patterns",
                  description: "Singleton, Factory, and Strategy patterns in Java/TypeScript.",
                  estimatedMinutes: 60,
                  status: TaskStatus.PENDING,
                  dayNumber: 10,
                  order: 1,
                  rewardXP: 30,
                },
              ],
            },
          },
          {
            title: "Mock Technical & Behavioral Interviews",
            description: "STAR method preparation and live coding practice",
            order: 3,
            status: MilestoneStatus.PENDING,
            tasks: {
              create: [
                {
                  title: "Conduct 1 peer mock interview using STAR framework",
                  description: "Prepare stories for leadership, challenges, and teamwork.",
                  estimatedMinutes: 60,
                  status: TaskStatus.PENDING,
                  dayNumber: 20,
                  order: 1,
                  rewardXP: 50,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // 9. Seed Notifications for User 1
  console.log("🔔 Creating notifications...");
  await prisma.notification.createMany({
    data: [
      {
        userId: user1.id,
        title: "Welcome to Saathi!",
        message: "Your profile is verified. Discover top scholarships, internships, and AI roadmaps.",
        type: NotificationType.INFO,
        isRead: true,
      },
      {
        userId: user1.id,
        title: "Application Received",
        message: "Your application for Google STEP Internship 2026 was logged successfully.",
        type: NotificationType.SUCCESS,
        isRead: true,
      },
      {
        userId: user1.id,
        title: "Deadline Approaching",
        message: "Smart India Hackathon 2026 registration deadline is in 2 months. Complete your team submission!",
        type: NotificationType.WARNING,
        isRead: false,
      },
    ],
  });

  console.log("✨ Seeding completed successfully!");
  console.log("-----------------------------------------");
  console.log("Demo Credentials:");
  console.log("📧 student@saathi.com  🔑 password123");
  console.log("📧 rahul@saathi.com    🔑 password123");
  console.log("📧 priya@saathi.com    🔑 password123");
  console.log("-----------------------------------------");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });