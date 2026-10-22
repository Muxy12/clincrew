import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col items-center justify-center gap-6 py-32 text-center">
      <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-mint">
        404
      </p>
      <h1 className="max-w-[640px] font-heading text-[clamp(32px,5vw,56px)] leading-tight tracking-tightest">
        Page introuvable · Page not found
      </h1>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-full bg-mint px-6 py-4 text-[14px] font-extrabold text-bg transition-transform hover:-translate-y-0.5"
      >
        Accueil / Home
      </Link>
    </section>
  );
}
