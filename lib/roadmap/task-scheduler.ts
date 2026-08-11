export interface SchedulableTask {
  title?: string;
  estimatedMinutes: number;
  [key: string]: any;
}

export interface ScheduledTask extends SchedulableTask {
  dayNumber: number;
}

export interface ScheduleTasksInput {
  tasks: SchedulableTask[];
  availableDays: number;
  dailyHours: number;
}

export function scheduleTasks({
  tasks,
  availableDays,
  dailyHours,
}: ScheduleTasksInput): ScheduledTask[] {
  const dailyCapacity = Math.max(15, Math.floor(dailyHours * 60));

  if (dailyCapacity <= 0) {
    throw new Error("Daily study capacity must be greater than zero.");
  }

  if (availableDays <= 0) {
    throw new Error("Available preparation days must be greater than zero.");
  }

  // 1. Clamp any single task that exceeds dailyCapacity
  const normalizedTasks = tasks.map((task) => ({
    ...task,
    estimatedMinutes: Math.max(
      15,
      Math.min(task.estimatedMinutes || 30, dailyCapacity)
    ),
  }));

  // 2. Ensure total estimated minutes do not exceed total available capacity
  const totalCapacity = availableDays * dailyCapacity;
  let totalMinutes = normalizedTasks.reduce(
    (total, t) => total + t.estimatedMinutes,
    0
  );

  if (totalMinutes > totalCapacity && totalMinutes > 0) {
    const scaleFactor = totalCapacity / totalMinutes;
    normalizedTasks.forEach((task) => {
      task.estimatedMinutes = Math.max(
        15,
        Math.floor(task.estimatedMinutes * scaleFactor)
      );
    });
  }

  // 3. Schedule tasks into available days
  const scheduled: ScheduledTask[] = [];
  let currentDay = 1;
  let usedMinutes = 0;

  for (const task of normalizedTasks) {
    if (
      usedMinutes > 0 &&
      usedMinutes + task.estimatedMinutes > dailyCapacity &&
      currentDay < availableDays
    ) {
      currentDay += 1;
      usedMinutes = 0;
    }

    scheduled.push({
      ...task,
      dayNumber: Math.min(currentDay, availableDays),
    });

    usedMinutes += task.estimatedMinutes;
  }

  return scheduled;
}
