"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ArrowDown, ClipboardCheck } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 0.6, 0.35, 1] },
    },
  };
  // The headline is the LCP element: keep it fully opaque from first paint
  // (transform-only reveal) so Largest Contentful Paint isn't gated on JS
  // hydration. This is the single biggest mobile-performance lever here.
  const headlineItem: Variants = {
    hidden: { opacity: 1, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 0.6, 0.35, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-line"
      aria-labelledby="hero-heading"
    >
      <div className="hero-aura" aria-hidden="true" />
      <div className="hero-ring" aria-hidden="true" />

      <div className="wrap grid min-h-[650px] items-center gap-10 pb-16 pt-32 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:pb-20 md:pt-[86px] lg:min-h-[735px]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow">
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={headlineItem}
            className="my-7 font-heading text-[clamp(38px,5.6vw,84px)] leading-[1.05] tracking-tightest"
          >
            {t("headlineLine1")}
            <br />
            {t("headlineLine2")}
            <br />
            <span className="text-mint">{t("headlineEmphasis")}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-[580px] text-[16px] leading-[1.75] text-cream md:text-[18px]"
          >
            {t("lead")}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-[560px] text-[15px] leading-[1.8] text-muted"
          >
            {t("intro")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-6 rounded-full bg-mint px-6 py-4 text-[13px] font-extrabold text-[#06231e] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(182,244,215,0.17)]"
            >
              {t("ctaPrimary")}
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href="/#quiz"
              className="inline-flex items-center gap-2 rounded-full border border-[#9cd8bf] px-5 py-4 text-[13px] font-bold text-mint transition-colors hover:bg-mint hover:text-bg"
            >
              <ClipboardCheck size={15} aria-hidden="true" />
              {t("ctaQuiz")}
            </Link>
            <Link
              href="/#prestations"
              className="inline-flex items-center gap-2 border-b border-[#a4b6b5] px-0.5 py-3 text-[13px] text-cream transition-colors hover:border-mint hover:text-mint"
            >
              {t("ctaSecondary")}
              <ArrowDown size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Orbital visual */}
        <motion.div
          className="orb"
          aria-hidden="true"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="orbit" />
          <div className="orb-center">
            <svg
              viewBox="0 0 100 100"
              width="80"
              height="80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="[filter:drop-shadow(0_0_18px_rgba(182,244,215,0.6))]"
            >
              <path
                d="M50 6 86 26v48L50 94 14 74V26L50 6Z"
                stroke="#D4FFE9"
                strokeWidth="1.5"
              />
              <path
                d="M14 26 50 49 86 26M50 49v45M14 74 50 49 86 74M50 6v43"
                stroke="#D4FFE9"
                strokeOpacity=".7"
              />
              <circle cx="50" cy="49" r="9" fill="#D4FFE9" />
            </svg>
            <span className="font-mono text-[10px] tracking-[0.32em] text-[#d6fff0]">
              {t("orbLabel")}
            </span>
          </div>

          <div className="float-tag left-[-2%] top-[22%]">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-mint">
              {t("tag1Label")}
            </span>
            {t("tag1Text")}
          </div>
          <div className="float-tag bottom-[20%] right-[-2%]">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-mint">
              {t("tag2Label")}
            </span>
            {t("tag2Text")}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {t("scroll")}
        </span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-scroll-dot" />
        </span>
      </div>
    </section>
  );
}
