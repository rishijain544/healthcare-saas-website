import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("bookings", {
  migrations: "./migrations",
});

export interface Booking {
  id: number;
  user_id: number;
  doctor_id?: number;
  appointment_date: Date;
  appointment_time: string;
  service_type: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
  reminder_sent: boolean;
  created_at: Date;
}

export interface CreateBookingRequest {
  user_id: number;
  doctor_id?: number;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  notes?: string;
}

export interface BookingResponse {
  booking: Booking;
}

export interface BookingsListResponse {
  bookings: Booking[];
}

// Create a new booking
export const createBooking = api<CreateBookingRequest, BookingResponse>(
  { expose: true, method: "POST", path: "/bookings" },
  async (req) => {
    const { user_id, doctor_id, appointment_date, appointment_time, service_type, notes } = req;

    const booking = await db.queryRow<Booking>`
      INSERT INTO bookings (user_id, doctor_id, appointment_date, appointment_time, service_type, notes, status, reminder_sent)
      VALUES (${user_id}, ${doctor_id}, ${appointment_date}, ${appointment_time}, ${service_type}, ${notes}, 'pending', false)
      RETURNING id, user_id, doctor_id, appointment_date, appointment_time, service_type, status, notes, reminder_sent, created_at
    `;

    if (!booking) {
      throw APIError.internal("Failed to create booking");
    }

    return { booking };
  }
);

// Get bookings for a user
export const getUserBookings = api<{ user_id: number }, BookingsListResponse>(
  { expose: true, method: "GET", path: "/bookings/user/:user_id" },
  async ({ user_id }) => {
    const bookings = await db.queryAll<Booking>`
      SELECT id, user_id, doctor_id, appointment_date, appointment_time, service_type, status, notes, reminder_sent, created_at
      FROM bookings 
      WHERE user_id = ${user_id}
      ORDER BY appointment_date DESC, appointment_time DESC
    `;

    return { bookings };
  }
);

// Get bookings for a doctor
export const getDoctorBookings = api<{ doctor_id: number }, BookingsListResponse>(
  { expose: true, method: "GET", path: "/bookings/doctor/:doctor_id" },
  async ({ doctor_id }) => {
    const bookings = await db.queryAll<Booking>`
      SELECT id, user_id, doctor_id, appointment_date, appointment_time, service_type, status, notes, reminder_sent, created_at
      FROM bookings 
      WHERE doctor_id = ${doctor_id}
      ORDER BY appointment_date ASC, appointment_time ASC
    `;

    return { bookings };
  }
);

// Get all bookings (admin only)
export const getAllBookings = api<void, BookingsListResponse>(
  { expose: true, method: "GET", path: "/bookings/all" },
  async () => {
    const bookings = await db.queryAll<Booking>`
      SELECT id, user_id, doctor_id, appointment_date, appointment_time, service_type, status, notes, reminder_sent, created_at
      FROM bookings 
      ORDER BY appointment_date DESC, appointment_time DESC
    `;

    return { bookings };
  }
);

// Update booking status
export const updateBookingStatus = api<{ id: number; status: string }, BookingResponse>(
  { expose: true, method: "PUT", path: "/bookings/:id/status" },
  async ({ id, status }) => {
    const booking = await db.queryRow<Booking>`
      UPDATE bookings 
      SET status = ${status}
      WHERE id = ${id}
      RETURNING id, user_id, doctor_id, appointment_date, appointment_time, service_type, status, notes, reminder_sent, created_at
    `;

    if (!booking) {
      throw APIError.notFound("Booking not found");
    }

    return { booking };
  }
);

// Get bookings that need reminders
export const getBookingsForReminders = api<void, BookingsListResponse>(
  { expose: true, method: "GET", path: "/bookings/reminders" },
  async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const bookings = await db.queryAll<Booking>`
      SELECT id, user_id, doctor_id, appointment_date, appointment_time, service_type, status, notes, reminder_sent, created_at
      FROM bookings 
      WHERE appointment_date = ${tomorrowStr}
      AND reminder_sent = false
      AND status IN ('pending', 'confirmed')
    `;

    return { bookings };
  }
);

// Mark reminder as sent
export const markReminderSent = api<{ id: number }, { success: boolean }>(
  { expose: true, method: "PUT", path: "/bookings/:id/reminder-sent" },
  async ({ id }) => {
    await db.exec`
      UPDATE bookings 
      SET reminder_sent = true
      WHERE id = ${id}
    `;

    return { success: true };
  }
);
