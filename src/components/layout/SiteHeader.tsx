"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { HEADER_NAV, MORE_NAV, isNavActive } from "@/lib/siteNav";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sulge menüü pärast navigatsiooni
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0 hover:opacity-90">
          <Logo />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-0.5 md:flex"
          aria-label="Peamine navigatsioon"
        >
          {HEADER_NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                isNavActive(pathname, href)
                  ? "text-brand"
                  : "text-muted hover:text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/app"
            className="btn-primary !min-h-9 shrink-0 !px-4 !py-2 !text-sm"
          >
            Alusta
          </Link>
          <button
            type="button"
            className="inline-flex min-h-9 items-center rounded-md border border-border px-3 text-sm font-medium text-ink md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            Menüü
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav-menu"
          className="border-t border-border bg-card px-4 py-3 md:hidden"
          aria-label="Mobiilimenüü"
        >
          <ul className="space-y-1">
            {HEADER_NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                    isNavActive(pathname, href)
                      ? "bg-brand-light text-brand"
                      : "text-ink hover:bg-page"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            {MORE_NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                    isNavActive(pathname, href)
                      ? "bg-brand-light text-brand"
                      : "text-muted hover:bg-page hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
