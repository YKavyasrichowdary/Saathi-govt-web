import { NextRequest, NextResponse } from "next/server";

import opportunityService from "@/services/opportunity/opportunity.service";

export async function GET(request: NextRequest) {
  try {
    const query =
      request.nextUrl.searchParams.get("q") ?? "";

    const opportunities = await opportunityService.search(query);

    return NextResponse.json({
      success: true,
      data: opportunities,
    });

  } catch {

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );

  }
}