import { NextRequest, NextResponse } from "next/server";
import { fetchAppointmentPage } from "../../../lib/appointments-api";

export async function GET(request: NextRequest) {
  const upstreamQuery = new URLSearchParams();
  for (const key of ["patientName", "page", "pageSize"] as const) {
    const values = request.nextUrl.searchParams.getAll(key);
    if (values.length > 1) {
      return NextResponse.json(
        { error: `${key} must only be provided once.` },
        { status: 400 },
      );
    }
    if (values[0] !== undefined) upstreamQuery.set(key, values[0]);
  }

  try {
    const response = await fetchAppointmentPage(upstreamQuery);
    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Could not reach the appointments API:", error);
    return NextResponse.json(
      { error: "Appointment service is unavailable." },
      { status: 503 },
    );
  }
}
