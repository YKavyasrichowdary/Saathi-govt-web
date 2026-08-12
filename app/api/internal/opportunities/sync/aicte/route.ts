import { NextResponse } from "next/server";
import { syncAICTEInternships } from "@/lib/opportunities/sync-aicte";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  const syncAuthorized =
    Boolean(process.env.SYNC_SECRET) &&
    authHeader === `Bearer ${process.env.SYNC_SECRET}`;

  const cronAuthorized =
    Boolean(process.env.CRON_SECRET) &&
    authHeader === `Bearer ${process.env.CRON_SECRET}`;

  if (!syncAuthorized && !cronAuthorized) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const result = await syncAICTEInternships();

    return NextResponse.json({
      success: true,
      result: {
        source: result.source,
        fetched: result.fetched,
        created: result.created,
        updated: result.updated,
        failed: result.failed,
      },
    });
  } catch (error) {
    console.error("AICTE sync failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "AICTE sync failed",
      },
      {
        status: 500,
      }
    );
  }
}
