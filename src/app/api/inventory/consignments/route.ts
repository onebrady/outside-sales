import { NextResponse } from "next/server";

import { fetchConsignmentTrailers } from "@/lib/smartsuite";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = Number.parseInt(searchParams.get("offset") ?? "0", 10) || 0;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.min(Number.parseInt(limitParam, 10) || 50, 200) : undefined;

    const data = await fetchConsignmentTrailers({ offset, limit });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (error) {
    console.error("Failed to fetch SmartSuite consignment records", error);

    const details = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Failed to fetch SmartSuite consignment records",
        details: process.env.NODE_ENV === "development" ? details : undefined,
      },
      { status: 500 }
    );
  }
}