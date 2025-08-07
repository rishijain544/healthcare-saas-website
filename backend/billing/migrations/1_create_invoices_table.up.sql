CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  patient_name VARCHAR(255) NOT NULL,
  patient_email VARCHAR(255),
  date DATE NOT NULL,
  treatment VARCHAR(255) NOT NULL,
  medicine TEXT,
  doctor_name VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_invoices_patient_name ON invoices(patient_name);
CREATE INDEX idx_invoices_date ON invoices(date);
CREATE INDEX idx_invoices_status ON invoices(status);
