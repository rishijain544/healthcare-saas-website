CREATE TABLE hospitals (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  rating DECIMAL(3, 2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  specialties TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE treatments (
  id BIGSERIAL PRIMARY KEY,
  hospital_id BIGINT NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_hospitals_location ON hospitals USING GIST (point(longitude, latitude));
CREATE INDEX idx_hospitals_rating ON hospitals(rating);
CREATE INDEX idx_hospitals_specialties ON hospitals USING GIN(specialties);
CREATE INDEX idx_treatments_hospital_id ON treatments(hospital_id);
CREATE INDEX idx_treatments_name ON treatments(name);
CREATE INDEX idx_treatments_price ON treatments(price);

-- Insert sample data
INSERT INTO hospitals (name, address, latitude, longitude, phone, email, rating, specialties) VALUES
('City General Hospital', '123 Main St, New York, NY 10001', 40.7128, -74.0060, '+1-555-0101', 'info@citygeneral.com', 4.5, ARRAY['Cardiology', 'Emergency', 'Surgery']),
('Metro Medical Center', '456 Oak Ave, Los Angeles, CA 90210', 34.0522, -118.2437, '+1-555-0102', 'contact@metromedical.com', 4.2, ARRAY['Pediatrics', 'Oncology', 'Neurology']),
('Sunrise Healthcare', '789 Pine Rd, Chicago, IL 60601', 41.8781, -87.6298, '+1-555-0103', 'hello@sunrisehc.com', 4.7, ARRAY['Orthopedics', 'Dermatology', 'Psychiatry']);

INSERT INTO treatments (hospital_id, name, price, description) VALUES
(1, 'General Checkup', 150.00, 'Comprehensive health examination'),
(1, 'Blood Test', 75.00, 'Complete blood count and chemistry panel'),
(1, 'X-Ray', 200.00, 'Digital X-ray imaging'),
(2, 'General Checkup', 175.00, 'Full physical examination with consultation'),
(2, 'Blood Test', 85.00, 'Advanced blood analysis'),
(2, 'MRI Scan', 800.00, 'Magnetic resonance imaging'),
(3, 'General Checkup', 140.00, 'Basic health screening'),
(3, 'Blood Test', 70.00, 'Standard blood work'),
(3, 'Physical Therapy', 120.00, 'One hour physical therapy session');
