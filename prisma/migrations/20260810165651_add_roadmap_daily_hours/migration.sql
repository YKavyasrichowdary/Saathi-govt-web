/*
  Warnings:

  - Added the required column `dailyHours` to the `Roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roadmap" ADD COLUMN     "dailyHours" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "targetDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "RoadmapTask" ADD COLUMN     "dayNumber" INTEGER NOT NULL DEFAULT 1;
