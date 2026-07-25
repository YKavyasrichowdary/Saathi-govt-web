import { gemini } from "@/lib/ai/gemini";
import { buildAIContext } from "@/lib/ai/context-builder";
import { buildPrompt } from "@/lib/ai/prompts";

class AIService {
  async chat(
    userId: string,
    message: string
  ) {
    const context = await buildAIContext(userId);

    const prompt = buildPrompt(
      context,
      message
    );

    const response = await gemini.models.generateContent({
      model: "gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    });

    return response.text ?? "";
  }
}

export default new AIService();