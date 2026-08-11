export function getDaysUntil(targetDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);

  const difference = target.getTime() - today.getTime();

  return Math.max(
    0,
    Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )
  );
}
