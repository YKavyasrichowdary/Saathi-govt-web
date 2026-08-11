export function buildRoadmapPrompt(context: any) {
  const targetDate = context.preparation?.targetDate || "N/A";
  const availableDays = context.preparation?.availableDays || 14;
  const dailyHours = context.preparation?.dailyHours || 2;
  const confidence = context.preparation?.confidence || "INTERMEDIATE";
  const goal = context.preparation?.goal || "COMPETITIVE";
  const preferredStudyTime = context.preparation?.preferredStudyTime || "EVENING";

  const matchScore = context.match?.matchScore ?? 0;
  const readinessScore = context.match?.readinessScore ?? 0;
  const strengths = (context.match?.strengths || []).join(", ");
  const missingSkills = (context.match?.missingSkills || []).join(", ");
  const recommendations = (context.match?.recommendations || []).join(", ");
  const matchSummary = context.match?.summary || "";

  return `
You are an expert career preparation strategist.

Create a personalized preparation roadmap for the student.

The roadmap must be based on:
1. The student's profile
2. Resume analysis
3. Opportunity requirements
4. Opportunity match analysis
5. Available preparation time

IMPORTANT PREPARATION CONSTRAINTS:

Target Date:
${targetDate}

Available Preparation Days:
${availableDays}

Daily Study Hours:
${dailyHours}

Student Confidence:
${confidence}

Goal:
${goal}

Preferred Study Time:
${preferredStudyTime}

OPPORTUNITY MATCH:

Match Score:
${matchScore}%

Readiness Score:
${readinessScore}%

Strengths:
${strengths}

Missing Skills:
${missingSkills}

Recommendations:
${recommendations}

AI Summary:
${matchSummary}

RULES:
HARD CAPACITY CONSTRAINTS:

The student has exactly:
${context.preparation.availableDays} preparation days.

The student can study:
${context.preparation.dailyHours} hours per day.

Therefore the maximum available preparation time is:
${context.preparation.availableDays * context.preparation.dailyHours * 60} minutes.

The SUM of estimatedMinutes across ALL generated tasks MUST NOT exceed this maximum.

estimatedDays MUST NOT exceed the available preparation days.

Do not generate work that cannot realistically be completed
within the available preparation time.

Distribute tasks across the available days.

The final day(s) should prioritize revision, mock practice,
assessment, interview preparation, or final review.

- The roadmap MUST fit within the available preparation days (${availableDays} days).
- Set "estimatedDays" equal to exactly ${availableDays}.
- Do not create tasks beyond the target date.
- Prioritize missing skills from the opportunity match.
- Use the student's strengths where they provide leverage.
- Allocate more time to important missing skills.
- The final preparation period should include revision, practice, mock assessment, or interview preparation.
- Respect the student's daily study-hour limit (${dailyHours} hours/day).
- CRITICAL: No single task's "estimatedMinutes" can exceed ${dailyHours * 60} minutes (which is the daily capacity of ${dailyHours} hours). Break larger topics into multiple smaller tasks of max ${dailyHours * 60} minutes.
- Do not invent additional preparation days.
- Return ONLY valid JSON.

Student Context:
${JSON.stringify(context, null, 2)}

Output Schema:
{
  "title": "",
  "description": "",
  "estimatedDays": ${availableDays},
  "readinessScore": 0,
  "targetScore": 0,
  "summary": "",
  "milestones": [
    {
      "title": "",
      "description": "",
      "tasks": [
        {
          "title": "",
          "description": "",
          "estimatedMinutes": 0,
          "rewardXP": 20
        }
      ]
    }
  ]
}
  
`;
}