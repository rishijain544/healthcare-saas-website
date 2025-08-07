import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("hospitals", {
  migrations: "./migrations",
});

export interface Hospital {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  rating: number;
  specialties: string[];
  created_at: Date;
}

export interface Treatment {
  id: number;
  hospital_id: number;
  name: string;
  price: number;
  description?: string;
  created_at: Date;
}

export interface HospitalWithTreatments extends Hospital {
  treatments: Treatment[];
}

export interface SearchHospitalsRequest {
  latitude?: number;
  longitude?: number;
  radius?: number; // in kilometers
  specialty?: string;
  rating_min?: number;
}

export interface HospitalsListResponse {
  hospitals: Hospital[];
}

export interface TreatmentComparison {
  treatment_name: string;
  hospitals: Array<{
    hospital: Hospital;
    price: number;
    description?: string;
  }>;
}

export interface CreateHospitalRequest {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  rating: number;
  specialties: string[];
}

// Get all hospitals
export const getHospitals = api<void, HospitalsListResponse>(
  { expose: true, method: "GET", path: "/hospitals" },
  async () => {
    const hospitals = await db.queryAll<Hospital>`
      SELECT id, name, address, latitude, longitude, phone, email, rating, specialties, created_at
      FROM hospitals 
      ORDER BY rating DESC, name ASC
    `;

    return { hospitals };
  }
);

// Search hospitals by location and filters
export const searchHospitals = api<SearchHospitalsRequest, HospitalsListResponse>(
  { expose: true, method: "POST", path: "/hospitals/search" },
  async (req) => {
    const { latitude, longitude, radius = 10, specialty, rating_min = 0 } = req;

    let query = `
      SELECT id, name, address, latitude, longitude, phone, email, rating, specialties, created_at
      FROM hospitals 
      WHERE rating >= ${rating_min}
    `;

    const params: any[] = [];

    if (specialty) {
      query += ` AND ${specialty} = ANY(specialties)`;
    }

    if (latitude && longitude) {
      // Calculate distance using Haversine formula (simplified for demo)
      query += ` AND (
        6371 * acos(
          cos(radians(${latitude})) * cos(radians(latitude)) * 
          cos(radians(longitude) - radians(${longitude})) + 
          sin(radians(${latitude})) * sin(radians(latitude))
        )
      ) <= ${radius}`;
    }

    query += ` ORDER BY rating DESC, name ASC`;

    const hospitals = await db.queryAll<Hospital>(query);

    return { hospitals };
  }
);

// Get hospital by ID with treatments
export const getHospital = api<{ id: number }, { hospital: HospitalWithTreatments }>(
  { expose: true, method: "GET", path: "/hospitals/:id" },
  async ({ id }) => {
    const hospital = await db.queryRow<Hospital>`
      SELECT id, name, address, latitude, longitude, phone, email, rating, specialties, created_at
      FROM hospitals 
      WHERE id = ${id}
    `;

    if (!hospital) {
      throw APIError.notFound("Hospital not found");
    }

    const treatments = await db.queryAll<Treatment>`
      SELECT id, hospital_id, name, price, description, created_at
      FROM treatments 
      WHERE hospital_id = ${id}
      ORDER BY name ASC
    `;

    return { hospital: { ...hospital, treatments } };
  }
);

// Compare treatment prices across hospitals
export const compareTreatmentPrices = api<{ treatment_name: string }, { comparison: TreatmentComparison }>(
  { expose: true, method: "GET", path: "/hospitals/compare/:treatment_name" },
  async ({ treatment_name }) => {
    const results = await db.queryAll<{
      hospital_id: number;
      hospital_name: string;
      hospital_address: string;
      hospital_latitude: number;
      hospital_longitude: number;
      hospital_phone: string;
      hospital_email: string;
      hospital_rating: number;
      hospital_specialties: string[];
      hospital_created_at: Date;
      treatment_price: number;
      treatment_description: string;
    }>`
      SELECT 
        h.id as hospital_id,
        h.name as hospital_name,
        h.address as hospital_address,
        h.latitude as hospital_latitude,
        h.longitude as hospital_longitude,
        h.phone as hospital_phone,
        h.email as hospital_email,
        h.rating as hospital_rating,
        h.specialties as hospital_specialties,
        h.created_at as hospital_created_at,
        t.price as treatment_price,
        t.description as treatment_description
      FROM hospitals h
      JOIN treatments t ON h.id = t.hospital_id
      WHERE LOWER(t.name) LIKE LOWER(${'%' + treatment_name + '%'})
      ORDER BY t.price ASC
    `;

    const comparison: TreatmentComparison = {
      treatment_name,
      hospitals: results.map(result => ({
        hospital: {
          id: result.hospital_id,
          name: result.hospital_name,
          address: result.hospital_address,
          latitude: result.hospital_latitude,
          longitude: result.hospital_longitude,
          phone: result.hospital_phone,
          email: result.hospital_email,
          rating: result.hospital_rating,
          specialties: result.hospital_specialties,
          created_at: result.hospital_created_at,
        },
        price: result.treatment_price,
        description: result.treatment_description,
      }))
    };

    return { comparison };
  }
);

// Add a new hospital (admin only)
export const addHospital = api<CreateHospitalRequest, { hospital: Hospital }>(
  { expose: true, method: "POST", path: "/hospitals" },
  async (req) => {
    const { name, address, latitude, longitude, phone, email, rating, specialties } = req;

    const hospital = await db.queryRow<Hospital>`
      INSERT INTO hospitals (name, address, latitude, longitude, phone, email, rating, specialties)
      VALUES (${name}, ${address}, ${latitude}, ${longitude}, ${phone}, ${email}, ${rating}, ${specialties})
      RETURNING id, name, address, latitude, longitude, phone, email, rating, specialties, created_at
    `;

    if (!hospital) {
      throw APIError.internal("Failed to create hospital");
    }

    return { hospital };
  }
);
