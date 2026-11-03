type AppointmentSearchProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export default function AppointmentSearch({
  value,
  onValueChange,
}: AppointmentSearchProps) {
  return (
    <div className="flex w-full sm:max-w-sm">
      <label htmlFor="patient-search" className="sr-only">
        Search by patient name
      </label>
      <input
        id="patient-search"
        type="search"
        placeholder="Search patients..."
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-[#d5dfd9] bg-[#fbfcfb] px-3.5 py-2.5 text-sm text-[#183c36] outline-none transition placeholder:text-[#91a099] focus:border-[#397b6f] focus:bg-white focus:ring-4 focus:ring-[#397b6f]/10"
      />
    </div>
  );
}
