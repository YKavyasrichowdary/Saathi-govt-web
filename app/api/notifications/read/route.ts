import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import notificationService from "@/services/notification/notification.service";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const { id } = await request.json();

  await notificationService.markAsRead(id);

  return NextResponse.json({
    success: true,
  });
}