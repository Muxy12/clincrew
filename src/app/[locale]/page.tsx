import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Strip } from "@/components/sections/Strip";
import { Quiz } from "@/components/sections/Quiz";
import { Services } from "@/components/sections/Services";
import { Sectors } from "@/components/sections/Sectors";
import { Prestations } from "@/components/sections/Prestations";
import { Approach } from "@/components/sections/Approach";
import { ValueProp } from "@/components/sections/ValueProp";
import { About } from "@/components/sections/About";
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
      <ValueProp />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
