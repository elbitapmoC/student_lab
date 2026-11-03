import "server-only";
import type { AppointmentPage } from "./appointments";

const API_URL = process.env.APPOINTMENTS_API_URL ?? "http://localhost:3001";

export async function fetchAppointmentPage(
  query: URLSearchParams,
): Promise<Response> {
  return fetch(`${API_URL}/apps?${query}`, { cache: "no-store" });
}

export function getInitialAppointmentPage(): Promise<Response> {
  const query = new URLSearchParams({ page: "1", pageSize: "10" });
  return fetchAppointmentPage(query);
}

export async function readAppointmentPage(
  response: Response,
): Promise<AppointmentPage> {
  if (!response.ok) {
    throw new Error(`Appointment API returned ${response.status}.`);
  }
  return response.json() as Promise<AppointmentPage>;
}
