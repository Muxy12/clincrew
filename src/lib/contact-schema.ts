import { z } from "zod";

/**
 * Shared contact-form schema used by both the client (React Hook Form) and
 * the server (API route). Error messages are i18n keys resolved in the UI
 * and mapped to human text on the server, so validation stays consistent.
 */

export const requestTypes = [
  "setup",
  "monitoring",
  "closeout",
  "audit",
  "other",
] as const;

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
  phone: z
    .string()
    .trim()
    .min(1, { message: "phone_required" })
    .max(30, { message: "phone_max" })
    .regex(/^[0-9+().\-\s]{6,30}$/, { message: "phone_invalid" }),
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
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "consent_required" }),
  // Honeypot: must stay empty. Bots that fill every field are rejected.
  website: z.string().max(0).optional().or(z.literal("")),
  // Cloudflare Turnstile token. Verified server-side only when a secret key
  // is configured; otherwise ignored. Optional so the schema stays valid
  // whether or not Turnstile is enabled.
  turnstileToken: z.string().max(4096).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
