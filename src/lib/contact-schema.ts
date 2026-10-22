import { z } from "zod";

/**
 * Shared contact-form schema used by both the client (React Hook Form) and
 * the server (API route). Error messages are i18n keys resolved in the UI
 * and mapped to human text on the server, so validation stays consistent.
 */

export const requestTypes = ["cro", "pharma", "biotech", "other"] as const;

export type RequestType = (typeof requestTypes)[number];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "name_min" })
    .max(120, { message: "name_max" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "email_required" })
    .email({ message: "email_invalid" })
    .max(180, { message: "email_max" }),
  company: z
    .string()
    .trim()
    .max(160, { message: "company_max" })
    .optional()
    .or(z.literal("")),
  requestType: z.enum(requestTypes, { message: "request_type_required" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "message_min" })
    .max(4000, { message: "message_max" }),
  consent: z.literal(true, { message: "consent_required" }),
  // Honeypot: must stay empty. Bots that fill every field are rejected.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
