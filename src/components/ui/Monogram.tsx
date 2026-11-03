"use client";

import { useId } from "react";

interface MonogramProps {
  className?: string;
  /** Visual size in pixels. */
  size?: number;
}

/**
 * ClinCrew mark — two interlocking rounded blades forming a cross: the top and
 * left arms in cream, the bottom and right arms in mint, with the backdrop
 * showing through a central leaf. Knocked out via a mask so it sits on any
 * dark background. Used in the header, footer and (mirrored) the favicon.
 */
export function Monogram({ className, size = 38 }: MonogramProps) {
  // Unique, CSS-safe ids so multiple marks on one page never collide.
  const raw = useId().replace(/:/g, "");
  const clip = `cc-clip-${raw}`;
  const leaf = `cc-leaf-${raw}`;

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
        <defs>
          <clipPath id={clip}>
            <rect x="14" y="4" width="20" height="40" rx="6" />
            <rect x="4" y="14" width="40" height="20" rx="6" />
          </clipPath>
          <mask id={leaf}>
            <rect width="48" height="48" fill="#fff" />
            <ellipse
              cx="24"
              cy="24"
              rx="3.2"
              ry="8.5"
              fill="#000"
              transform="rotate(-25 24 24)"
            />
          </mask>
        </defs>
        <g clipPath={`url(#${clip})`} mask={`url(#${leaf})`}>
          <rect width="48" height="48" fill="#83e6a9" />
          <path d="M0 0 L48 0 C 32 16, 16 32, 0 48 Z" fill="#f1f2e9" />
        </g>
      </svg>
    </span>
  );
}
