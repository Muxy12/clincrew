"use client";

import { useEffect, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import {
  contactSchema,
  requestTypes,
  type ContactFormValues,
} from "@/lib/contact-schema";

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "not_configured"
  | "rate_limited";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
    },
  });

  // Prefill from the qualification quiz: the quiz dispatches a summary of the
  // visitor's answers + a suggested request type, which we drop into the form
  // so quiz responses arrive with the contact request.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        message?: string;
        requestType?: string;
      } | null;
      if (!detail) return;
      if (detail.message)
        setValue("message", detail.message, { shouldValidate: false });
      if (
        detail.requestType &&
        (requestTypes as readonly string[]).includes(detail.requestType)
      ) {
        setValue("requestType", detail.requestType as ContactFormValues["requestType"], {
          shouldValidate: false,
        });
      }
    };
    window.addEventListener("quiz:prefill", handler);
    return () => window.removeEventListener("quiz:prefill", handler);
  }, [setValue]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data: { ok: boolean; error?: string } = await res
        .json()
        .catch(() => ({ ok: false }));

      if (res.ok && data.ok) {
        setStatus("success");
        reset();
        return;
      }
      if (data.error === "not_configured") setStatus("not_configured");
      else if (data.error === "rate_limited") setStatus("rate_limited");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const err = (key: keyof ContactFormValues) =>
    errors[key]?.message
      ? t(`validation.${errors[key]?.message as string}`)
      : undefined;

  // Success and blocking states replace the form with an accessible panel.
  if (status === "success") {
    return <StatusPanel kind="success" />;
  }

  return (
    <div className="mx-auto max-w-[640px] text-left">
      {(status === "error" ||
        status === "not_configured" ||
        status === "rate_limited") && (
        <div className="mb-6">
          <StatusPanel
            kind={
              status === "not_configured"
                ? "not_configured"
                : status === "rate_limited"
                  ? "rate_limited"
                  : "error"
            }
            inline
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Honeypot — visually hidden, not announced to screen readers. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label={t("name")}
            placeholder={t("namePlaceholder")}
            error={err("name")}
            autoComplete="name"
            register={register("name")}
          />
          <Field
            id="email"
            type="email"
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            error={err("email")}
            autoComplete="email"
            register={register("email")}
          />
        </div>

        <Field
          id="company"
          label={t("company")}
          placeholder={t("companyPlaceholder")}
          error={err("company")}
          autoComplete="organization"
          register={register("company")}
        />

        <div>
          <label
            htmlFor="requestType"
            className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
          >
            {t("requestType")}
          </label>
          <select
            id="requestType"
            defaultValue=""
            aria-invalid={err("requestType") ? "true" : undefined}
            aria-describedby={
              err("requestType") ? "requestType-error" : undefined
            }
            className="w-full rounded-md border border-line bg-panel px-4 py-3.5 text-[15px] text-cream outline-none transition-colors focus:border-mint"
            {...register("requestType")}
          >
            <option value="" disabled>
              {t("requestTypePlaceholder")}
            </option>
            {requestTypes.map((rt) => (
              <option key={rt} value={rt}>
                {t(`requestTypes.${rt}`)}
              </option>
            ))}
          </select>
          {err("requestType") && (
            <FieldError id="requestType-error">
              {err("requestType")}
            </FieldError>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
          >
            {t("message")}
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder={t("messagePlaceholder")}
            aria-invalid={err("message") ? "true" : undefined}
            aria-describedby={err("message") ? "message-error" : undefined}
            className="w-full resize-y rounded-md border border-line bg-panel px-4 py-3.5 text-[15px] text-cream outline-none transition-colors placeholder:text-[#6f8788] focus:border-mint"
            {...register("message")}
          />
          {err("message") && (
            <FieldError id="message-error">{err("message")}</FieldError>
          )}
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-left text-[13px] leading-relaxed text-muted">
            <input
              type="checkbox"
              aria-invalid={err("consent") ? "true" : undefined}
              aria-describedby={err("consent") ? "consent-error" : undefined}
              className="mt-0.5 h-4 w-4 shrink-0 accent-mint"
              {...register("consent")}
            />
            <span>{t("consent")}</span>
          </label>
          {err("consent") && (
            <FieldError id="consent-error">{err("consent")}</FieldError>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-mint px-7 py-4 text-[14px] font-extrabold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(182,244,215,0.2)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting || status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              {t("submitting")}
            </>
          ) : (
            <>
              {t("submit")}
              <Send size={15} aria-hidden="true" />
            </>
          )}
        </button>

        <p className="pt-1 text-[12px] leading-relaxed text-[#6f8788]">
          {t("privacyNote")}
        </p>
      </form>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  register: UseFormRegisterReturn;
}

function Field({
  id,
  label,
  placeholder,
  error,
  type = "text",
  autoComplete,
  register,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-md border border-line bg-panel px-4 py-3.5 text-[15px] text-cream outline-none transition-colors placeholder:text-[#6f8788] focus:border-mint"
        {...register}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-1.5 text-[12px] text-[#ff9c9c]"
    >
      <AlertCircle size={13} aria-hidden="true" />
      {children}
    </p>
  );
}

function StatusPanel({
  kind,
  inline = false,
}: {
  kind: "success" | "error" | "not_configured" | "rate_limited";
  inline?: boolean;
}) {
  const t = useTranslations("contact.form.states");
  const map = {
    success: { title: t("successTitle"), body: t("successBody") },
    error: { title: t("errorTitle"), body: t("errorBody") },
    not_configured: {
      title: t("notConfiguredTitle"),
      body: t("notConfiguredBody"),
    },
    rate_limited: {
      title: t("rateLimitedTitle"),
      body: t("rateLimitedBody"),
    },
  } as const;
  const isSuccess = kind === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        "mx-auto max-w-[640px] rounded-lg border p-6 text-left " +
        (isSuccess
          ? "border-mint/40 bg-mint/[0.06]"
          : "border-[#ff9c9c]/30 bg-[#ff9c9c]/[0.06]") +
        (inline ? "" : " text-center")
      }
    >
      <div
        className={
          "flex items-center gap-3 " + (inline ? "" : "justify-center")
        }
      >
        {isSuccess ? (
          <CheckCircle2 size={22} className="text-mint" aria-hidden="true" />
        ) : (
          <AlertCircle size={22} className="text-[#ff9c9c]" aria-hidden="true" />
        )}
        <h3 className="font-heading text-[18px] tracking-tighter2 text-cream">
          {map[kind].title}
        </h3>
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-muted">
        {map[kind].body}
      </p>
    </div>
  );
}
