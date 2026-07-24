/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Opportunity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Opportunity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OpportunitySource" AS ENUM ('GOVERNMENT', 'PRIVATE', 'UNIVERSITY', 'COMPANY', 'NGO');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OpportunityStatus" ADD VALUE 'DRAFT';
ALTER TYPE "OpportunityStatus" ADD VALUE 'EXPIRED';

-- AlterEnum
ALTER TYPE "OpportunityType" ADD VALUE 'FELLOWSHIP';

-- AlterTable
ALTER TABLE "Opportunity" ADD COLUMN     "applicationProcess" TEXT,
ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "eligibility" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "source" "OpportunitySource" NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "SavedOpportunity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedOpportunity_userId_idx" ON "SavedOpportunity"("userId");

-- CreateIndex
CREATE INDEX "SavedOpportunity_opportunityId_idx" ON "SavedOpportunity"("opportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedOpportunity_userId_opportunityId_key" ON "SavedOpportunity"("userId", "opportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "Opportunity_slug_key" ON "Opportunity"("slug");

-- AddForeignKey
ALTER TABLE "SavedOpportunity" ADD CONSTRAINT "SavedOpportunity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedOpportunity" ADD CONSTRAINT "SavedOpportunity_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
