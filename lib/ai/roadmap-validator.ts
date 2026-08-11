interface RoadmapTask {
  estimatedMinutes: number;
}

interface RoadmapMilestone {
  tasks: RoadmapTask[];
}

interface RoadmapForValidation {
  estimatedDays: number;
  milestones: RoadmapMilestone[];
}

interface RoadmapCapacityInput {
  roadmap: RoadmapForValidation;
  availableDays: number;
  dailyHours: number;
}

export function validateRoadmapCapacity({
  roadmap,
  availableDays,
  dailyHours,
}: RoadmapCapacityInput) {
  if (availableDays <= 0) {
    throw new Error("The target date must be in the future.");
  }

  if (dailyHours <= 0) {
    throw new Error("Daily study hours must be greater than zero.");
  }

  const dailyCapacity = Math.max(15, Math.floor(dailyHours * 60));
  const availableMinutes = availableDays * dailyCapacity;

  if (roadmap.estimatedDays > availableDays) {
    roadmap.estimatedDays = availableDays;
  }

  let totalTaskMinutes = 0;
  for (const milestone of roadmap.milestones) {
    for (const task of milestone.tasks) {
      if (task.estimatedMinutes > dailyCapacity) {
        task.estimatedMinutes = dailyCapacity;
      }
      totalTaskMinutes += task.estimatedMinutes;
    }
  }

  if (totalTaskMinutes > availableMinutes && totalTaskMinutes > 0) {
    const scale = availableMinutes / totalTaskMinutes;
    totalTaskMinutes = 0;
    for (const milestone of roadmap.milestones) {
      for (const task of milestone.tasks) {
        task.estimatedMinutes = Math.max(
          15,
          Math.floor(task.estimatedMinutes * scale)
        );
        totalTaskMinutes += task.estimatedMinutes;
      }
    }
  }

  return {
    totalTaskMinutes,
    availableMinutes,
    estimatedDays: roadmap.estimatedDays,
  };
}