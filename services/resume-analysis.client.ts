import {
  ResumeAnalysisResponse,
} from "@/types/resume";

class ResumeAnalysisClient {
  async getAnalysis(
    analysisId: string
  ) {
    const response = await fetch(
      `/api/resume-analysis/${analysisId}`
    );

    const data: ResumeAnalysisResponse =
      await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ??
          "Unable to load resume analysis."
      );
    }

    return data.analysis!;
  }

  async analyzeDocument(
    documentId: string
  ) {
    const response = await fetch(
      `/api/documents/${documentId}/analyze`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ??
          "Unable to analyze resume."
      );
    }

    return data.analysisId as string;
  }
}

export default new ResumeAnalysisClient();