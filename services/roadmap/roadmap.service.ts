import repository from "@/repositories/roadmap/roadmap.repository";

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

    const nextTask = roadmap.milestones
      .flatMap((m) => m.tasks)
      .find((task) => task.status !== "COMPLETED");

    const currentMilestone = roadmap.milestones[0];

    const milestones = roadmap.milestones.map((m) => {
      const allTasksCompleted =
        m.tasks.length > 0 && m.tasks.every((t) => t.status === "COMPLETED");
      const anyTaskStarted =
        m.tasks.some((t) => t.status === "COMPLETED" || t.status === "IN_PROGRESS");
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
      ? currentMilestone.tasks.map((t) => ({
          id: t.id,
          title: t.title,
          estimatedMinutes: t.estimatedMinutes,
          completed: t.status === "COMPLETED",
        }))
      : [];

    return {
      roadmap,
      nextTask,
      currentMilestone,
      milestones,
      checklistTasks,
    };
  }

}

export default new RoadmapService();