import type { Appointment } from "../../lib/appointments";

type AppointmentTableProps = {
  appointments: Appointment[];
};

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case "cancelled":
      return "bg-rose-50 text-rose-700 ring-rose-200";
    case "completed":
      return "bg-sky-50 text-sky-700 ring-sky-200";
    case "scheduled":
    case "confirmed":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    default:
      return "bg-amber-50 text-amber-800 ring-amber-200";
  }
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusStyles(status)}`}
    >
      {status}
    </span>
  );
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  return (
    <tr className="transition-colors hover:bg-[#f8faf9]">
      <td className="truncate px-5 py-4 sm:px-6">
        <span className="block truncate font-medium text-[#183c36]">
          {appointment.patientName}
        </span>
        <span className="mt-0.5 block text-xs text-[#8a9a94]">
          ID {appointment.id}
        </span>
      </td>
      <td className="hidden whitespace-nowrap px-5 py-4 text-[#526a63] md:table-cell">
        {appointment.providerName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-[#526a63] sm:px-5">
        {appointment.date}
      </td>
      <td className="hidden whitespace-nowrap px-5 py-4 text-[#526a63] lg:table-cell">
        {appointment.time}
      </td>
      <td className="truncate px-2 py-4 text-[#526a63] sm:px-5">
        {appointment.scanType}
      </td>
      <td className="px-2 py-4 sm:px-5">
        <StatusBadge status={appointment.status} />
      </td>
      <td className="hidden whitespace-nowrap px-5 py-4 text-[#526a63] xl:table-cell">
        {appointment.location}
      </td>
    </tr>
  );
}

export default function AppointmentTable({
  appointments,
}: AppointmentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto divide-y divide-[#e8eeea] text-left text-sm">
        <thead className="bg-[#f7f9f8] text-xs font-semibold text-[#71847d]">
          <tr>
            <th scope="col" className="px-5 py-3.5 sm:px-6">
              Patient
            </th>
            <th scope="col" className="hidden px-5 py-3.5 md:table-cell">
              Provider
            </th>
            <th scope="col" className="px-3 py-3.5 sm:px-5">
              Date
            </th>
            <th scope="col" className="hidden px-5 py-3.5 lg:table-cell">
              Time
            </th>
            <th scope="col" className="px-2 py-3.5 sm:px-5">
              Scan type
            </th>
            <th scope="col" className="px-2 py-3.5 sm:px-5">
              Status
            </th>
            <th scope="col" className="hidden px-5 py-3.5 xl:table-cell">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#edf1ee]">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentRow key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="px-5 py-14 text-center text-sm text-[#73867f]"
              >
                No matching appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
