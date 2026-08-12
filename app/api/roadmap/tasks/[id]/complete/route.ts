import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

import roadmapRepository from "@/repositories/roadmap/roadmap.repository";
import activityService from "@/services/progress/activity.service";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: Request,
  { params }: Params
) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { id: taskId } = await params;

    const task =
      await roadmapRepository.getTask(taskId);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found.",
        },
        { status: 404 }
      );
    }

    /*
     * Security check:
     * Make sure this task belongs to the
     * currently authenticated user.
     */
    if (
      task.milestone.roadmap.userId !==
      session.user.id
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden.",
        },
        { status: 403 }
      );
    }

    const updatedTask =
      await roadmapRepository.completeTask(
        taskId
      );

    await activityService.recordActivity(
      session.user.id
    );

    await roadmapRepository.updateMilestoneStatus(
      task.milestoneId
    );

    await roadmapRepository.updateRoadmapProgress(
      task.milestone.roadmapId
    );

    return NextResponse.json({
      success: true,
      data: updatedTask,
    });

  } catch (error) {
    console.error(
      "Complete Roadmap Task Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to complete task.",
      },
      { status: 500 }
    );
  }
}