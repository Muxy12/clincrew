interface MonogramProps {
  className?: string;
  /** Visual size in pixels. */
  size?: number;
}

/**
 * MD ligature — a bespoke monoline mark where the M and the D share a stem.
 * No ring, no medical cliché. Used in the header, footer and (via /icon)
 * the favicon; keep the three in sync.
 */
export function Monogram({ className, size = 38 }: MonogramProps) {
  return (
    <span
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 35 V13 L19 25 L27 13 V35"
          stroke="#b6f4d7"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M27 13 C 38 14.5, 38 33.5, 27 35"
          stroke="#b6f4d7"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
