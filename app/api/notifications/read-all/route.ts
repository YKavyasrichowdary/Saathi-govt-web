import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import notificationService from "@/services/notification/notification.service";

export async function POST() {
  const session = await getSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  await notificationService.markAllAsRead(
    session.user.id
  );

  return NextResponse.json({
    success: true,
  });
}