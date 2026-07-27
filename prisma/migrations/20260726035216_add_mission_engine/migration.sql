/*
  Warnings:

  - You are about to drop the column `reward` on the `Mission` table. All the data in the column will be lost.
  - Added the required column `category` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Mission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MissionCategory" AS ENUM ('PROFILE', 'RESUME', 'SKILL', 'APPLICATION', 'CERTIFICATION', 'PROJECT', 'INTERVIEW', 'HACKATHON', 'OTHER');

-- AlterEnum
ALTER TYPE "MissionStatus" ADD VALUE 'SKIPPED';

-- AlterTable
ALTER TABLE "Mission" DROP COLUMN "reward",
ADD COLUMN     "category" "MissionCategory" NOT NULL,
ADD COLUMN     "rewardOpportunityMatch" INTEGER DEFAULT 0,
ADD COLUMN     "rewardProfileScore" INTEGER DEFAULT 0,
ADD COLUMN     "rewardResumeScore" INTEGER DEFAULT 0,
ADD COLUMN     "rewardXP" INTEGER DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Mission_status_idx" ON "Mission"("status");

-- CreateIndex
CREATE INDEX "Mission_category_idx" ON "Mission"("category");
