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
  { name: "Fortrea" },
  { name: "ICON plc" },
  { name: "Amgen" },
  { name: "MSD" },
  { name: "AP-HP" },
  { name: "GFEV" },
];
