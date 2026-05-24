import { NextResponse } from "next/server";
import { fetchAppMetadata } from "@/lib/app-store";

export async function POST(request: Request) {
  try {

    const body = await request.json();

    const metadata = await fetchAppMetadata(
      body.url
    );

    return NextResponse.json(metadata);

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