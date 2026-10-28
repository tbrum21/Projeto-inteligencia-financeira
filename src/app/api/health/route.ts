import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", service: "orbe-investimentos", timestamp: new Date().toISOString() });
}
