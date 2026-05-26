"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Avaleht", icon: "🏠" },
  { href: "/app", label: "Võrdle", icon: "⚖️" },
  { href: "/stores", label: "Poed", icon: "🏬" },
  { href: "/hinnad", label: "Hinnad", icon: "📋" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/90 bg-white/95 backdrop-blur-md md:hidden"
      aria-label="Alumine navigatsioon"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {TABS.map(({ href, label, icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 transition-colors ${
                active ? "text-emerald-700" : "text-slate-500"
              }`}
            >
              <span className="text-xl leading-none" aria-hidden>
                {icon}
              </span>
              <span
                className={`truncate text-[10px] font-medium ${
                  active ? "font-semibold" : ""
                }`}
              >
                {label}
              </span>
              {active && (
                <span
                  className="mt-0.5 h-0.5 w-6 rounded-full bg-emerald-600"
                  aria-hidden
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
