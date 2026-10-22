"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  RotateCcw,
  CheckCircle2,
  MessagesSquare,
  Info,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/config/profile";
import type { Locale } from "@/i18n/routing";

type OptionDef = {
  key: string;
  points: number;
  /** Selecting a 0-point option on Q2 or Q5 means the assignment is out of scope. */
  scopeOut?: boolean;
  /** Label comes from config (phases / areas / zones) instead of i18n. */
  dynamic?: "phases" | "areas" | "zones";
};

const QUESTIONS: ReadonlyArray<{ id: string; options: OptionDef[] }> = [
  {
    id: "q1",
    options: [
      { key: "cro", points: 2 },
      { key: "pharma", points: 2 },
      { key: "biotech", points: 2 },
      { key: "academic", points: 1 },
      { key: "other", points: 0 },
    ],
  },
  {
    id: "q2",
    options: [
      { key: "monitoring", points: 2 },
      { key: "sitefollowup", points: 2 },
      { key: "adhoc", points: 1 },
      { key: "other", points: 0, scopeOut: true },
    ],
  },
  {
    id: "q3",
    options: [
      { key: "match", points: 2, dynamic: "phases" },
      { key: "other", points: 1 },
      { key: "unsure", points: 1 },
    ],
  },
  {
    id: "q4",
    options: [
      { key: "match", points: 2, dynamic: "areas" },
      { key: "other", points: 1 },
      { key: "unsure", points: 1 },
    ],
  },
  {
    id: "q5",
    options: [
      { key: "match", points: 2, dynamic: "zones" },
      { key: "remote", points: 2 },
      { key: "other", points: 0, scopeOut: true },
    ],
  },
  {
    id: "q6",
    options: [
      { key: "start1m", points: 2 },
      { key: "start3m", points: 2 },
      { key: "later", points: 1 },
    ],
  },
];

const REQUEST_TYPE_BY_Q1: Record<string, string> = {
  cro: "cro",
  pharma: "pharma",
  biotech: "biotech",
  academic: "other",
  other: "other",
};

type Tier = "good" | "discuss" | "nomatch";

export function Quiz() {
  const t = useTranslations("quiz");
  const locale = useLocale() as Locale;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  const dyn = {
    phases:
      profile.phases?.[locale] ??
      (locale === "fr"
        ? "[Phases couvertes par mon expérience]"
        : "[Phases covered by my experience]"),
    areas: profile.therapeuticAreas.length
      ? profile.therapeuticAreas.map((x) => x[locale]).join(", ")
      : locale === "fr"
        ? "[Mes aires thérapeutiques]"
        : "[My therapeutic areas]",
    zones: profile.geographicCoverage.length
      ? profile.geographicCoverage.map((x) => x[locale]).join(" · ")
      : locale === "fr"
        ? "[Mes zones d'intervention]"
        : "[My areas of work]",
  };

  const optionLabel = (qIndex: number, opt: OptionDef) =>
    opt.dynamic ? dyn[opt.dynamic] : t(`questions.${QUESTIONS[qIndex].id}.${opt.key}`);

  function select(qIndex: number, optKey: string) {
    const next = { ...answers, [qIndex]: optKey };
    setAnswers(next);
    if (qIndex < QUESTIONS.length - 1) {
      setStep(qIndex + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  // --- Scoring -----------------------------------------------------------
  const chosen = QUESTIONS.map((q, i) =>
    q.options.find((o) => o.key === answers[i]),
  );
  const total = chosen.reduce((sum, o) => sum + (o?.points ?? 0), 0);
  const scopeOut = chosen.some((o) => o?.scopeOut);
  let tier: Tier = total >= 10 ? "good" : total >= 6 ? "discuss" : "nomatch";
  if (scopeOut && tier === "good") tier = "discuss";

  function goToContact() {
    const summaryLines = QUESTIONS.map((q, i) => {
      const opt = q.options.find((o) => o.key === answers[i]);
      return `• ${t(`questions.${q.id}.q`)} ${opt ? optionLabel(i, opt) : ""}`;
    });
    const message = `[Quiz — ${t(`results.${tier}.title`)} (${total}/12)]\n${summaryLines.join("\n")}\n\n`;
    const requestType = REQUEST_TYPE_BY_Q1[answers[0]] ?? "other";

    window.dispatchEvent(
      new CustomEvent("quiz:prefill", { detail: { message, requestType } }),
    );
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const resultIcon = {
    good: <CheckCircle2 size={24} className="text-mint" aria-hidden="true" />,
    discuss: (
      <MessagesSquare size={24} className="text-teal" aria-hidden="true" />
    ),
    nomatch: <Info size={24} className="text-muted" aria-hidden="true" />,
  };

  return (
    <section id="quiz" className="wrap scroll-mt-24 py-24 md:py-32">
      <Reveal className="mx-auto max-w-[720px] text-center">
        <p className="eyebrow eyebrow--center">{t("eyebrow")}</p>
        <h2 className="mt-5 font-heading text-[clamp(30px,4.4vw,52px)] leading-[1.14] tracking-tightest">
          {t("title")}
        </h2>
        <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[1.8] text-muted">
          {t("intro")}
        </p>
      </Reveal>

      <div className="mx-auto mt-12 max-w-[680px] rounded-lg border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-7 md:p-10">
        {!done ? (
          <div>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span>
                  {t("progress", { current: step + 1, total: QUESTIONS.length })}
                </span>
                <span className="text-mint">
                  {String(step + 1).padStart(2, "0")}/
                  {String(QUESTIONS.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-mint transition-all duration-300"
                  style={{
                    width: `${((step + 1) / QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <h3 className="font-heading text-[21px] leading-snug tracking-tighter2 text-cream md:text-[24px]">
              {t(`questions.${QUESTIONS[step].id}.q`)}
            </h3>

            <ul className="mt-6 space-y-3">
              {QUESTIONS[step].options.map((opt) => {
                const isSelected = answers[step] === opt.key;
                return (
                  <li key={opt.key}>
                    <button
                      type="button"
                      onClick={() => select(step, opt.key)}
                      aria-pressed={isSelected}
                      className={
                        "group flex w-full items-center justify-between gap-4 rounded-md border px-5 py-4 text-left text-[15px] transition-colors duration-200 " +
                        (isSelected
                          ? "border-mint bg-mint/[0.06] text-cream"
                          : "border-line text-[#c2d2d2] hover:border-[#85cbb0] hover:text-cream")
                      }
                    >
                      <span>{optionLabel(step, opt)}</span>
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-mint opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="mt-6 inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-mint"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                {t("back")}
              </button>
            )}
          </div>
        ) : (
          <div role="status" aria-live="polite">
            <div className="flex items-center gap-3">
              {resultIcon[tier]}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {t("resultHeading")}
                </p>
                <h3 className="font-heading text-[24px] tracking-tighter2 text-cream">
                  {t(`results.${tier}.title`)}
                </h3>
              </div>
            </div>

            <p className="mt-5 text-[15px] leading-[1.8] text-muted">
              {t(`results.${tier}.body`, {
                responseTime: profile.responseTime ?? "[24–48 h]",
              })}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={goToContact}
                className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-[13px] font-extrabold text-bg transition-transform hover:-translate-y-0.5"
              >
                {t(`results.${tier}.cta`)}
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-mint"
              >
                <RotateCcw size={14} aria-hidden="true" />
                {t("restart")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
