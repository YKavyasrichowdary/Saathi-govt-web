import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";

import recommendationService from "@/services/recommendation/recommendation.service";

export async function GET() {
  const session = await getSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const recommendations =
    await recommendationService.getRecommendations(
      session.user.id
    );

  return NextResponse.json({
    success: true,
    data: recommendations,
  });
}