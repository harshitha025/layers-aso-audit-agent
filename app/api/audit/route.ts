import { NextResponse } from "next/server";

import { fetchAppMetadata } from "@/lib/app-store";
import { runAsoAudit } from "@/lib/llm";
import { parseAuditResponse } from "@/lib/parse-audit";

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

    const llmResponse =
await runAsoAudit(app);

const audit =
parseAuditResponse(
llmResponse
);

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