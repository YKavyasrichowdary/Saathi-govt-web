export function getPreparationDate(
  startDate: Date,
  dayNumber: number
): Date {
  const date = new Date(startDate);

  date.setHours(0, 0, 0, 0);

  date.setDate(
    date.getDate() + (dayNumber - 1)
  );

  return date;
}

export function getDaysUntilTarget(
  targetDate: string | Date,
  fromDate: Date = new Date()
): number {
  const target = new Date(targetDate);
  const start = new Date(fromDate);

  target.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);

  const difference =
    target.getTime() -
    start.getTime();

  return Math.max(
    0,
    Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    )
  );
}

export function formatRoadmapDate(
  date: Date
): string {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(date);
}