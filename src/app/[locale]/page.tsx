import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Strip } from "@/components/sections/Strip";
import { Quiz } from "@/components/sections/Quiz";
import { Services } from "@/components/sections/Services";
import { Sectors } from "@/components/sections/Sectors";
import { TherapeuticAreas } from "@/components/sections/TherapeuticAreas";
import { ExpertiseTech } from "@/components/sections/ExpertiseTech";
import { Prestations } from "@/components/sections/Prestations";
import { Approach } from "@/components/sections/Approach";
import { ValueProp } from "@/components/sections/ValueProp";
import { About } from "@/components/sections/About";
import { Comparison } from "@/components/sections/Comparison";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <TrustedBy />
      <Strip />
      <Quiz />
      <Services />
      <Prestations />
      <Approach />
      <Sectors />
      <TherapeuticAreas />
      {locale === "fr" && <ExpertiseTech />}
      <ValueProp />
      <About />
      <Comparison />
      <Faq />
      <Contact />
    </>
  );
}
