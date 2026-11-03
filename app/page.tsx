import {
  getInitialAppointmentPage,
  readAppointmentPage,
} from "../lib/appointments-api";
import { AppointmentList } from "./components/AppointmentList";

export const HomePage = async () => {
  const response = await getInitialAppointmentPage();
  const initialPage = await readAppointmentPage(response);
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
      <header className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#52756e]">
          OneImaging · Schedule
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#183c36] sm:text-4xl">
              Appointments
            </h1>
            <p className="mt-2 text-sm text-[#60766f]">
              Review and manage scheduled patient visits.
            </p>
          </div>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-[#dfe7e2] bg-white shadow-[0_12px_36px_-24px_rgba(24,60,54,0.28)]">
        <AppointmentList initialPage={initialPage} />
      </section>
    </main>
  );
};

export default HomePage;
