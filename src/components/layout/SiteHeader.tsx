"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Avaleht" },
  { href: "/app", label: "Võrdle" },
  { href: "/stores", label: "Poed" },
  { href: "/hinnad", label: "Hinnad" },
  { href: "/pricing", label: "Hinnakiri" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060b08]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00f5a0] to-[#00a86b] text-lg shadow-[0_0_20px_rgba(0,245,160,0.35)] transition group-hover:shadow-[0_0_28px_rgba(0,245,160,0.5)]">
            🛒
          </span>
          <span className="font-[family-name:var(--font-outfit)] text-xl font-bold tracking-tight text-white">
            Säästukorv
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Peamine navigatsioon"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#00f5a0]/15 text-[#00f5a0]"
                    : "text-[#94a89e] hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link href="/app" className="btn-neon shrink-0 rounded-lg px-4 py-2 text-sm">
          Alusta
        </Link>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden"
        aria-label="Mobiilne navigatsioon"
      >
        {NAV_LINKS.map(({ href, label }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium ${
                isActive
                  ? "bg-[#00f5a0]/15 text-[#00f5a0]"
                  : "text-[#94a89e]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
