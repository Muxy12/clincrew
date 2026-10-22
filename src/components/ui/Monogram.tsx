import { profile } from "@/config/profile";

interface MonogramProps {
  className?: string;
  /** Visual size in pixels. */
  size?: number;
}

/**
 * MD monogram — a precise, architectural circular mark. No medical cliché.
 * Used in the header, footer and (via /icon) the favicon.
 */
export function Monogram({ className, size = 38 }: MonogramProps) {
  return (
    <span
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 38 38"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="19" cy="19" r="18.25" stroke="#8fcfb8" strokeWidth="1" />
        <text
          x="19"
          y="19"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Manrope, system-ui, sans-serif"
          fontWeight="700"
          fontSize="12"
          letterSpacing="0.5"
          fill="#b6f4d7"
        >
          {profile.monogram}
        </text>
      </svg>
    </span>
  );
}
