-- AlterTable
ALTER TABLE "ResumeAnalysis" ADD COLUMN     "aiModel" TEXT NOT NULL DEFAULT 'gemini-2.5-flash',
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "ResumeAnalysis_userId_idx" ON "ResumeAnalysis"("userId");

-- CreateIndex
CREATE INDEX "ResumeAnalysis_documentId_idx" ON "ResumeAnalysis"("documentId");

-- CreateIndex
CREATE INDEX "ResumeAnalysis_createdAt_idx" ON "ResumeAnalysis"("createdAt");
