import express from 'express';
import data from '../fixtures/appointments.json'

const app = express();
app.use(express.json()); // Parse incoming JSON request bodies

const port = 3001;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

function parsePositiveInteger(value: unknown): number | undefined {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) return undefined;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get("/apps", (req, res) => {
  const rawPatientName = req.query.patientName;
  if (rawPatientName !== undefined && typeof rawPatientName !== "string") {
    res.status(400).json({ error: "patientName must be a single string." });
    return;
  }

  const page =
    req.query.page === undefined
      ? DEFAULT_PAGE
      : parsePositiveInteger(req.query.page);
  const pageSize =
    req.query.pageSize === undefined
      ? DEFAULT_PAGE_SIZE
      : parsePositiveInteger(req.query.pageSize);

  if (page === undefined || pageSize === undefined) {
    res.status(400).json({ error: "page and pageSize must be positive integers." });
    return;
  }
  if (pageSize > MAX_PAGE_SIZE) {
    res.status(400).json({ error: `pageSize cannot exceed ${MAX_PAGE_SIZE}.` });
    return;
  }

  const offset = (page - 1) * pageSize;
  if (!Number.isSafeInteger(offset)) {
    res.status(400).json({ error: "page is too large." });
    return;
  }

  const patientName = (rawPatientName ?? "").trim().toLowerCase();
  const matchingAppointments = data.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(patientName)
  );

  res.json({
    appointments: matchingAppointments.slice(offset, offset + pageSize),
    total: matchingAppointments.length,
    page,
    pageSize,
  });
});

// form sends patient information to create a new appointment (name and scanType) the rest of the appointment details (provider, date, time, location, status) are managed by us.
app.post('/apps', (req, res) => {
    const { patientName, scanType } = req.body;
    // Here you would typically create a new appointment in your database
    // For now, we'll just echo back the received data
    res.send({ patientName, scanType });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});