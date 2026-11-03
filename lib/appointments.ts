export type Appointment = {
  id: string;
  providerId: string;
  patientName: string;
  providerName: string;
  date: string;
  time: string;
  location: string;
  scanType: "MRI" | "CT" | "X-ray";
  status: "requested" | "scheduled" | "cancelled";
};

export type AppointmentPage = {
  appointments: Appointment[];
  total: number;
  page: number;
  pageSize: number;
};
