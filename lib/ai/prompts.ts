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
        `${d.title ?? d.fileName ?? "Document"} (${d.verified ? "Verified" : "Pending"})`
    )
    .join("\n");
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

Always answer using the student's actual information.
Never invent profile details or opportunities.
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

Unread Notifications

${summarizeNotifications(context.notifications)}

====================

Student Question:

${message}
`;
}