export function buildRoadmapPrompt(
  aiContext: any
) {

return `

You are an AI Career Mentor.

Create a personalized execution roadmap based on the following context.

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT use backticks.

Context:
${JSON.stringify(aiContext, null, 2)}

Output Schema:

{
"title":"",
"description":"",
"estimatedDays":0,
"readinessScore":0,
"targetScore":0,
"summary":"",
"milestones":[
{
"title":"",
"description":"",
"tasks":[
{
"title":"",
"description":"",
"estimatedMinutes":0,
"rewardXP":20
}
]
}
]
}

`;

}