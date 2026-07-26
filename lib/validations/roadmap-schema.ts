import { z } from "zod";

export const roadmapSchema = z.object({

title: z.string(),

description: z.string(),

estimatedDays: z.number(),

readinessScore: z.number(),

targetScore: z.number(),

summary: z.string(),

milestones: z.array(

z.object({

title: z.string(),

description: z.string(),

tasks: z.array(

z.object({

title: z.string(),

description: z.string(),

estimatedMinutes: z.number(),

rewardXP: z.number()

})

)

})

)

});