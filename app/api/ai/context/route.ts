import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { buildAIContext } from "@/lib/ai/context-builder";

export async function GET() {
  const session = await getSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const context = await buildAIContext(session.user.id);

  return NextResponse.json({
    success: true,
    context,
  });
}