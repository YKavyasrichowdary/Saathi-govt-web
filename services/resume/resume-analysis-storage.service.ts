import resumeAnalysisRepository from "@/repositories/resume/resume-analysis.repository";
import { ResumeAnalysis } from "@/types/resume";

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

    return resumeAnalysisRepository.create({
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
  }

  async getAnalysis(id: string) {
    const analysis =
      await resumeAnalysisRepository.findById(id);

    if (!analysis) {
      throw new Error("Resume analysis not found.");
    }

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