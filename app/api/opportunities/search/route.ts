import { NextRequest, NextResponse } from "next/server";
import opportunityService from "@/services/opportunity/opportunity.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") ?? undefined;
  const type = searchParams.get("type") ?? undefined;
  const mode = searchParams.get("mode") ?? undefined;
  const source = searchParams.get("source") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const educationLevel = searchParams.get("educationLevel") ?? undefined;
  const limitStr = searchParams.get("limit");
  const limit = limitStr ? parseInt(limitStr, 10) : undefined;

  const opportunities = await opportunityService.search({
    q,
    type,
    mode,
    source,
    status,
    educationLevel,
    limit,
  });

  return NextResponse.json({
    success: true,
    data: opportunities,
  });
}