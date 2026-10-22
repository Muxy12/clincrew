import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { LegalDocument } from "@/components/sections/LegalDocument";

const SECTIONS = [
  "controller",
  "data",
  "purpose",
  "legalBasis",
  "retention",
  "rights",
  "cookies",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.privacy" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        fr: "/fr/privacy",
        en: "/en/privacy",
        "x-default": "/fr/privacy",
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <LegalDocument namespace="privacy" sectionKeys={SECTIONS} />;
}
