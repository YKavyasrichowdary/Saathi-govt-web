import resumeAnalysisRepository from "@/repositories/resume/resume-analysis.repository";
import activityService from "@/services/progress/activity.service";
import { ResumeAnalysis } from "@/types/resume";
import prisma from "@/lib/prisma";

class ResumeAnalysisStorageService {
  async saveAnalysis(params: {
    userId: string;
    documentId: string;
    analysis: ResumeAnalysis;
  }) {
    const latest =
      await resumeAnalysisRepository.findLatestByDocument(
        params.documentId
      );

    const version = latest ? latest.version + 1 : 1;

    const saved = await resumeAnalysisRepository.create({
      user: {
        connect: {
          id: params.userId,
        },
      },

      document: {
        connect: {
          id: params.documentId,
        },
      },

      overallScore: params.analysis.overallScore,

      atsScore: params.analysis.atsScore,

      strengths: params.analysis.strengths,

      weaknesses: params.analysis.weaknesses,

      missingSkills: params.analysis.missingSkills,

      improvements: params.analysis.improvements,

      summary: params.analysis.summary,

      version,

      aiModel: "gemini-2.5-flash",
    });

    await activityService.recordActivity(params.userId);

    return saved;
  }

  async getAnalysis(id: string) {
    const analysis =
      await resumeAnalysisRepository.findById(id);

    if (!analysis) {
      throw new Error("Resume analysis not found.");
    }

    return analysis;
  }

  async getPrimaryResumeAnalysis(userId: string) {
  const profile =
    await prisma.profile.findUnique({
      where: {
        userId,
      },
      select: {
        resumeId: true,
      },
    });

  console.log(
    "[Primary Resume Debug]",
    {
      userId,
      resumeId: profile?.resumeId,
    }
  );

  if (!profile?.resumeId) {
    return null;
  }

  const analysis =
    await resumeAnalysisRepository.findLatestByPrimaryResume(
      userId,
      profile.resumeId
    );

  console.log(
    "[Primary Resume Analysis Debug]",
    {
      resumeId: profile.resumeId,
      analysisId: analysis?.id ?? null,
      analysisDocumentId:
        analysis?.documentId ?? null,
    }
  );

  return analysis;
}

  async getHistory(userId: string) {
    return resumeAnalysisRepository.findByUser(userId);
  }

  async deleteAnalysis(id: string) {
    return resumeAnalysisRepository.delete(id);
  }
}

export default new ResumeAnalysisStorageService();