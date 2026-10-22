/**
 * CLIENTS / PARTNERS ("Ils m'ont fait confiance")
 * -------------------------------------------------------------------------
 * Real organisations Mohamed has worked with (user-provided). Shown as
 * styled wordmarks by default.
 *
 * To display an official logo instead of the name: drop the file in
 * /public/logos/ (SVG preferred, monochrome works best on the dark strip)
 * and set `logo` to its path, e.g. logo: "/logos/amgen.svg".
 * Make sure you have the right to display each brand.
 */

export interface ClientRef {
  readonly name: string;
  readonly logo?: string;
}

export const clients: ReadonlyArray<ClientRef> = [
  { name: "Fortrea", logo: "/logos/fortrea.png" },
  { name: "ICON plc", logo: "/logos/icon.png" },
  { name: "Amgen", logo: "/logos/amgen.png" },
  { name: "MSD", logo: "/logos/msd.png" },
  { name: "AP-HP", logo: "/logos/aphp.png" },
  { name: "GFEV", logo: "/logos/gfev.png" },
];
