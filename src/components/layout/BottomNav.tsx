"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavActive, MOBILE_TAB_NAV } from "@/lib/siteNav";

/** Ainult telefonis — lauaarvutis kasutatakse ülemist menüüd */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden"
      aria-label="Kiirnavigatsioon telefonis"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1">
        {MOBILE_TAB_NAV.map(({ href, label }) => {
          const active = isNavActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center rounded-md px-1 py-2 ${
                active ? "text-brand" : "text-muted"
              }`}
            >
              <span
                className={`truncate text-xs ${
                  active ? "font-semibold" : "font-medium"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
