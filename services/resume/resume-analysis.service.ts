import { gemini } from "@/lib/ai/gemini";
import { ResumeAnalysis } from "@/types/resume";
import { RESUME_ANALYSIS_PROMPT } from "./prompts";

class ResumeAnalysisService {
  async analyze(
    resumeText: string
  ): Promise<ResumeAnalysis> {
    try {
      const response =
        await gemini.models.generateContent({
          model: "gemini-flash-latest",

          contents: [
            {
              role: "user",

              parts: [
                {
                  text: `
${RESUME_ANALYSIS_PROMPT}

Resume:

${resumeText}
                  `,
                },
              ],
            },
          ],
        });

      const raw =
        response.text?.trim() ?? "";

      const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed =
        JSON.parse(cleaned);

      return {
        overallScore:
          parsed.overallScore ?? 0,

        atsScore:
          parsed.atsScore ?? 0,

        strengths:
          parsed.strengths ?? [],

        weaknesses:
          parsed.weaknesses ?? [],

        missingSkills:
          parsed.missingSkills ?? [],

        improvements:
          parsed.improvements ?? [],

        summary:
          parsed.summary ??
          "No summary generated.",
      };
    } catch (error) {
      console.error(
        "Resume Analysis Error:",
        error
      );

      throw new Error(
        "Failed to analyze resume."
      );
    }
  }
}

export default new ResumeAnalysisService();