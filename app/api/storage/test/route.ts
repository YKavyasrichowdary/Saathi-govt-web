import { NextResponse } from "next/server";
import { supabaseStorage } from "@/lib/supabase-storage";

export async function GET() {
  const { data, error } =
    await supabaseStorage.storage.listBuckets();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    buckets: data,
  });
}