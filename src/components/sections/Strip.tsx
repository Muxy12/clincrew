import { useTranslations } from "next-intl";

const ITEMS = ["item1", "item2", "item3", "item4"] as const;

export function Strip() {
  const t = useTranslations("strip");
  return (
    <div className="border-b border-line bg-panel-strip">
      <ul className="wrap flex flex-wrap justify-between gap-x-8 gap-y-4 py-6 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#9fb9b9]">
        {ITEMS.map((key, i) => (
          <li
            key={key}
            className="flex items-center gap-3 max-[550px]:w-[42%]"
          >
            <span className="font-medium text-mint">
              {String(i + 1).padStart(2, "0")}
            </span>
            {t(key)}
          </li>
        ))}
      </ul>
    </div>
  );
}
