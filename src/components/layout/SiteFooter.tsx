import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { HEADER_NAV, MORE_NAV } from "@/lib/siteNav";

export function SiteFooter() {
  return (
    <footer className="hidden border-t border-border bg-card py-8 md:block">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <Logo showIcon={false} />
            <p className="mt-2 max-w-xs text-sm text-muted">
              Pakkumised ja hinnad ühes vaates — aitame leida soodsama
              ostuplaani.
            </p>
          </div>
          <div className="flex gap-10 text-sm">
            <div>
              <p className="font-semibold text-ink">Lehed</p>
              <ul className="mt-2 space-y-1.5">
                {HEADER_NAV.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-muted hover:text-brand">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">Veel</p>
              <ul className="mt-2 space-y-1.5">
                {MORE_NAV.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-muted hover:text-brand">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © 2026 Säästukorv
        </p>
      </div>
    </footer>
  );
}
