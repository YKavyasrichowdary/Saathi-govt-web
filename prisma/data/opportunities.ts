import { scholarships } from "./scholarships";
import { internships } from "./internships";
import { hackathons } from "./hackathons";
import { jobs, courses, fellowships } from "./jobs";

export const allOpportunities = [
  ...scholarships,
  ...internships,
  ...hackathons,
  ...jobs,
  ...courses,
  ...fellowships,
];