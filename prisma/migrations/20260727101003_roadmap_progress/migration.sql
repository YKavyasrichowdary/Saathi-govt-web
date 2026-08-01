/*
  Warnings:

  - A unique constraint covering the columns `[roadmapTaskId]` on the table `Mission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Mission" ADD COLUMN     "roadmapTaskId" TEXT;

-- AlterTable
ALTER TABLE "Roadmap" ADD COLUMN     "generatedBy" TEXT NOT NULL DEFAULT 'gemini-2.5-flash';

-- AlterTable
ALTER TABLE "RoadmapMilestone" ADD COLUMN     "status" "MilestoneStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "RoadmapTask" ADD COLUMN     "completedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Mission_roadmapTaskId_key" ON "Mission"("roadmapTaskId");

-- CreateIndex
CREATE INDEX "Mission_roadmapTaskId_idx" ON "Mission"("roadmapTaskId");

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_roadmapTaskId_fkey" FOREIGN KEY ("roadmapTaskId") REFERENCES "RoadmapTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;
