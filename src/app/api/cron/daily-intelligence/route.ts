import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Job persistence, idempotency and provider calls are enabled only after Supabase is configured.
  return NextResponse.json({ status: "configuration_required" }, { status: 503 });
}
