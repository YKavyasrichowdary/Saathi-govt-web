export function getScoreLabel(score: number) {
  if (score >= 90) return "Excellent Match";

  if (score >= 75) return "Good Match";

  if (score >= 60) return "Potential Match";

  return "Low Match";
}

export function getScoreColor(score: number) {
  if (score >= 90) {
    return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30";
  }

  if (score >= 75) {
    return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30";
  }

  if (score >= 60) {
    return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30";
  }

  return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30";
}