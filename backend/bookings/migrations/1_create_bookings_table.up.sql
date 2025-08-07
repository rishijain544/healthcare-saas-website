CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  doctor_id BIGINT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_doctor_id ON bookings(doctor_id);
CREATE INDEX idx_bookings_date ON bookings(appointment_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_reminder ON bookings(reminder_sent, appointment_date);
