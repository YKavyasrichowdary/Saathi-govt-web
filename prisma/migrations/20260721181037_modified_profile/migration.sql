/*
  Warnings:

  - You are about to drop the column `branch` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `college` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `currentYear` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `degree` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profileCompleted` on the `Profile` table. All the data in the column will be lost.
  - The `gender` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('SCHOOL', 'INTERMEDIATE', 'DIPLOMA', 'UNDERGRADUATE', 'POSTGRADUATE', 'DOCTORATE', 'CERTIFICATION', 'COMPETITIVE_EXAM', 'OTHER');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "branch",
DROP COLUMN "college",
DROP COLUMN "currentYear",
DROP COLUMN "degree",
DROP COLUMN "profileCompleted",
ADD COLUMN     "course" TEXT,
ADD COLUMN     "currentSemester" TEXT,
ADD COLUMN     "educationLevel" "EducationLevel",
ADD COLUMN     "graduationYear" INTEGER,
ADD COLUMN     "institutionName" TEXT,
ADD COLUMN     "isProfileCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "specialization" TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";
