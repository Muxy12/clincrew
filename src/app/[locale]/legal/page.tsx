import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { LegalDocument } from "@/components/sections/LegalDocument";

const SECTIONS = [
  "editor",
  "registration",
  "director",
  "hosting",
  "ip",
  "contact",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.legal" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/legal`,
      languages: { fr: "/fr/legal", en: "/en/legal", "x-default": "/fr/legal" },
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <LegalDocument namespace="legal" sectionKeys={SECTIONS} />;
}
