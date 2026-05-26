import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="hidden border-t border-slate-200 bg-white py-8 md:block">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Säästukorv</p>
        <div className="flex gap-6">
          <Link href="/app" className="hover:text-emerald-700">
            Võrdle
          </Link>
          <Link href="/recipes" className="hover:text-emerald-700">
            Retseptid
          </Link>
          <Link href="/alerts" className="hover:text-emerald-700">
            Alarmid
          </Link>
          <Link href="/stores" className="hover:text-emerald-700">
            Poed
          </Link>
          <Link href="/pricing" className="hover:text-emerald-700">
            Hinnakiri
          </Link>
        </div>
        <p className="text-xs text-slate-400">Demoandmed · 2026</p>
      </div>
    </footer>
  );
}
