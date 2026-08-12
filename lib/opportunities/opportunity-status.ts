import {
  OpportunityStatus,
} from "@prisma/client";

export function calculateOpportunityStatus(
  deadline?: Date | null,
  startDate?: Date | null,
  now = new Date()
): OpportunityStatus {
  if (
    deadline &&
    deadline.getTime() < now.getTime()
  ) {
    return "EXPIRED";
  }

  if (
    startDate &&
    startDate.getTime() > now.getTime()
  ) {
    return "UPCOMING";
  }

  return "OPEN";
}