import repository from "@/repositories/roadmap/roadmap.repository";
import opportunityMatchRepository from "@/repositories/opportunity-match/opportunity-match.repository";
import {
  getDaysUntilTarget,
  getPreparationDate,
  formatRoadmapDate,
} from "@/lib/roadmap/roadmap-dates";
import {
  validateRoadmapCapacity,
} from "@/lib/ai/roadmap-validator";
class RoadmapService {

  async getRoadmap(id: string) {
    const roadmap =
      await repository.getRoadmap(id);

    if (!roadmap) {
      throw new Error(
        "Roadmap not found."
      );
    }

    return roadmap;
  }

  async getRoadmapView(id: string) {
    const roadmap = await this.getRoadmap(id);

    const today = new Date();
    const preparationDays = roadmap.estimatedDays;
    const targetDate = roadmap.targetDate
      ? new Date(roadmap.targetDate)
      : null;

    let todayDayNumber: number | null = null;
    let startDate: Date | null = null;

    if (targetDate) {
      const todayStart = new Date(today);
      todayStart.setHours(0, 0, 0, 0);

      const targetStart = new Date(targetDate);
      targetStart.setHours(0, 0, 0, 0);

      const daysUntilTarget = Math.ceil(
        (
          targetStart.getTime() -
          todayStart.getTime()
        ) /
          (1000 * 60 * 60 * 24)
      );

      if (daysUntilTarget > 0) {
        todayDayNumber =
          preparationDays -
          daysUntilTarget +
          1;

        startDate = new Date(targetStart);
        startDate.setDate(startDate.getDate() - preparationDays);
      }
    }

    const allTasks = roadmap.milestones.flatMap(
      (milestone: any) => milestone.tasks
    );

    const incompleteTasks = allTasks.filter(
      (task: any) =>
        task.status !== "COMPLETED"
    );

    const activeDayNumber =
      incompleteTasks.length > 0
        ? Math.min(
            ...incompleteTasks.map(
              (task: any) => task.dayNumber
            )
          )
        : null;

    const todayTasks =
      activeDayNumber !== null
        ? allTasks.filter(
            (task: any) =>
              task.dayNumber ===
              activeDayNumber
          )
        : [];

    const todayPlanDate =
      activeDayNumber !== null &&
      startDate !== null
        ? getPreparationDate(
            startDate,
            activeDayNumber
          )
        : null;

    const nextTask =
      activeDayNumber !== null
        ? allTasks.find(
            (task: any) =>
              task.dayNumber ===
                activeDayNumber &&
              task.status !== "COMPLETED"
          ) ?? null
        : null;

    const match = roadmap.opportunityId
      ? await opportunityMatchRepository.getByUserAndOpportunity(
          roadmap.userId,
          roadmap.opportunityId
        )
      : null;

    const currentMilestone =
      roadmap.milestones.find(
        (milestone: any) =>
          milestone.tasks.some(
            (task: any) =>
              task.status !== "COMPLETED"
          )
      ) ?? null;

    const milestones = roadmap.milestones.map((m: any) => {
      const allTasksCompleted =
        m.tasks.length > 0 && m.tasks.every((t: any) => t.status === "COMPLETED");
      const anyTaskStarted =
        m.tasks.some((t: any) => t.status === "COMPLETED" || t.status === "IN_PROGRESS");
      const status: "COMPLETED" | "IN_PROGRESS" | "PENDING" = allTasksCompleted
        ? "COMPLETED"
        : anyTaskStarted
        ? "IN_PROGRESS"
        : "PENDING";

      return {
        id: m.id,
        title: m.title,
        description: m.description ?? "",
        status,
      };
    });

    const checklistTasks = currentMilestone
      ? currentMilestone.tasks.map((t: any) => ({
          id: t.id,
          title: t.title,
          estimatedMinutes: t.estimatedMinutes,
          completed: t.status === "COMPLETED",
        }))
      : [];

    return {
      roadmap,
      match,
      nextTask,
      currentMilestone,
      milestones,
      checklistTasks,

      todayPlan: {
        dayNumber: activeDayNumber,
        date: todayPlanDate
          ? formatRoadmapDate(
              todayPlanDate
            )
          : null,
        tasks: todayTasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          estimatedMinutes: task.estimatedMinutes,
          rewardXP: task.rewardXP,
          status: task.status,
        })),
      },
    };
  }

  async getUserRoadmaps(userId: string) {
    return repository.getUserRoadmaps(userId);
  }

  async getRoadmapByOpportunity(userId: string, opportunityId: string) {
    return repository.getRoadmapByOpportunity(userId, opportunityId);
  }
}

export default new RoadmapService();