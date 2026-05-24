import { NextResponse } from "next/server";

import { fetchAppMetadata } from "@/lib/app-store";
import { generateAudit } from "@/lib/audit-engine";

export async function POST(
  request: Request
) {
  try {

    const body =
      await request.json();

    const app =
      await fetchAppMetadata(
        body.url
      );

    const audit =
      generateAudit(app);

    return NextResponse.json(
      audit
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error"
      },
      {
        status: 500
      }
    );

  }
}