import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { secret } from "encore.dev/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const db = new SQLDatabase("auth", {
  migrations: "./migrations",
});

const jwtSecret = secret("JWTSecret");

export interface User {
  id: number;
  email: string;
  name: string;
  role: "user" | "doctor" | "admin";
  phone?: string;
  language: "en" | "hi";
  created_at: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role?: "user" | "doctor" | "admin";
  phone?: string;
  language?: "en" | "hi";
}

export interface AuthResponse {
  user: User;
  token: string;
}

// User signup
export const signup = api<SignupRequest, AuthResponse>(
  { expose: true, method: "POST", path: "/auth/signup" },
  async (req) => {
    const { email, password, name, role = "user", phone, language = "en" } = req;

    // Check if user already exists
    const existingUser = await db.queryRow<{ id: number }>`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db.queryRow<User>`
      INSERT INTO users (email, password, name, role, phone, language)
      VALUES (${email}, ${hashedPassword}, ${name}, ${role}, ${phone}, ${language})
      RETURNING id, email, name, role, phone, language, created_at
    `;

    if (!user) {
      throw APIError.internal("Failed to create user");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret(),
      { expiresIn: "7d" }
    );

    return { user, token };
  }
);

// User login
export const login = api<LoginRequest, AuthResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    const { email, password } = req;

    // Find user
    const userWithPassword = await db.queryRow<User & { password: string }>`
      SELECT id, email, password, name, role, phone, language, created_at
      FROM users WHERE email = ${email}
    `;

    if (!userWithPassword) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, userWithPassword.password);
    if (!isValidPassword) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    // Remove password from response
    const { password: _, ...user } = userWithPassword;

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret(),
      { expiresIn: "7d" }
    );

    return { user, token };
  }
);

// Get current user
export const getCurrentUser = api<void, User>(
  { expose: true, method: "GET", path: "/auth/me", auth: true },
  async () => {
    // This would be implemented with proper auth middleware
    // For now, returning a placeholder
    throw APIError.unimplemented("Auth middleware not implemented yet");
  }
);

// Update user language preference
export const updateLanguage = api<{ language: "en" | "hi" }, { success: boolean }>(
  { expose: true, method: "PUT", path: "/auth/language", auth: true },
  async (req) => {
    const { language } = req;
    
    // This would use the authenticated user ID from auth middleware
    // For now, returning a placeholder
    throw APIError.unimplemented("Auth middleware not implemented yet");
  }
);
