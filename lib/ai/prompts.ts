import { AIContext } from "./types";

function summarizeProfile(profile: any) {
  if (!profile) return "Profile not completed.";

  const name = profile.fullName ?? profile.user?.name ?? profile.name ?? "Not provided";
  const careerGoal =
    (profile.careerGoal ?? profile.careerGoals?.map((g: any) => g.title).join(", ")) ||
    "Not provided";
  const college = profile.institutionName ?? profile.university ?? profile.college ?? "Not provided";

  return `
Name: ${name}
Career Goal: ${careerGoal}
College: ${college}
CGPA: ${profile.cgpa ?? "Not provided"}
Skills: ${
    profile.skills?.map((s: any) => (typeof s === "string" ? s : s.name)).join(", ") || "None"
  }
`;
}

function summarizeRecommendations(recommendations: any[]) {
  if (!recommendations || !recommendations.length)
    return "No recommendations available.";

  return recommendations
    .slice(0, 5)
    .map(
      (r, index) =>
        `${index + 1}. ${r.opportunity?.title ?? r.title ?? "Opportunity"} (${r.matchScore ?? 0}% match)`
    )
    .join("\n");
}

function summarizeApplications(applications: any[]) {
  if (!applications || !applications.length)
    return "No applications submitted.";

  return applications
    .map(
      (a) =>
        `${a.opportunity?.title ?? a.title ?? "Opportunity"} (${a.status ?? "Submitted"})`
    )
    .join("\n");
}

function summarizeSaved(saved: any[]) {
  if (!saved || !saved.length)
    return "No saved opportunities.";

  return saved
    .map((s) => s.opportunity?.title ?? s.title ?? "Saved Opportunity")
    .join("\n");
}

function summarizeDocuments(documents: any[]) {
  if (!documents || !documents.length)
    return "No uploaded documents.";

  return documents
    .map(
      (d) =>
        `${d.title ?? d.fileName ?? "Document"}`
    )
    .join("\n");
}

function summarizePrimaryResumeAnalysis(
  analysis: any
) {
  if (!analysis) {
    return "No primary resume has been selected or analyzed yet.";
  }

  const toStringArray = (
    value: unknown
  ): string[] => {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter(
      (item): item is string =>
        typeof item === "string"
    );
  };

  const strengths =
    toStringArray(analysis.strengths);

  const weaknesses =
    toStringArray(analysis.weaknesses);

  const missingSkills =
    toStringArray(
      analysis.missingSkills
    );

  const improvements =
    toStringArray(analysis.improvements);

  return `
Overall Resume Score: ${analysis.overallScore ?? "Not available"}
ATS Score: ${analysis.atsScore ?? "Not available"}

Strengths:
${strengths.length ? strengths.map((s) => `- ${s}`).join("\n") : "None identified"}

Weaknesses:
${weaknesses.length ? weaknesses.map((w) => `- ${w}`).join("\n") : "None identified"}

Missing Skills:
${missingSkills.length ? missingSkills.map((s) => `- ${s}`).join("\n") : "None identified"}

Suggested Improvements:
${improvements.length ? improvements.map((i) => `- ${i}`).join("\n") : "None identified"}

Summary:
${analysis.summary ?? "No summary available."}
`.trim();
}

function summarizeNotifications(notifications: any[]) {
  if (!notifications || !notifications.length)
    return "No unread notifications.";

  const unread = notifications.filter((n) => !n.isRead);

  if (!unread.length)
    return "No unread notifications.";

  return unread
    .map((n) => `${n.title}: ${n.message}`)
    .join("\n");
}

export function buildPrompt(
  context: any,
  message: string
) {
  return `
  Response Formatting Rules

• Use Markdown.
• Use headings for major sections.
• Use bullet points for recommendations.
• Use numbered lists for steps.
• Bold important information.
• Never return JSON.
• Keep responses concise and actionable.
You are Saathi, an AI Career Companion for Indian college students.

You are Saathi, an AI Career Companion for Indian college students.

Always answer using the student's actual information.

Never invent profile details, resume details, resume content, or opportunities.

The Documents section contains files the student has uploaded.

An uploaded document is NOT automatically "verified".
Do not use the concept of resume verification unless the application explicitly provides a verification status.

The Primary Resume Analysis section represents the AI analysis of the student's currently selected primary resume.

If Primary Resume Analysis is available:
- Treat it as the authoritative source for the analyzed resume.
- You may discuss its strengths, weaknesses, missing skills, ATS score, improvements, and summary.
- Do not say the resume is "not verified".
- Do not claim that the resume is verified either.
- If asked about the resume itself, distinguish between what is present in the uploaded document metadata and what is known from its AI analysis.

If Primary Resume Analysis is unavailable:
- Clearly say that no analyzed primary resume is currently available.
- Do not assume that an uploaded resume has been analyzed.

Never invent information that is not present in the provided context.

If information is unavailable, clearly say so.

====================

Student Profile

${summarizeProfile(context.profile)}

====================

Recommendations

${summarizeRecommendations(context.recommendations)}

====================

Applications

${summarizeApplications(context.applications)}

====================

Saved Opportunities

${summarizeSaved(context.saved)}

====================
Documents
${summarizeDocuments(context.documents)}
====================

Primary Resume Analysis
${summarizePrimaryResumeAnalysis(
  context.primaryResumeAnalysis
)}
====================

Unread Notifications

${summarizeNotifications(context.notifications)}

====================

Student Question:

${message}
`;
}