import PDFParser from "pdf2json";

class ResumeParserService {
  async extractText(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const parser = new PDFParser();

      parser.on("pdfParser_dataError", (errorData) => {
        const errorMessage =
          "parserError" in errorData
            ? errorData.parserError instanceof Error
              ? errorData.parserError.message
              : String(errorData.parserError)
            : errorData instanceof Error
            ? errorData.message
            : "Failed to parse PDF.";

        reject(new Error(errorMessage));
      });

      parser.on("pdfParser_dataReady", (pdfData) => {
        try {
          let text = "";

          for (const page of pdfData.Pages) {
            for (const item of page.Texts) {
              for (const run of item.R) {
                text += decodeURIComponent(run.T) + " ";
              }
            }

            text += "\n";
          }

          text = text.trim();

          if (!text) {
            reject(
              new Error(
                "Unable to extract text from resume."
              )
            );

            return;
          }

          resolve(text.slice(0, 15000));
        } catch (error) {
          reject(error);
        }
      });

      parser.parseBuffer(buffer);
    });
  }
}

export default new ResumeParserService();