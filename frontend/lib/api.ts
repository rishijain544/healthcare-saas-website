import backend from '~backend/client';

export interface User {
  id: number;
  email: string;
  name: string;
  role: "user" | "doctor" | "admin";
  phone?: string;
  language: "en" | "hi";
  created_at: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
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

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  getAuthHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await backend.auth.login(credentials);
    this.setToken(response.token);
    return response;
  }

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await backend.auth.signup(userData);
    this.setToken(response.token);
    return response;
  }

  async getCurrentUser(): Promise<User> {
    return backend.auth.getCurrentUser();
  }

  async updateLanguage(language: "en" | "hi"): Promise<{ success: boolean }> {
    return backend.auth.updateLanguage({ language });
  }

  // Bookings methods
  async createBooking(bookingData: any) {
    return backend.bookings.createBooking(bookingData);
  }

  async getUserBookings(userId: number) {
    return backend.bookings.getUserBookings({ user_id: userId });
  }

  async getDoctorBookings(doctorId: number) {
    return backend.bookings.getDoctorBookings({ doctor_id: doctorId });
  }

  async getAllBookings() {
    return backend.bookings.getAllBookings();
  }

  async updateBookingStatus(id: number, status: string) {
    return backend.bookings.updateBookingStatus({ id, status });
  }

  // AI methods
  async makeAICall(phone: string, message: string, language: "en" | "hi") {
    return backend.ai.makeCall({ phone, message, language });
  }

  async chatWithAI(message: string, language: "en" | "hi", context?: string) {
    return backend.ai.chat({ message, language, context });
  }

  async sendReminder(phone: string, message: string, language: "en" | "hi") {
    return backend.ai.sendReminder({ phone, message, language });
  }

  // Billing methods
  async generateInvoice(invoiceData: any) {
    return backend.billing.generateInvoice(invoiceData);
  }

  async getInvoices() {
    return backend.billing.getInvoices();
  }

  async getInvoice(id: number) {
    return backend.billing.getInvoice({ id });
  }

  async updateInvoiceStatus(id: number, status: string) {
    return backend.billing.updateInvoiceStatus({ id, status });
  }

  // Hospitals methods
  async getHospitals() {
    return backend.hospitals.getHospitals();
  }

  async searchHospitals(searchParams: any) {
    return backend.hospitals.searchHospitals(searchParams);
  }

  async getHospital(id: number) {
    return backend.hospitals.getHospital({ id });
  }

  async compareTreatmentPrices(treatmentName: string) {
    return backend.hospitals.compareTreatmentPrices({ treatment_name: treatmentName });
  }

  async addHospital(hospitalData: any) {
    return backend.hospitals.addHospital(hospitalData);
  }
}

export const apiClient = new ApiClient();
