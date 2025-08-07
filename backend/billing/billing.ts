import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("billing", {
  migrations: "./migrations",
});

export interface Invoice {
  id: number;
  patient_name: string;
  patient_email?: string;
  date: Date;
  treatment: string;
  medicine?: string;
  doctor_name?: string;
  amount: number;
  status: "pending" | "paid" | "cancelled";
  created_at: Date;
}

export interface GenerateInvoiceRequest {
  patient_name: string;
  patient_email?: string;
  treatment: string;
  medicine?: string;
  doctor_name?: string;
  amount: number;
}

export interface InvoiceResponse {
  invoice: Invoice;
  pdf_url?: string;
}

export interface InvoicesListResponse {
  invoices: Invoice[];
}

// Generate a new invoice
export const generateInvoice = api<GenerateInvoiceRequest, InvoiceResponse>(
  { expose: true, method: "POST", path: "/billing/generate" },
  async (req) => {
    const { patient_name, patient_email, treatment, medicine, doctor_name, amount } = req;

    const invoice = await db.queryRow<Invoice>`
      INSERT INTO invoices (patient_name, patient_email, treatment, medicine, doctor_name, amount, status, date)
      VALUES (${patient_name}, ${patient_email}, ${treatment}, ${medicine}, ${doctor_name}, ${amount}, 'pending', NOW())
      RETURNING id, patient_name, patient_email, date, treatment, medicine, doctor_name, amount, status, created_at
    `;

    if (!invoice) {
      throw APIError.internal("Failed to generate invoice");
    }

    // In a real implementation, this would generate a PDF using a library like PDFKit
    const pdf_url = `/api/billing/invoice/${invoice.id}/pdf`;

    return { invoice, pdf_url };
  }
);

// Get all invoices
export const getInvoices = api<void, InvoicesListResponse>(
  { expose: true, method: "GET", path: "/billing/invoices" },
  async () => {
    const invoices = await db.queryAll<Invoice>`
      SELECT id, patient_name, patient_email, date, treatment, medicine, doctor_name, amount, status, created_at
      FROM invoices 
      ORDER BY created_at DESC
    `;

    return { invoices };
  }
);

// Get invoice by ID
export const getInvoice = api<{ id: number }, InvoiceResponse>(
  { expose: true, method: "GET", path: "/billing/invoice/:id" },
  async ({ id }) => {
    const invoice = await db.queryRow<Invoice>`
      SELECT id, patient_name, patient_email, date, treatment, medicine, doctor_name, amount, status, created_at
      FROM invoices 
      WHERE id = ${id}
    `;

    if (!invoice) {
      throw APIError.notFound("Invoice not found");
    }

    const pdf_url = `/api/billing/invoice/${invoice.id}/pdf`;

    return { invoice, pdf_url };
  }
);

// Update invoice status
export const updateInvoiceStatus = api<{ id: number; status: string }, InvoiceResponse>(
  { expose: true, method: "PUT", path: "/billing/invoice/:id/status" },
  async ({ id, status }) => {
    const invoice = await db.queryRow<Invoice>`
      UPDATE invoices 
      SET status = ${status}
      WHERE id = ${id}
      RETURNING id, patient_name, patient_email, date, treatment, medicine, doctor_name, amount, status, created_at
    `;

    if (!invoice) {
      throw APIError.notFound("Invoice not found");
    }

    return { invoice };
  }
);

// Generate PDF (placeholder)
export const generatePDF = api<{ id: number }, { pdf_data: string }>(
  { expose: true, method: "GET", path: "/billing/invoice/:id/pdf" },
  async ({ id }) => {
    const invoice = await db.queryRow<Invoice>`
      SELECT id, patient_name, patient_email, date, treatment, medicine, doctor_name, amount, status, created_at
      FROM invoices 
      WHERE id = ${id}
    `;

    if (!invoice) {
      throw APIError.notFound("Invoice not found");
    }

    // Placeholder for PDF generation
    // In a real implementation, this would use a PDF library to generate the actual PDF
    const pdf_data = `PDF content for invoice ${id} - ${invoice.patient_name} - ${invoice.treatment} - $${invoice.amount}`;

    return { pdf_data };
  }
);
