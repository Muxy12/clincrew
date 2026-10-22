import type { ReactNode } from "react";

// Pass-through root layout. The real <html>/<body> live in
// app/[locale]/layout.tsx (localized routes) and app/not-found.tsx (global
// 404), so this simply forwards children. Required by Next so the top-level
// not-found page has a root layout.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
