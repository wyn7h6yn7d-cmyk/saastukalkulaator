"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DESKTOP_LINKS = [
  { href: "/", label: "Avaleht" },
  { href: "/app", label: "Võrdle" },
  { href: "/stores", label: "Poed" },
  { href: "/hinnad", label: "Hinnad" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-lg text-white shadow-sm">
            🛒
          </span>
          <span className="text-lg font-bold text-slate-900">Säästukorv</span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Peamine navigatsioon"
        >
          {DESKTOP_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(pathname, href)
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/pricing"
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              isActive(pathname, "/pricing")
                ? "bg-emerald-50 text-emerald-800"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Hinnakiri
          </Link>
        </nav>

        <Link href="/app" className="btn-primary hidden !min-h-9 !py-2 !text-sm md:inline-flex">
          Võrdle hindu
        </Link>
      </div>
    </header>
  );
}
