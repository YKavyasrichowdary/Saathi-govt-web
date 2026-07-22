-- CreateEnum
CREATE TYPE "OpportunityType" AS ENUM ('SCHOLARSHIP', 'HACKATHON', 'INTERNSHIP', 'JOB', 'COURSE', 'EVENT', 'COMPETITION');

-- CreateEnum
CREATE TYPE "OpportunityMode" AS ENUM ('ONLINE', 'OFFLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('OPEN', 'UPCOMING', 'CLOSED');

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "type" "OpportunityType" NOT NULL,
    "mode" "OpportunityMode" NOT NULL,
    "status" "OpportunityStatus" NOT NULL DEFAULT 'OPEN',
    "amount" TEXT,
    "location" TEXT,
    "registrationLink" TEXT NOT NULL,
    "imageUrl" TEXT,
    "deadline" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "educationLevel" "EducationLevel",
    "course" TEXT,
    "specialization" TEXT,
    "state" TEXT,
    "minCGPA" DOUBLE PRECISION,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);
