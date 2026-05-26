/** Päise põhinavigatsioon */

export const HEADER_NAV = [
  { href: "/", label: "Avaleht" },
  { href: "/app", label: "Võrdle" },
  { href: "/stores", label: "Poed" },
  { href: "/hinnad", label: "Hinnad" },
] as const;

/** Mobiili alumine riba */
export const MOBILE_TAB_NAV = HEADER_NAV;

/** Lisalingid mobiilimenüüs */
export const MORE_NAV = [
  { href: "/recipes", label: "Retseptid" },
  { href: "/alerts", label: "Hinnateated" },
  { href: "/pricing", label: "Paketid" },
] as const;

/** @deprecated Kasuta HEADER_NAV */
export const MAIN_NAV = HEADER_NAV;

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
